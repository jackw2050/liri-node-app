'use strict';
var inquirer = require('inquirer');
var geocoder = require('geocoder');
var spotify = require('spotify');

var omdb = require('omdb');
var APIClinet = require('omdb-api-client');
var omdb = new APIClinet();

var Twitter = require('twitter');
var oauth = require('oauth');
var request = require('request');


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

        var songName = user.song;

        //console.log(JSON.stringify(user, null, 2));

        if (user.song == '') {
            songName = "what's my age again";
            console.log(songName);
        }

        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("Artist:      " + data.tracks.items[0].artists[0].name); // artist name
            console.log("Song name:   " + user.song); // song name
            console.log("Preview URL: " + data.tracks.items[0].preview_url); // preview link
            console.log("Album name:  " + data.tracks.items[0].album.name); // album name
        });
    });
}
// ---------------------------------  OMDB Section ---------------------------------
/*Title

if no movie is provided then the program will output information for the movie: 'Mr. Nobody'

if you haven't watched Mr. Nobody then you should: http://www.imdb.com/title/tt0485947/
You can catch it on Netflix

*/


function GetMovieName() {

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

                omdb({ t: movieName }).list().then(function(movie) {
                    console.log("Movie name:  " + movie.title);
                    console.log("Year:        " + movie.year);
                    console.log("IMDB rating: " + movie.imdbRating);
                    console.log("Country:     " + movie.countries);
                    console.log("Language:    " + movie.languages);
                    console.log("Plot:        " + movie.plot);
                    console.log("Actors:      " + movie.actors);
                    console.log("Rotton Tomatoes Rating:  ");
                    console.log("Rotton Tomatoes URL:     ");
                    console.log(movie);
                }).catch(function(err) {
                    console.log(err);
                });
            })
      }










            function GetMovieName_old() {
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
                        if (err) {
                            return console.error(err);
                        }

                        if (movies.length < 1) {
                            return console.log('No movies were found!');
                        }
                        console.log(JSON.stringify(movies, null, 2));

                        movies.forEach(function(movie) {
                            //  console.log('%s (%d)', movie.title, movie.year);
                            console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
                            console.log(movie.plot);
                        });
                    });

                    omdb.get({ title: user.movie }, true, function(err, movie) {
                        if (err) {
                            return console.error(err);
                        }
                        if (!movie) {
                            return console.log('Movie not found!');
                        }

                    });

                });
            }

            // ---------------------------------  Twitter Section ---------------------------------

            function GetTweets() {

                var client = new Twitter({
                    consumer_key: '',
                    consumer_secret: '',
                    access_token_key: '',
                    access_token_secret: ''
                });

                var params = { screen_name: 'nodejs' };
                client.get('statuses/user_timeline', params, function(error, tweets, response) {
                    if (!error) {
                        console.log(tweets);
                    }
                });


            }
