3PRoll
======

A new type of sushi roll that will expose Payroll services to everyday people. This service will bring the cash society into compliance with local and federal laws and allow the service industry to be paid daily for their work.

IoT
---

This project uses the [Tessel](http://tessel.io/) hardware. Tessel is a microcontroller that runs JavaScript. It is [Node](http://nodejs.org)-compatible and ships with Wifi built in.

This project uses two additional boards:

* [rfid-pn532](https://tessel.io/modules#module-rfid) - This module reads the RFID card of the hourly worker.
* [sdcard](https://tessel.io/modules#module-sdcard) - This module represents the disk needed to store transaction data in the event the Wifi connection is down (Stand-In).
