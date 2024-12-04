import { Database } from "jsr:@db/sqlite@0.12";
import { Movie } from "./types.ts";
import { buildMovie } from "./helpers.ts";

type RType = [{ data: unknown } | undefined, Error | undefined];
export class MovieRepository {
  db: Database;
  constructor() {
    this.db = new Database("movies.db");
    this.createTable();
  }

  createTable() {
    console.log("Generating table movies if not exists");
    this.db
      .prepare(
        `
        CREATE TABLE  IF NOT EXISTS movies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          year TEXT,
          rated TEXT,
          released TEXT,
          runtime TEXT,
          genre TEXT,
          director TEXT,
          writer TEXT,
          actors TEXT,
          plot TEXT,
          language TEXT,
          country TEXT,
          awards TEXT,
          poster TEXT,
          ratings TEXT,
          metascore TEXT,
          imdb_rating TEXT,
          imdb_votes TEXT,
          imdb_id TEXT,
          type TEXT,
          dvd TEXT,
          box_office TEXT,
          production TEXT,
          website TEXT);`,
      )
      .run();
  }

  save(movie: Movie): RType {
    console.log(`- Inserting movie ${movie.Title}`);
    try {
      this.db
        .prepare(
          `
      INSERT INTO movies 
      (
          title,
          year,
          rated,
          released,
          runtime,
          genre,
          director,
          writer,
          actors,
          plot,
          language,
          country,
          awards,
          poster,
          ratings,
          metascore,
          imdb_rating,
          imdb_votes,
          imdb_id,
          type,
          dvd,
          box_office,
          production,
          website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .run(
          movie.Title,
          movie.Year,
          movie.Rated,
          movie.Released,
          movie.Runtime,
          movie.Genre,
          movie.Director,
          movie.Writer,
          movie.Actors,
          movie.Plot,
          movie.Language,
          movie.Country,
          movie.Awards,
          movie.Poster,
          movie.Ratings,
          movie.Metascore,
          movie.imdbRating,
          movie.imdbVotes,
          movie.imdbID,
          movie.Type,
          movie.DVD,
          movie.BoxOffice,
          movie.Production,
          movie.Website,
        );

      console.log("--- Movie inserted!");
      return [{ data: true }, undefined];
    } catch (err) {
      console.log("Error save movie: ", err);
      return [undefined, err as Error];
    }
  }

  getOne(title: string): RType {
    console.log(`Get movie ${title} from local database`);
    try {
      const movieRecord = this.db
        .prepare(`SELECT * FROM movies WHERE LOWER(title) = (?)`)
        .get(title.toLowerCase()) as Movie;

      if (movieRecord === undefined) {
        return [undefined, Error("Not found in movies tables")];
      }
      const movie = buildMovie(movieRecord);
      console.log("movie found: ", movie?.imdbID);
      return [{ data: movie }, undefined];
    } catch (err) {
      console.log("ERR", err);
      return [undefined, err as Error];
    }
  }

  close() {
    this.db.close();
  }
}
