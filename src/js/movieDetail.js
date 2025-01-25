export async function movieDetail(movieId) {
  try {
    // JSON 데이터 가져오기
    const res = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=8e5fae38`);

    // 가져오지 못한 경우 에러
    if (!res.ok) {
      throw new Error(res.status);
    }

    // 데이터 받아옴
    const data = await res.json();

    // movie-title 데이터 출력
    const movieTitle = document.querySelector(".movie-title");
    movieTitle.innerHTML = `
          ${data.Title}
        `;

    // movie-sub-title 데이터 출력
    const movieSubTitle = document.querySelector(".movie-sub-title");
    movieSubTitle.innerHTML = `
          <span>${data.Released}</span>
          <span>•</span>
          <span>${data.Runtime}</span>
          <div class="flex ml-2 stars">${data.Ratings[0].Value}</div>
        `;

    // movie-detail 데이터 출력
    const movieDetail = document.querySelector(".movie-detail");

    // Poster 빈값이면 대체이미지 쓰기 
    const posterSrc = data.Poster === "N/A" || !data.Poster ? "./../images/placeholder_img.png" : data.Poster;
    movieDetail.innerHTML = `
          <div class="leading-relaxed text-gray-400">${data.Plot}</div>
          <img src="${posterSrc}" alt="Venom movie still" class="object-cover w-full h-auto max-w-lg rounded-lg" />
        `;

    // 영화 정보 출력
    const movieInfo = document.querySelector(".movie-info");
    movieInfo.innerHTML = `
          <div class="text-gray-400">Genre</div>
          <div>${data.Genre}</div>
          <div class="text-gray-400">Director</div>
          <div>${data.Director}</div>
          <div class="text-gray-400">Actors</div>
          <div>${data.Actors}</div>
        `;
  } catch (err) {
    console.error(err);
  }
}


