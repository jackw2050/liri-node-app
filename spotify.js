//https://www.npmjs.com/package/spotify

var spotify = require('spotify');
 
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 console.log(JSON.stringify(data, null, 2));
    // Do something with 'data' 
});