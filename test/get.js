var assert = require('assert');

var FSKVClient = require('../');

var key = 'fskv-client-test';

var db = new FSKVClient('http://localhost:9000');

console.log('\nGET /data/%s', key);
db.get(key, function(err, res, body) {
  if (err) throw err;
  console.log('statusCode -> %d', res.statusCode);
  assert(res.statusCode === 200);
  console.log('body = %s', body);
  assert(body);
});
