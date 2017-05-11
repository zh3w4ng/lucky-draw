/**
 * Created by millie.lin on 12/9/13.
 */
(function($, window, document) {

    var machine = new Machine(function(data) {
        var prizes = [
            " A pair of SIA First Class Tickets",
            " A pair of SIA Business Class Tickets ",
            " A pair of SIA Premium Economy Class Tickets",
            " A pair of SilkAir Business Class Tickets",
            " A pair of ScootBiz Tickets ",
            " A pair of SIA Economy Class Tickets",
            " A pair of SilkAir Economy Class Tickets ",
            " A pair of SilkAir Economy Class Tickets ",
            " A pair of Scoot/Tigerair Economy Class Tickets",
            " A pair of Scoot/Tigerair Economy Class Tickets",
        ]

        $('#btn-next').hide();
        $('#prize-number').text(window.prize-1);
        $('#prize-title').text(prizes[window.prize-2]);
        $('.prize').removeClass('invisible');
        $('.fa-trophy').show();

        $('.winner').show();
        $('.main-container').removeClass('show animated fadeOutUp');
        $('.main-container').addClass('hide');
        $('#rolling-view-container').addClass('show animated fadeInDown');

        var company = window.dict[data.poorMan]['company'];
        var name = window.dict[data.poorMan]['name'];
        var division = window.dict[data.poorMan]['division'];
        var backward_distance = -data.distance;
        var itemsArr = [];
        var itemsLength = window.items.length;
        var forward_distance = 10;
        var first = window.items.slice(backward_distance % itemsLength);
        var middle = window.items;
        var last = window.items.slice(0, forward_distance);
        var itemsForThisIteration =  (first.concat(middle).concat(last)).slice(data.randomNumber - 3, data.randomNumber - backward_distance + forward_distance);

        $('ul.rolling-list').empty();
        $.each(itemsForThisIteration, function(i, v){
            var $li = $('<li>').attr('company', window.dict[v]['company']).
                attr('name', window.dict[v]['name']).
                attr('gender', window.dict[v]['gender']).
                attr('sid', v).
                append('XXXX' + v.slice(-4));
            $('ul.rolling-list').append($li);
        });
        function loopAndLoop(counter) {
            $('ul.rolling-list').find(":first-child").remove();

            var nextTime = 100;
            var winHeight = $(window).height();
            var baseTime = 3000;
            $('.rolling-list').css({
                                       'height': winHeight-300,
                                       'width': winHeight
                                   });
            $('.rolling-list li').css({
                                          'font-size': winHeight/85 + 'em',
                                          'margin-top': '10px'
                                      });
            $('.mask').css({
                               'height': winHeight/2.6,
                               'width': winHeight
                           });
            if (counter == -backward_distance - 3) {
                nextTime = 300;
            } else if (counter == -backward_distance - 2) {
                nextTime = 500;
            } else if (counter == -backward_distance - 1) {
                nextTime = 800;
            } else if (counter == -backward_distance) {
                var $winner = $($('ul.rolling-list li')[2])

                $('#winner-place').text('');
                $('#winner-gender').text('');
                $('#winner-name').text('');
                $('#winner-place').removeClass('animated slideInRight')
                $('#winner-gender').removeClass('animated slideInRight')
                $('#winner-name').removeClass('animated slideInRight')
                setTimeout(function() {
                    $('#winner-place').text($winner.attr('company'));
                    $("#winner-place").addClass('animated slideInRight')
                }, baseTime);


                setTimeout(function() {
                    $('#winner-gender').text($winner.attr('gender'));
                    $("#winner-gender").addClass('animated slideInRight')
                }, baseTime*2);


                setTimeout(function() {
                    $('#winner-name').text($winner.attr('name') + ' (' + $winner.attr('sid') + ')');
                    $("#winner-name").addClass('animated slideInRight')
                }, baseTime*3);

                setTimeout(function() {

                    $('.main-container').removeClass('show animated fadeOutUp');
                    $('.main-container').addClass('hide');
                    // $('#result-view-container').addClass('show animated fadeInDown');
                    $('#result-view-container').addClass('show');
                    if (window.prize !== 1)
                        $('#btn-next').show();
                        $('#btn-redo').show();
                }, 1000);
                return;
            }
            setTimeout(function() {
                loopAndLoop(++counter);
            }, nextTime);

        }
        loopAndLoop(0);
    });
    window.machine = machine;

    $(document).ready(function(){

//    Tooltip
        $('.tooltip-container').mouseenter(function(){
            $('.tooltip').slideDown('fast');

        }).mouseleave(function(){
            $('.tooltip').slideUp('fast');
        });

//        Toggle Views
        function showEditListView() {
            $('.main-container').removeClass('show animated fadeOutUp');
            $('.main-container').addClass('hide');
            $('#edit-item-container').addClass('show animated fadeInDown');
        }

        $('.logo').click(function(){
            showEditListView();
        });
        function showStartView() {
            $('.main-container').removeClass('show animated fadeOutUp');
            $('.main-container').addClass('hide');
            $('#start-view-container').addClass('show animated fadeInDown');
        }

        $('#edit-item-container .btn-done').click(function(){
            showStartView();
        });

//    Define the responsive round START button
        var winHeight = $(window).height();

        var updateStartButtonStyle = function(){
            winHeight = $(window).height();
            $('.btn-start').css({
                'height' :  winHeight/1.9,
                'width' : winHeight/1.9,
                'border-radius': ($(this).width())/2
            });
            $('.btn-start i.fa-compass').css({
                'font-size': $('.btn-start').height()/2.5
            });
            $('.btn-start span.text').css({
                'font-size': $('.btn-start').height()/2.5
            });

            //Rolling List
            $('.rolling-list').css({
                'height': winHeight,
                'width': '100%',
                'overflow':'hidden'
            });
            $('.rolling-list li').css({
                'font-size': winHeight/20
            });
            $('#mask-top').css({
                'height': winHeight/2.5
            });
            $('#mask-bottom').css({

                'height':winHeight/10,
                'top': winHeight/1.8
            });

            //Result View
            $('.winner').css({
                'font-size': winHeight/200 + 'em',
                'margin-top': 0
            });
            $('#btn-next').css({
                'height' :  winHeight/3.5,
                'width' : winHeight/3.5,
                'border-radius': ($(this).width()),
                'margin-left': winHeight/8
            });
            $('#btn-next i.fa-compass').css({
                'font-size': $('#btn-next').height()/2.5
            });
            $('#btn-next span.text').css({
                'font-size': $('#btn-next').height()/5
            });
            $('#btn-redo').css({
                'height' :  winHeight/7,
                'width' : winHeight/7,
                'border-radius': ($(this).width()),
                'margin-left': winHeight/5,
                'margin-top': winHeight/20
            });
            $('#btn-redo i.fa-compass').css({
                'font-size': $('#btn-redo').height()/3
            });
            $('#btn-redo span.text').css({
                'font-size': $('#btn-redo').height()/8
            });
        };

        updateStartButtonStyle();
        $(window).resize(function(){
            updateStartButtonStyle();
        });

        function go() {
            // if (window.items.length > 0) {
            machine.rand(window.prize-1);
            // } else {
            //     showEditListView();
            // }
        }

        $('#btn-start').bind('click', function() {
            go();
        });
        $('#btn-next').bind('click', function() {
            go();
        });
        $('#btn-redo').bind('click', function() {
            window.prize = window.prize + 1;
            go();
        });
        $('body').on('keydown', function(e) {

            if ((e.keyCode || e.which) == 13 && $('.btn-start').is(':visible')) {
                go();
            }
        });

//        Load Start Button View
        $('.btn-start').mouseenter(function(){
            $(this).children('.fa-compass').removeClass('show');
            $(this).children('.fa-compass').addClass('hide rotateOut');
            $(this).children('.text').removeClass('hide flipOutX');
            $(this).children('.text').addClass('show flipInX');
        });

        $('.btn-next').mouseenter(function(){
            $(this).children('.fa-compass').removeClass('show');
            $(this).children('.fa-compass').addClass('hide rotateOut');
            $(this).children('.text').removeClass('hide flipOutX');
            $(this).children('.text').addClass('show flipInX');
        });


    });
})(jQuery, window, document);