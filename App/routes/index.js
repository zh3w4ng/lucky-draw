var express = require('express'),
    router = express.Router(),
    isWithoutReplacement = true,
    conf = require('../conf').preloadCandidates,
    _ = require('lodash'),
    fs = require('fs'),
    io = require('../lib/io');

var candidates = _.keys(conf);
var dict = conf;

router.post("/addCandidate", function(req, res) {
    var val = req.param('candidate');
    if (val && val !== "") {
        candidates.push(val);
        boardcastCandidates();
    }
    res.end();
});

router.post('/removeCandidate', function(req, res) {
    var val = req.param('candidate');
    candidates = _.without(candidates, val);
    boardcastCandidates();
    res.end();
});

router.post('/clearCandidates', function(req, res) {
    candidates = [];
    boardcastCandidates();
    res.end();
});

router.post('/setWithReplacement', function(req, res) {
    isWithoutReplacement = req.param('isWithoutReplacement') === "true";
    io.emitIsWithoutReplacement(isWithoutReplacement);
    res.end();
});

router.post('/rand', function(req, res) {
    var maxDistance = 50;
    var minDistance = 30;
    var randomNumber = _.random(candidates.length)-1,
        poorMan = candidates[randomNumber],
        distance = _.random(minDistance, maxDistance);
    console.log('Randomizing among items of: ' + candidates.length);
    io.emitRandResult({poorMan: poorMan, randomNumber: randomNumber, distance: distance});
    if (isWithoutReplacement) {
        candidates = _.without(candidates, poorMan);
        boardcastCandidates();
    }
    fs.appendFile('winners.txt', req.param('prize') + ': ' + poorMan + "\n", function (err) {
      if (err) throw err;
      console.log('Saved: ' + poorMan);
    });
    res.end();
});

io.on('connection', function(socket) {
    socket.emit('candidates', {candidates: candidates, dict: dict});
    socket.emit('isWithoutReplacement', isWithoutReplacement);
});

var boardcastCandidates = function() {
        io.emitCandidates({candidates: candidates, dict: dict});
    };

module.exports = router;
