var assert = require('assert');

var FSKVClient = require('../');

var key = '';

var db = new FSKVClient('http://localhost:9000');

console.log('\nGET /data/%s', key);
db.get(key, function(err, res, body) {
  console.dir(err);
  assert(err);
});
