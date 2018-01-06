#!/usr/bin/node

var hashclient = require('../hashclient.js');
var config = require('./config.json');

var username = config.username;
var password = config.password;

var THE_HASH = "9dbd72de6836ce7c05c0c065b474af43598cdaace5deae8054e8efb03cb58d81";

var SmartHealth = function(username, password) {

  this.hashClient = new hashclient();

  if (username && password) {
    hashClient.authenticate(username, password, function (err, result) {
      this.hashClient = new hashclient(result.access_token, result.refresh_token);
    });
  };
};

SmartHealth.prototype._logReceipt = function (err, receipt) {
    console.log("receiptId", receipt.receiptId);
    console.log("timestamp", receipt.timestamp);

    if (err) console.log("error", err);
};

SmartHealth.prototype.submitHashItem = function (hash, callback) {
  return this._submitHashItem(hash, callback/*this._logReceipt*/);
};

var SmartHealth = new SmartHealth(username, password);
SmartHealth.submitHashItem(THE_HASH, SmartHealth._logReceipt);
