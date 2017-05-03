/**
 * User: Mike Chung
 * Date: 22/6/14
 * Time: 8:24 PM
 */
var io = require('socket.io')();

function boardcast(eventName, data) {
    io.sockets.emit(eventName, data);
}

io.emitCandidates = function(data) {
    boardcast('candidates', data);
};

io.emitRandResult = function(data) {
    boardcast('randResult', data);
};

io.emitIsWithoutReplacement = function(isWithoutReplacement) {
    boardcast('isWithoutReplacement', isWithoutReplacement);
};

module.exports = io;