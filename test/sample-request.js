'use strict';

var https = require('../lib/rx-https');

var options = {
    hostname: 'svcs.sandbox.paypal.com',
    method: 'POST',
    path: '/AdaptivePayments/Pay',
    headers: {
        'X-PAYPAL-SECURITY-USERID': 'varunmc-facilitator_api1.gmail.com',
        'X-PAYPAL-SECURITY-PASSWORD': '8JF2DDV6RHSSJMHN',
        'X-PAYPAL-SECURITY-SIGNATURE': 'AFcWxV21C7fd0v3bYYYRCpSSRl31A0UKNy4lLZC5H.MoDpaSUsWg8osB',
        'X-PAYPAL-REQUEST-DATA-FORMAT': 'JSON',
        'X-PAYPAL-RESPONSE-DATA-FORMAT': 'JSON',
        'X-PAYPAL-APPLICATION-ID': 'APP-80W284485P519543T'
    }
};

var body = {
    "actionType": "PAY",
    "senderEmail": "varunmc-facilitator@gmail.com",
    "cancelUrl": "http://www.google.com",
    "currencyCode": "USD",
    "receiverList": {
        "receiver": [
            {
                "email": "varunmc-buyer@gmail.com",
                "amount": "1.00"
            }
        ]
    },
    "requestEnvelope": {
        "errorLanguage": "en_US",
        "detailLevel": "ReturnAll"
    },
    "returnUrl": "http://www.google.com"
};

https.post(options, JSON.stringify(body)).subscribe(
    function (data) {
        console.log(data.toString());
    },
    function (error) {
        console.log('error ' + error);
    },
    function () {
        console.log('completed');
    }
);
