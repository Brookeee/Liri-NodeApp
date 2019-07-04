require("dotenv").config();
// Link Key page
var keys = require("./keys.js");
//Initialize Spotify
var SpotifyMus = require("node-spotify-api");
var spotify = new SpotifyMus(keys.spotify);
//Axios
var axios = require("axios");
// File systems
var fs = require("fs");
//Moment
var moment = require("moment");
moment().format();

// Capture users input
var gotype = process.argv[2];
// console.log(gotype);
var nodeInput = process.argv.slice(3).join(" ");
// console.log(nodeInput);

// Functions
var apiType = function(gotype, nodeInput) {
  switch (gotype) {
    case "concert-this":
      concert(nodeInput);
      break;
    case "spotify-this-song":
      song(nodeInput);
      break;
    case "movie-this":
      movieInfo(nodeInput);
      break;
    case "do-what-it-says":
      says();
      break;
    default:
      console.log(
        "Input not recognized. Options: \nconcert-this \ndo-what-it-says \nspotify-this-song \nmovie-this"
      );
  }
};

apiType(gotype, nodeInput);

// Bands in town logic **FIXED**
function concert(nodeInput) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        nodeInput +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      for (var i = 0; i < 5; i++) {
        var concert = response.data[i];
        var format = moment.HTML5_FMT.DATETIME_LOCAL_SECONDS;
        var date = moment(concert.datetime).format("LLL");

        console.log("********** EVENT **********");
        fs.appendFileSync("log.txt", "********** EVENT **********\n");
        console.log("Venue Name: " + concert.venue.name);
        fs.appendFileSync(
          "log.txt",
          "Venue Name: " + concert.venue.name + "\n"
        );
        console.log(
          "Location of Venue: " +
            concert.venue.city +
            " " +
            concert.venue.region
        );
        fs.appendFileSync(
          "log.txt",
          "Location of Venue: " +
            concert.venue.city +
            " " +
            concert.venue.region +
            "\n"
        );
        console.log(date);
        fs.appendFileSync("log.txt", date + "\n");
        console.log(format);
        fs.appendFileSync("log.txt", +format + "\n"); // Error occuring time stamp HH:mm:YYY
      }
    });
}

// Spotify Logic, **FIXED song search

function song(nodeInput) {
  if (!nodeInput) {
    nodeInput = "I Want it That Way"; // Default Song
  }
  spotify.search(
    {
      type: "track",
      query: nodeInput
    },
    function(error, data) {
      if (error) {
        return console.log("There is an error " + error);
      }
      console.log("Artist : " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Spotify Preview: " + data.tracks.items[0].href);
      console.log("Album: " + data.tracks.items[0].album.name);
    }
  );
}
// OMDB logic ** FIXED*

function movieInfo(nodeInput) {
  if (!nodeInput) {
    nodeInput = "Mr. Nobody";
  }

  axios
    .get(
      "http://www.omdbapi.com/?t=" + nodeInput + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log("******* MOVIE ******");
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Movie Plot: " + response.data.Plot);
      console.log("Actors:" + response.data.Actors);
      console.log("******* MOVIE ******");
    });
}

// Random.txt file read ** NOT WORKING, error for .split not a function error**

// function says(nodeInput){
//   fs.readFile("./random.txt", function(error, data){
//     if (error) {
//       return console.log(error);
//     }
//       var txtArray = data.split(",");
//     }
// ,)}
// TO DO: NEED TO ADD TO PORTFOLIO, CREATE NODE.JS CLICKABLE ICON AND HREF LINKS FOR ASSIGNMENT 