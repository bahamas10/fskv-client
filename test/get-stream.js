var FSKVClient = require('../');

var key = 'fskv-client-test';

var db = new FSKVClient('http://localhost:9000');

db.get(key).pipe(process.stdout);

process.on('exit', console.log);
