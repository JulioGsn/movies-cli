import { parseArgs } from "jsr:@std/cli/parse-args";
import "jsr:@std/dotenv/load";
import type { Movie, ShowOnlyOpts } from "./types.ts";
import { getMovieInfo } from "./actions.ts";
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
  if (!flags.m) {
    throw new Error("Movie parameter not informed!");
  }
  const response = await fetchMovies();
  const movie: Movie = await response.json();
  const opts: ShowOnlyOpts[] = [];
  if (flags.p) {
    opts.push("Plot");
  }
  if (flags.y) {
    opts.push("Year");
  }

  console.log(getMovieInfo(movie, opts));
} catch (err) {
  console.log(err);
}
