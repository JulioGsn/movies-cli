import { Movie } from "./types.ts";

export function buildMovie(movieRecord: any): Movie {
  return {
    Title: movieRecord.title,
    Year: movieRecord.year,
    Rated: movieRecord.rated,
    Released: movieRecord.released,
    Runtime: movieRecord.runtime,
    Genre: movieRecord.genre,
    Director: movieRecord.director,
    Writer: movieRecord.writer,
    Actors: movieRecord.actors,
    Plot: movieRecord.plot,
    Language: movieRecord.language,
    Country: movieRecord.country,
    Awards: movieRecord.awards,
    Poster: movieRecord.poster,
    Ratings: movieRecord.ratings,
    Metascore: movieRecord.metascore,
    imdbRating: movieRecord.imdb_rating,
    imdbVotes: movieRecord.imdb_votes,
    imdbID: movieRecord.imdb_id,
    Type: movieRecord.type,
    DVD: movieRecord.dvd,
    BoxOffice: movieRecord.box_office,
    Production: movieRecord.production,
    Website: movieRecord.website,
  };
}
