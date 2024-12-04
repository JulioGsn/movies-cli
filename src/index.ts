import { parseArgs } from "jsr:@std/cli/parse-args";
import "jsr:@std/dotenv/load";
import type { Movie, ShowOnlyOpts } from "./types.ts";
import { getMovieInfo } from "./actions.ts";
import { MovieRepository } from "./repository.ts";
const key = Deno.env.get("OMBD_KEY");

const flags = parseArgs(Deno.args, {
  string: ["m", "a", "g"],
  boolean: ["p", "y"],
});

console.log("movie: ", flags);
const fetchMovies = async () => {
  return await fetch(
    `http://www.omdbapi.com/?t=${flags.m}&type=movie&apikey=${key}`,
  );
};

try {
  const movieRepository = new MovieRepository();
  if (!flags.m) {
    throw new Error("Movie parameter not informed!");
  }

  const opts: ShowOnlyOpts[] = [];
  if (flags.p) {
    opts.push("Plot");
  }
  if (flags.y) {
    opts.push("Year");
  }

  const [data, err] = movieRepository.getOne(flags.m);
  if (err === undefined) {
    console.log(getMovieInfo(data?.data as Movie, opts));
  } else {
    console.log("Fething...");
    const response = await fetchMovies();
    const movie = await response.json();
    if (movie.Response === "False") {
      throw new Error(`Not found movie ${flags.m}`);
    }
    movieRepository.save(movie);
    console.log(getMovieInfo(movie, opts));
  }
} catch (err) {
  console.log(err);
}
