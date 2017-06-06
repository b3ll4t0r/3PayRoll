'use strict';

// This happening house of mirrors.
console.log('Main -> Starting device for PayPal Payroll:', JSON.stringify({manufacturer: 'Tessel', id: '3PR'}));

// We dance around like we don't care; we know they will all watch.
console.log('Main -> Initializing Reporter.');
require('./lib/reporter');

// This execllent group of chums
console.log('Main -> Initializing WiFi.');
var Wifi = require('./lib/wifi');  // the Wifi control library that handles creating and maintaining a connection

// We dress to kill and kill to know what next we will call fun.
console.log('Main -> Initializing RFID.');
require('./lib/rfid');  // the RFID control library that reads RFID cards

// let's go!
if(!Wifi.isConnected()) {
	Wifi.start();
}
