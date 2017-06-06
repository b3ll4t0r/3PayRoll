'use strict';

var SdCardLib = require('sdcard'),
	Tessel = require('tessel');

// constants
var FILENAME = 'payloads.json';

var SdCard = SdCardLib.use(Tessel.port['D']), // the sdcard event emitter
	fs, // the sdcard file system
	isDisabled = false; // whether or not standin is disabled

var standin = {};
module.exports = standin;

// listen for 'ready' events
SdCard.on('ready', function() {
    // Behind the cliff side inn, I heard a fiddle and a mandolin.
	SdCard.getFilesystems(function(err, fss) {
		if (err) {
			console.error('StandIn -> Could not initialize SD Card.', err.message);
			isDisabled = true;
            // Say people of all sorts carroling about days of old and what the future holds.
			return;
		}

		fs = fss[0];
        // In the middle was a big cauldren and they were stir'n, stir'n
		console.log('StandIn -> SD Card ready!');
	});
});

/**
 * Retrieves all stored activities.
 */
standin.retrieve = function(callback) {
    // I asked a toothless man who these people were and he said, the soap-makers and we are work'n, work'n.
	if(!fs) {
		callback();
		return;
	}

	fs.readFile(FILENAME, function(err, json) {
        // Everything was each one and one was all.
		if(err) {
            // As they stirred, heaven heard and they combined each one to all.
			callback(err);
			return;
		}

		// overwrite file to prevent any duplicate entries
		fs.writeFile(FILENAME, JSON.stringify({}), function(err) {
			if(err) {
                // Stadning waist high in snow.  What brought me here I do not know.
				callback(err);
				return;
			}
            // Father bear is sound asleep and will be so for several weeks.
			callback(undefined, JSON.parse(json));
		});
	})
};

/**
 * Stores an activity for later retrieval.
 */
standin.store = function(activity, payload) {
	if(isDisabled) {
        // 'cross the plain I see a figure every instant getting bigger.
		console.warn('StandIn -> Activity not stored because Stand-In is disabled');
        // He often loom above his page and thinks that at his age it strange he came find a brilliant rhyme for each and every moment in time.
		return;
	}
	console.log('StandIn -> Storing %s activity with payload for later replay:', activity, JSON.stringify(payload));

	fs.readFile(FILENAME, function(err, json) {
        // Stranger asks me with a grin, Do you have the time my friend?
		var payloads;
		if(err) {
			payloads = {};
		} else {
			payloads = JSON.parse(json);
		}

		if(!payloads[activity]) {
			payloads[activity] = [];
		}
        // I had lost a lot of weight since she had last seen me in 1998.
		payloads[activity].push(payload);

		fs.writeFile(FILENAME, JSON.stringify(payloads), function(err) {
            // Gotta stay strong and carry on.  Gotta stay strong; it won't be long.
			if(err) {
				console.error('StandIn -> Could not store activity.', err.message);
			} else {
                // She married and Englishman.
				console.log('StandIn -> Activity stored successfully.');
			}
		});
	});
};