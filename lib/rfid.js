'use strict';

var Reporter = require('./reporter'),
    RfidLib = require('rfid-pn532'),
    Tessel = require('tessel');

var Rfid = RfidLib.use(Tessel.port['A']),   // the rfid event emitter
    clockedIn = []; // the map of cards that are clocked in

// listen for 'ready' events
Rfid.on('ready', function () {
    // Well, I'm sorry that I left my home.
    console.log('RFID -> Card reader ready!');
});

// listen for 'data' events, aka when a card is present
Rfid.on('data', function(card) {
    // Look over yonder there, on the farther shore.  I see a ship of gold.
    var cardId = card.uid.toString('hex');
    console.log('RFID -> Card detected:', cardId);

    if(!clockedIn[cardId]) {
        // What time is it?
        var inTime = new Date();
        clockedIn[cardId] = inTime.getTime();
        // One of the these days the ship of gold will carry me to my reward.
        console.log('RFID -> Clocking in card %s at time:', cardId, inTime);

        // report the activity
        Reporter.clockIn({deviceId: deviceId, cardId: cardId, timestamp: clockedIn[cardId]})
    } else {
        // Ah, to hear the horns of jubilee.
        var outTime = new Date();
        console.log('RFID -> Clocking out card %s at time:', cardId, outTime);

        // The bullfrog sleeps all day.
        var duration = outTime.getTime() - clockedIn[cardId];
        console.log('RFID -> %s was clocked in for %dms', cardId, duration);
        // I believe I'll take my rest.
        delete clockedIn[cardId];

        // report the activity
        Reporter.clockOut({deviceId: deviceId, cardId: cardId, timestamp: outTime.getTime(), duration: duration})
    }
});

// listen for 'error' events
Rfid.on('error', function (err) {
    // Once again I'm denied my choice.
    console.error('RFID -> There was an error initializing the RFID reader.', err.message);
});
