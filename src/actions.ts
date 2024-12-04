import { Movie, ShowOnlyOpts } from "./types.ts";

export function getMovieInfo(movie: Movie, showOnly: ShowOnlyOpts[]) {
  console.log("showOnly", showOnly);
  if (showOnly.includes("Plot")) {
    return `Plot: ${movie.Plot}`;
  }
  if (showOnly.includes("Year")) {
    return `Year: ${movie.Year}`;
  }

  return movie;
}
