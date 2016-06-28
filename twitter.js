var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'AgTsAxmi7aY8m6ctfdz7fRtNE',
  consumer_secret: 'M5uScgwEohM1uNI12Lr1qXC6w3QqtrzWmSqpXvZmi7aa4z5f2m',
  access_token_key: '746508303623041025-KBZh2lK81FgSkO2EWxSNJpFSo8ECkWN',
  access_token_secret: 'wiky1MKrKx2hc75J97M1trdufwuWlZxn3I4UoJUN1f7Qd'
});
 
var params = {screen_name: 'mbajack2'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
   //console.log(JSON.stringify(tweets, null, 2));
   for( var ii = 0; ii < tweets.length; ii++){
   	console.log("Tweet:  " + tweets[ii].text + "    Created: " + tweets[ii].created_at);
   }
  }
  else{
  	console.log(error);
  }
});


//https://www.npmjs.com/package/twitter