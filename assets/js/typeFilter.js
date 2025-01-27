import { getPosterUrl } from './movieElement.js'; 

// 데이터 골라내기 → "Type" : "series"
export async function loadSeries() {
  try {
    // JSON 데이터 가져오기
    const response = await fetch("./../assets/data/data.json");
    const data = await response.json();

    // "Type" : "series" 데이터 필터링
    const filterData = data.filter(movie => movie.Type === "series");

    // series 중 무작위 2개 선택
    const randomData = filterData.sort(function() {
        return Math.random() - 0.5;
    });
    const selectedData = randomData.slice(0, 2);

    // 포스터 이미지 있는 데이터만 필터링 
    // main에 호출되는 poster에는 전부 적용할 것
    const hdMovies = selectedData.filter(
      (movie) => movie.Poster && movie.Poster.includes("SX300")
    );

    // 데이터를 series-wrapper에 뿌려주기
    const seriesWrapper = document.querySelector(".series-wrapper");

    for (const movie of hdMovies) {
      // 포스터 고화질로 가져오기
      const posterSrc = await getPosterUrl(movie.Poster); 

      const seriesEl = document.createElement("div");
      seriesEl.classList.add("series-item",
        "flex", "justify-center", "relative", "w-full", "h-full","cursor-pointer");
      seriesEl.innerHTML = `
          <img src="${posterSrc}" alt="${movie.Title}" 
            class="w-full h-full object-center object-cover
            transition-transform duration-300 hover:scale-105">
      `;

      seriesWrapper.appendChild(seriesEl);
    };

  } catch (err) {
    console.error(err);
  }
}
