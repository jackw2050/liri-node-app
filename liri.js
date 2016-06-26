'use strict';
var inquirer  = require('inquirer');
var geocoder  = require('geocoder');
var spotify   = require('spotify');
var omdb      = require('omdb');
var Twitter   = require('twitter');
var oauth     = require('oauth');


// do this


console.log('Hi, welcome to LIRI');
inquirer.prompt([
    // Have user select command
    {
        type: "list",
        message: "Command?",
        choices: ["my-tweets", "spotify-this-song", "movie-this"],
        name: "command"
    }



    // Once we are done with all the questions... "then" we do stuff with the answers
    // In this case, we store all of the answers into a "user" object that inquirer makes for us. 
]).then(function(user) {

    //console.log(JSON.stringify(user, null, 2));

    switch (user.command) {
        case "my-tweets":
            console.log(user.command);
            GetTweets();
            break;
        case "spotify-this-song":
            GetSongName();
            break;
        case "movie-this":
            GetMovieName();
            break;
    }


});

// ---------------------------------  Spotify Section ---------------------------------
function GetSongName() {
    inquirer.prompt([
        // Have user select command
        {
            input: "list",
            message: "Song name?",
            name: "song"
        }
        // Once we have the song name get the data from Spotify
    ]).then(function(user) {

        //console.log(JSON.stringify(user, null, 2));
        spotify.search({ type: 'track', query: user.song }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log(JSON.stringify(data, null, 2));
            // Do something with 'data' 
        });
    });
}
// ---------------------------------  OMDB Section ---------------------------------
function GetMovieName() {
    inquirer.prompt([
        // Have user select command
        {
            input: "list",
            message: "Movie name?",
            name: "movie"
        }
        // Once we have the song name get the data from Spotify
    ]).then(function(user) {
omdb.search(user.movie, function(err, movies) {
    if(err) {
        return console.error(err);
    }
 
    if(movies.length < 1) {
        return console.log('No movies were found!');
    }
 
    movies.forEach(function(movie) {
        console.log('%s (%d)', movie.title, movie.year);
    });
});
 
omdb.get({ title: user.movie}, true, function(err, movie) {
    if(err) {
        return console.error(err);
    } 
    if(!movie) {
        return console.log('Movie not found!');
    }
    console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
    console.log(movie.plot);
});

    });
}

// ---------------------------------  Twitter Section ---------------------------------

function GetTweets(){

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});


}
