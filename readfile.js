
var fs = require('fs');
/* var keyArry = [];
fs.readFile('key.js', 'utf8', function(err, contents) {
    console.log(contents.split(','));
    keyArry = contents.split(',');

});
*/var myData = {
	command: "command",
	data: "data"
}


myData.command = "spotify-this";
myData.data = "yellow submarine";

 //fs.appendFileSync('log.txt', 'flags');

fs.appendFile('./log.txt', myData.command + ":" + myData.data + "," , function(err) {
  if (err) throw err;
});
//contents.forEach(console.log())
//console.log('keyArry');







