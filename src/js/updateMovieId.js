let movieId = null;
let callback = null;

export function setMovieId(newMovieId) {
  movieId = newMovieId;
  if (callback) callback(movieId); // movieId가 변경되면 callback 호출
}

export function getMovieId() {
  return movieId;
}
