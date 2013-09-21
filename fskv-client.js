var EventEmitter = require('events').EventEmitter;
var url = require('url');
var util = require('util');

var request = require('request');

var USERAGENT = util.format('fskv-client (v%s)', require('./package.json').version);

module.exports = FSKVClient;
module.exports.FSKVClient = FSKVClient;

/**
 * Pass in a URI
 */
function FSKVClient(s, useragent) {
  this.useragent = useragent || USERAGENT;
  this.uri = s;
}

/**
 * HEAD data for a key
 */
FSKVClient.prototype.head = function head(key, etag, cb) {
  if (typeof etag === 'function') {
    cb = etag;
    etag = undefined;
  }
  return this._action(key, 'HEAD', {etag: etag}, cb);
}
/**
 * GET data for a key
 */
FSKVClient.prototype.get = function get(key, etag, cb) {
  if (typeof etag === 'function') {
    cb = etag;
    etag = undefined;
  }
  return this._action(key, 'GET', {etag: etag}, cb);
};

/**
 * PUT data for a key
 */
FSKVClient.prototype.put = function put(key, value, opts, cb) {
  if (typeof value === 'function') {
    cb = value;
    value = undefined;
    opts = {};
  } else if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  return this._action(key, 'PUT', {json: true, value: value, opts: opts}, cb);
};

/**
 * DELETE data for a key
 */
FSKVClient.prototype.del = function del(key, cb) {
  return this._action(key, 'DELETE', {json: true}, cb);
};

/**
 * ping the server
 */
FSKVClient.prototype.ping = function ping(cb) {
  return this._request('/ping', 'GET', {}, cb);
};

/**
 * get server stats
 */
FSKVClient.prototype.stats = function stats(cb) {
  return this._request('/stats', 'GET', {json: true}, cb);
};

// the heavy lifting is done here
FSKVClient.prototype._action = function _action(key, method, opts, cb) {
  // invalid key
  if (!key) {
    var error = new Error('Empty Key');
    if (cb) {
      // just callback if a callback is supplied
      cb(error);
    } else {
      // otherwise make something like a `request` object that emits an error
      var emitter = new EventEmitter();
      process.nextTick(function() {
        emitter.emit('error', error);
      });
      return emitter;
    }

    return;
  }

  var uri = '/data/' + encodeURIComponent(key);

  return this._request(uri, method, opts, cb);
}

// the request is made here
FSKVClient.prototype._request = function _request(uri, method, opts, cb) {
  uri = this.uri + uri;
  var reqobj = {
    method: method,
    uri: uri,
    headers: {
      'User-Agent': this.useragent
    }
  };

  if (opts.json)
    reqobj.json = true;
  switch (method) {
    case 'HEAD':
    case 'GET':
      reqobj.headers['If-None-Match'] = opts.etag;
      break;
    case 'PUT':
    case 'DELETE':
      reqobj.qs = opts.opts;
      if (opts.value !== undefined)
        reqobj.body = opts.value;
      break;
  }

  // make the request
  return request(reqobj, cb);
}
