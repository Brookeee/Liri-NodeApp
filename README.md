# Liri-NodeApp

LIRI is a Language Interpretation and Recognition Interface.

Liri is a command line interface that takes in parameters and gives back relevant data.

How it works:

- Type into the terminal: node liri.js
- After, type in one of the four options: spotify-this, concert-this, movie-this and do-what-it says.

- Bands in Town
  Enter in terminal: `node liri.js concert-this <artist/band name here>`
  The following results should return:

- Name of the venue
- Venue location
- Date of the Event (use moment to format this as "MM/DD/YYYY")

Spotify API
Enter in terminal: `node liri.js spotify-this-song '<song name here>'`

- This will show the following information about the song in your terminal/bash window

  - Artist(s)
  - The song's name
  - A preview link of the song from Spotify
  - The album that the song is from

- If no song is provided then your program will default to "The Sign" by Ace of Base

OMDB API 
Enter in terminal: `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

- Technology used: Node.js, JavaScript, API's and Axios
