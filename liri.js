'use strict';
//LIRI-Austin
/*

add for each [key] to searches 





*/

var fs = require('fs');
var keys = require("./key.js");
//var request = require('./request');

var inquirer = require('inquirer');
var geocoder = require('geocoder');
var spotify = require('spotify');

//var omdb = require('omdb');
var APIClinet = require('omdb-api-client');
var omdb = new APIClinet();


var Twitter = require('twitter');
var oauth = require('oauth');


console.log('Hi, welcome to LIRI');
inquirer.prompt([
    // Have user select command
    {
        type: "list",
        message: "Command?",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "command"
    }
]).then(function(user) {
    //console.log(JSON.stringify(user, null, 2));
    switch (user.command) {
        case "my-tweets":
            GetTweets(user.command);
            break;
        case "spotify-this-song":
            GetSongName(user.command);
            break;
        case "movie-this":
            GetMovieName(user.command);
            break;
        case "do-what-it-says":
            // GetMovieName();
            break;
    }
});

function LogThis(selectedCmd, itemName) {
    var myData = {
        command: "command",
        data: "data"
    }
    myData.command = selectedCmd;
    myData.data = itemName;

    //fs.appendFileSync('log.txt', 'flags');

    fs.appendFile('./log.txt', myData.command + ":" + myData.data + "," + "\n", function(err) {
        if (err) throw err;
    });
}

// ---------------------------------  Spotify Section ---------------------------------
function GetSongName(selectedCommand) {
    inquirer.prompt([
        // Have user select command
        {
            input: "list",
            message: "Song name?",
            name: "song"
        }
        // Once we have the song name get the data from Spotify
    ]).then(function(user) {
        console.log('--------------------------------------------------------------------------------');
        var songName = user.song;

        //console.log(JSON.stringify(user, null, 2));

        if (user.song == '') {
            songName = "what's my age again";
            console.log(songName);
        }

        spotify.search({ type: 'track', query: songName }, function(err, data) {
            LogThis(selectedCommand, songName);
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
           // console.log(data.tracks.items.length);
          //  console.log(JSON.stringify(data.tracks.items[1].artists, null, 2));
            for (var count = 0; count < data.tracks.items.length; count++) {


                console.log("Artist:      " + data.tracks.items[count].artists[0].name); // artist name
                console.log("Song name:   " + user.song); // song name
                console.log("Preview URL: " + data.tracks.items[count].preview_url); // preview link
                console.log("Album name:  " + data.tracks.items[count].album.name); // album name
                console.log('--------------------------------------------------------------------------------');
            }
        });
    });
}
// ---------------------------------  OMDB Section ---------------------------------
/*Title

if no movie is provided then the program will output information for the movie: 'Mr. Nobody'

if you haven't watched Mr. Nobody then you should: http://www.imdb.com/title/tt0485947/
You can catch it on Netflix

*/


function GetMovieName(selectedCommand) {

    inquirer.prompt([{
        input: "list",
        message: "Movie name?",
        name: "movie"
    }]).then(function(user) {

        var movieName = user.movie;


        //console.log(JSON.stringify(user, null, 2));

        if (user.movie == '') {
            movieName = "Mr. Nobody";
            console.log("if you haven't watched " + movieName + " then you should. You can catch it on Netflix");
        }

        omdb({ t: movieName, tomatoes: 'true' }).list().then(function(movie) {
            LogThis(selectedCommand, movieName);
            console.log("Movie name:  " + (movie.title ? movie.title : "Not listed"));
            console.log("Year:        " + (movie.year ? movie.year : "Not listed"));
            console.log("IMDB rating: " + (movie.imdbRating ? movie.imdbRating : "Not listed"));
            console.log("Country:     " + (movie.countries ? movie.countries : "Not listed"));
            console.log("Language:    " + (movie.languages ? movie.languages : "Not listed"));
            console.log("Plot:        " + (movie.plot ? movie.plot : "Not listed"));
            console.log("Actors:      " + (movie.actors ? movie.actors : "Not listed"));
            console.log("Rotton Tomatoes Rating:  " + (movie.tomatoRating ? movie.tomatoRating : "Not listed"));
            console.log("Rotton Tomatoes URL:     " + (movie.tomatoURL ? movie.tomatoURL : "Not listed"));
            console.log('--------------------------------------------------------------------------------');

            //console.log(movie);
        }).catch(function(err) {
            console.log("Error. \nMovie not found.  \nPlease check spelling and try again.");
        });
    })
}

// ---------------------------------  Twitter Section ---------------------------------

function GetTweets(selectedCommand) {

    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });


    var params = { screen_name: 'mbajack2' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        LogThis(selectedCommand, "Tweets");
        if (!error) {
            //console.log(JSON.stringify(tweets, null, 2));
            for (var ii = 0; ii < tweets.length; ii++) {
                console.log("Tweet:  " + tweets[ii].text + "    Created: " + tweets[ii].created_at);
            }
        } else {
            console.log(error);
        }
    });
}
