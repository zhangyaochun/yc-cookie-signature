'use strict';

//core lib
var crypto = require('crypto');

//sign
var sign = exports.sign = function(val, secret) {
    //TODO no arguments check
    //i use createHmac
    //Hash Message Authentication Code
    return val + '.' + crypto.createHmac('sha256', secret)
            .update(val)
            .digest('base64')
            .replace(/\=+$/, '');
   
};


//unsign
exports.unsign = function(val, secret) {
    //see sign rule
    var oldVal = val.slice(0, val.lastIndexOf('.'));
    var macVal = sign(oldVal, secret);

    //now i use this 
    if (sign(macVal, secret) == sign(val, secret)) {
        return oldVal;
    }

    return false;
};
