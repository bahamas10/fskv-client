var FSKVClient = require('../');

var key = '';

var db = new FSKVClient('http://localhost:9000');

var code = 1;

console.log('\nGET /data/%s', key);
var req = db.get(key);

req.on('error', function(err) {
  console.dir(err);
  code = 0;
});

process.on('exit', exit);

function exit() {
  process.reallyExit(code);
}
