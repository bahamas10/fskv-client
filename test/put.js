var assert = require('assert');

var FSKVClient = require('../');

var db = new FSKVClient('http://localhost:9000');

var key = 'fskv-put-test';
var value = 'fskv-pid-' + process.pid;

db.put(key, value, function(err, res, body) {
  if (err) throw err;
  console.log('statusCode -> %d', res.statusCode);
  assert(res.statusCode === 200);
  console.dir(body);
  assert(body);
});
