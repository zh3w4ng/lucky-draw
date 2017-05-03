/**
 * Created by millie.lin on 12/9/13.
 */
(function($, window, document) {

    var machine = new Machine(function(data) {

        // TODO convert these to React style
        $('#btn-next').hide();
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
                attr('division', window.dict[v]['division']).
                attr('name', window.dict[v]['name']).
                append(v);
            $('ul.rolling-list').append($li);
        });
        function loopAndLoop(counter) {
            var numbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳'];
            $('ul.rolling-list').find(":first-child").remove();

            var nextTime = 100;
            var winHeight = $(window).height();
            $('.rolling-list').css({
                                       'height': winHeight-60,
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
                $('#winner-prize').text(numbers[window.prize-1]);
                $('#winner-id').text($winner.text());
                $('#winner-company').text($winner.attr('company'));
                $('#winner-division').text($winner.attr('division'));
                $('#winner-name').text($winner.attr('name'));

                setTimeout(function() {

                    $('.main-container').removeClass('show animated fadeOutUp');
                    $('.main-container').addClass('hide');
                    // $('#result-view-container').addClass('show animated fadeInDown');
                    $('#result-view-container').addClass('show');
                    if (window.prize !== 1)
                        $('#btn-next').show();
                }, 1000);
                // setTimeout(function() {
                //     $('#winner-span').text("SIA - 123456")
                // }, 2000)
                // setTimeout(function(){
                //     $('#winner-span').text("DIV - SIA - 123456")
                // }, 2000)
                // setTimeout(function(){
                //     $('#winner-span').text("Zhe Wang - DIV - SIA - 123456")
                // }, 2500)
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
                'height' :  winHeight/1.5,
                'width' : winHeight/1.5,
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
                'height' :  winHeight/2.5,
                'width' : winHeight/2.5,
                'border-radius': ($(this).width()),
                'margin-top': winHeight/4,
                'margin-left': winHeight/8
            });
            $('#btn-next i.fa-compass').css({
                'font-size': $('#btn-next').height()/2
            });
            $('#btn-next span.text').css({
                'font-size': $('#btn-next').height()/5
            });
        };

        updateStartButtonStyle();
        $(window).resize(function(){
            updateStartButtonStyle();
        });

        function go() {
            // if (window.items.length > 0) {
            machine.rand();
            // } else {
            //     showEditListView();
            // }
        }

        $('.btn-start').bind('click', function() {
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

    });
})(jQuery, window, document);