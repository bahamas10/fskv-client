var assert = require('assert');
var fs = require('fs');

var FSKVClient = require('../');

var db = new FSKVClient('http://localhost:9000');

var key = 'fskv-put-test';

var rs = fs.createReadStream('/etc/passwd');

rs.pipe(db.put(key, function(err, res, body) {
  if (err) throw err;
  console.log('statusCode = %d', res.statusCode);
  assert(res.statusCode === 200);
  console.log(body);
  assert(body);
}));
