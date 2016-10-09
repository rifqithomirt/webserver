var crypto = require('crypto');
var url = require('url');
var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  var parse = url.parse(req.url);
  var api = parse.pathname;
  api = api.split('/');
  console.log(api);
  if(api[1] == 'auth'){
    if(api[2] == 'read'){
      console.log(QueryStringToJSON(parse.query));
      res.end('Hello World\n');  
    } else if(api[2] == 'create'){
      
    }
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
var QueryStringToJSON = function (qstring) {            
    var pairs = qstring.split('&');
    
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};
var sha512 = function(password, salt){
    var hash = crypto.createHmac('md5', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};
function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('\nSalt = '+passwordData.salt);
}
/*
username --> md5		a24338a2c5a73e6e
password --> md5 + salt  	Passwordhash = 61c976b38850260559f77a0f8e1b03b2
*/