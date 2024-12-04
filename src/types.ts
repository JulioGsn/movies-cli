/*{
  Title: "Terminator",
  Year: "1991",
  Rated: "N/A",
  Released: "N/A",
  Runtime: "39 min",
  Genre: "Short, Action, Sci-Fi",
  Director: "Ben Hernandez",
  Writer: "James Cameron, Ben Hernandez",
  Actors: "Loris Basso, James Callahan, Debbie Medows",
  Plot: "A cyborg comes from the future, to kill a girl named Sarah Lee.",
  Language: "English",
  Country: "United States",
  Awards: "N/A",
  Poster: "N/A",
  Ratings: [ { Source: "Internet Movie Database", Value: "6.1/10" } ],
  Metascore: "N/A",
  imdbRating: "6.1",
  imdbVotes: "42",
  imdbID: "tt5817168",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "N/A",
  Production: "N/A",
  Website: "N/A",
  Response: "True"
}
*/

export type Movie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [{ Source: string; Value: string }];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response?: "True" | "False";
};

export type ShowOnlyOpts = keyof Movie;

