var assert = require('assert');

var FSKVClient = require('../');

var db = new FSKVClient('http://localhost:9000');

var keys = ['fskv-client-test', 'fskv-put-test'];

keys.forEach(function(key) {
  db.del(key, function(err, res, body) {
    if (err) throw err;
    console.log('statusCode -> %d', res.statusCode);
    assert(res.statusCode === 200);
    console.dir(body);
    assert(body);
  });
});
