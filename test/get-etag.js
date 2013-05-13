var assert = require('assert');

var FSKVClient = require('../');

var key = 'fskv-client-test';

var db = new FSKVClient('http://localhost:9000');

// first get the key
console.log('\nGET /data/%s', key);
db.get(key, function(err, res, body) {
  if (err) throw err;
  console.log('statusCode -> %d', res.statusCode);
  assert(res.statusCode === 200);
  console.log('ETag -> %s', res.headers.etag);
  assert(res.headers.etag);
  console.log('body -> %s', body);
  assert(body);
  console.log('\nGET /data/%s (with ETag)', key);
  db.get(key, res.headers.etag, function(e, r, b) {
    if (err) throw err;
    console.log('statusCode -> %d', r.statusCode);
    assert(r.statusCode === 304);
    assert(!b);
  });
});
