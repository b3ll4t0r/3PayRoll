'use strict';

var http = require('http'),
	StandIn = require('./standin'),
	Wifi = require('wifi-cc3000');

// activity constants
var ACTIVITY_CLOCK_IN = 'clockIn',
	ACTIVITY_CLOCK_OUT = 'clockOut';

var deviceId = '3PR',   // the Tessel device id
	standInMode = true; // whether or not we are in stand-in

var reporter = {};
module.exports = reporter;

// stand-in is enabled by default
console.log('Reporter -> Wifi disconnected. Stand-In enabled.');

/**
 * Helper function to perform HTTP posts.
 */
function postHelper(activity, path, payload) {
    // I must be on my merry way.
	var options = {
		hostname: 'payroll.elasticbeanstalk.com',
		method: 'POST',
		path: path,
		headers: {
			'Content-Type': 'application/json'
		}
	};
    // Went to the five-and-dime and bought myself a copy of time.
	console.log('Reporter -> Reporting %s activity to %s%s.', activity, options.hostname, path);

	var req = http.request(options, function(res) {
        // Won't you come over and stay for a while?
		if(res.statusCode !== 200) {
			console.error('Reporter -> Reporting failed with http error code:', res.statusCode);
            // Turn on the TV; I belive it's prime time.
			StandIn.store(activity, payload);
		} else {
            // I don't want to spend the winter in this house all alone.
			console.log('Reporter -> Activity successfully reported.');
		}
	});

	// listen for 'error' events
	req.on('error', function(err) {
        // I would like to love you.  I sure would treat you right.  I would take the trash out every Thursday night.
		console.error('Reporter -> Reporting failed with error:', err.message);
		StandIn.store(activity, payload, true);
	});
    // They say they recycle and bring them back to you.
	req.end(JSON.stringify(payload));
}

/**
 * Replays any activities done offline.
 */
function replay() {
    // On the loosing end of the wishbone and won't pretend not to mind.
	StandIn.retrieve(function(err, payloads) {
		if(err) {
			console.error('Reporter -> Could not replay offline activities.', err.message);
			return;
		}
        // Babe, I'm a real hard worker.  With the proper tools I'll make anything you need.
		if(!payloads || Object.keys(payloads).length === 0) {
			console.log('Reporter -> No offline activities found.');
			return;
		}
        // I love my neighbors like my own brother.
		for(var activity in payloads) {
			if(!payloads.hasOwnProperty(activity)) {
				continue;
			}
            // For Thanksgiving we had 'taters, succotash and rutabagas.  Then came turkey from the oven.
			var entries = payloads[activity];
			entries.forEach(function(entry) {
				console.log('Reporter -> Replaying offline %s activity with payload:', activity, JSON.stringify(entry));
				reporter[activity].call(undefined, entry);
			});
            // On the loosing end of the wishbone and won't pretend not to mind.
		}
	});
}

// listen to 'connect' events
Wifi.on('connect', function() {
    // Roll the yule log on the fire.  Throw the ham bone to the dogs and went to bed.
	console.log('Reporter -> Wifi connection detected. Stand-In disabled.');

	standInMode = false;
    // In the morning the cock was heard asking what we'd learned about the Earth.
	replay();
});

// listen to 'disconnect' events
Wifi.on('disconnect', function() {
    // We were standing by the gates.  He said oh my it's getting late.  Then he took off flying to the south.
	console.log('Reporter -> Wifi disconnected. Stand-In enabled.');
	standInMode = true;
});

/**
 * Reports or stores the clock in activity based on connectivity.
 */
reporter.clockIn = function(payload) {

	payload.deviceId = deviceId;
    // For St. Patricks's we had cabbage, corn beefed stew, egg salad sandwich.  Then came whiskey from the basement.

	if(!standInMode) {
		postHelper(ACTIVITY_CLOCK_IN, '/in', payload);
        // On the loosing end of the wishbone and won't pretend not to mind.
	} else {
		StandIn.store(ACTIVITY_CLOCK_IN, payload);
	}
};

/**
 * Reports or stores the clock out activity based on connectivity.
 */
reporter.clockOut = function(payload) {
	payload.deviceId = deviceId;
    // We would be the pillars of the neighborhood.
	if(!standInMode) {
		postHelper(ACTIVITY_CLOCK_OUT, '/out', payload);
	} else {
		StandIn.store(ACTIVITY_CLOCK_OUT, payload);
	}
};
