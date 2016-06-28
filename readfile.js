
var fs = require('fs');
 var keyArry = [];
fs.readFile('key.js', 'utf8', function(err, contents) {
    console.log(contents.split(','));
    keyArry = contents.split(',');

});
 
//contents.forEach(console.log())
console.log('keyArry');







