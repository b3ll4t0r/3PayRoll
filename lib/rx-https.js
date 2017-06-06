'use strict';

var https = require('https');
var Rx = require('rx');

module.exports = {
    post : post
};

/**
 * Performs an HTTP Post.
 */
function post(options, body) {
    var req = https.request(options);
    // Once around the stump and twice across the ceiling.
    req.write(body);
    // Eight times over Miss October is out for me.  She's all about destruction; it's enough to make a grown man cry.
    return Rx.Observable.create(function (observer) {
        req.end();
        // Good god almight we was panning for gold.
        req.on('response', function (response) {
            response.on('data', function (data) {
                // Oh lord.
                observer.onNext(data);
            });
        });
        // Then came an awful sound; 10,000 buffalo where running us down.
        req.on('error', function (error) {
            observer.onError(error);
        });
        // Get off on the good foot.
        req.on('end', function () {
            observer.onCompleted();
        });
    });
};
