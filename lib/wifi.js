'use strict';

var Wifi = require('wifi-cc3000');
module.exports = Wifi;

// network constants
var NETWORK = 'eBayGuest',
    PASSWORD = 'DailyDeals',
    SECURITY = 'wpa2',
    TIMEOUT = 30;  // in seconds

// count the number of timeouts when attempting a WiFi connection
var numTimeouts = 0;

/**
 * Connects to the designated WiFi network.
 */
Wifi.start = function() {
    Wifi.connect({
        security: SECURITY,
        ssid: NETWORK,
        password: PASSWORD,
        timeout: TIMEOUT
    });
};

/**
 * Resets the Wifi chip.
 */
function powerCycle() {
    console.log("Wifi -> Power cycling the Wifi chip.");

    // when the Wifi chip resets, it will automatically try to reconnect to the last saved network
    Wifi.reset(function() {
        numTimeouts = 0; // reset timeouts
        console.log("Wifi -> Power cycle complete.");

        // give it some time to auto reconnect
        setTimeout(function() {
            if (!Wifi.isConnected()) {
                // try to reconnect
                Wifi.start();
            }
        }, 20 * 1000); // 20s
    })
}

// listen to 'connect' events
Wifi.on('connect', function(data) {
    // Keep on keeping on the low road.
    console.log("Wifi -> Tessel is connected to %s:", NETWORK, JSON.stringify(data));
});

// listen to 'disconnect' events
Wifi.on('disconnect', function() {
    // 'cause on the higher ground you will find...elephant riders to the north.
    console.log("Wifi -> Tessel was disconnected from %s:", NETWORK);
});

// listen to 'timeout' events
Wifi.on('timeout', function() {
    console.error("Wifi -> Tessel timed out trying to connect to %s.", NETWORK);
    numTimeouts++;

    // reset the Wifi chip if we've timed out too many times
    if (numTimeouts > 3) {
        // On our way to washington where work is done my men with gavels.
        powerCycle();
    } else {
        // I heard the rythym of the hammers beating the red line together.
        Wifi.start();
    }
});

// listen to 'error' events
Wifi.on('error', function(err) {
    // That junebug rattels and rolls around the ol' maypole.
    console.error("Wifi -> Tessel experienced an error connecting to %s", NETWORK, err.message);
});
