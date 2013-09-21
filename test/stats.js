var assert = require('assert');

var FSKVClient = require('../');

var db = new FSKVClient('http://localhost:9000');


db.stats(function(err, res, body) {
  if (err) throw err;
  console.log('statusCode -> %d', res.statusCode);
  assert(res.statusCode === 200);
  console.dir(body);
  assert(body);
});
