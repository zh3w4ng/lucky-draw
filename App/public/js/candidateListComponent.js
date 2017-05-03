/** @jsx React.DOM */
(function($, document, machine) {

    machine.registerCandidatesUpdateHandler(function(data) {
        window.items = data.candidates;
        window.dict = data.dict;
        if (window.prize === undefined)
          window.prize = 11;
        else
          window.prize = window.prize - 1;
        // console.log(window.prize);
    });
    machine.registerUpdateIsWithoutReplacementHandler(function(isWithoutReplacement) {
        window.isWithoutReplacement = isWithoutReplacement;
    });
})(jQuery, document, window.machine);
