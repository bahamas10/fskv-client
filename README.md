fskv-client
===========

A Node [fskv](https://github.com/bahamas10/fskv) client

Installation
------------

First, install [Node.JS](http://nodejs.org/).  Then:

    npm install fskv-client

Example
-------

Given:

``` js
var FSKVClient = require('fskv-client').FSKVClient;
var db = new FSKVClient('http://localhost:9000');
```

### `PUT`

``` js
db.put('my key', 'my value', function(err, res, body) {
  console.log(res.statusCode);
  // => 200
  console.dir(body);
  // => { message: 'saved', status: 'ok' }
});
```

### `GET`

``` js
db.get('my key', function(err, res, body) {
  console.log(res.statusCode);
  // => 200
  console.log(body);
  // => 'my value'
});
```

### `DELETE`

``` js
db.del('my key', function(err, res, body) {
  console.log(res.statusCode);
  // => 200
  console.dir(body);
  // => { message: 'deleted', status: 'ok' }
});
```

Functions
---------

### `db.get(key, [etag], [cb])`

Execute a `GET` request for the given `key`.

- `etag`: An optional etag to use when making the request.  If the etag matches, a 304 is returned with no data
- `cb`: An optional callback.  If not callback is supplied, the request is returned as an event emitter that can be piped

``` js
db.get('my key').pipe(process.stdout);
```

### `db.head(key, [etag], [cb])`

Same as `GET` above, but no data is ever returned.

### `db.put(key, [value], [opts], [cb])`

Execute a `PUT` on the database with the given `key`.

- `value`: An Optional value to put in the database.  If not supplied, it is assumed an EventEmmiter will be piped into the object.
- `opts`: An optional object to pass in as a query string.  Example: `{exclusive: true}` for exclusive requests.
- `cb`: An optional callback

``` js
var fs = require('fs');
var rs = fs.createReadStream('/etc/passwd');

var req = db.put(key, function(err, res, body) {
  if (err) throw err;
});

rs.pipe(req);
```

### `db.del(key, [cb])`

Execute a `DELETE` on the database with the given `key`.

- `cb`: An optional callback

License
-------

MIT
