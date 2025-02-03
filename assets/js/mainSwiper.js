import { saveState } from "./saveData.js";
import { renderSwiperOptions } from "./swiperOption.js"; // 스와이퍼 옵션

// 메인 스와이퍼
export async function loadMainSwiper() {
  // '스와이퍼 옵션' 함수 호출
  const swiperOptions = renderSwiperOptions({
    loop: true, // 자동 루프
    slidesPerView: 1, // 1개씩 출력
    spaceBetween: 0, // 슬라이드 간격 없음
    autoplayDelay: 5000, // 슬라이드 자동 재생, 5초
    disableAutoplayOnInteraction: false, // 사용자가 클릭하면 재생 멈춤
    enablePagination: true,
  });

  try {
    // JSON 데이터 가져오기
    const res = await fetch("./../assets/data/data.json");

    if (!res.ok) {
      throw new Error(res.status);
    }

    const data = await res.json();

    // 무작위로 5개 가져오기
    // 원본 배열을 바꾸지 않고 데이터를 가져옴
    const randomData = [...data].sort(function () {
      return Math.random() - 0.5;
    });
    const selectedData = randomData.slice(0, 5);

    // 포스터 이미지 해상도 변경
    selectedData.forEach((movie) => {
      movie.Poster = movie.Poster.replace(/SX300/g, "SX1080");
      if (movie.Poster === undefined) movie.Poster = movie.Poster.replace(/SX1080/g, "SX300");
    });

    // main-swiper 에 데이터 추가
    const mainSwiper = document.querySelector(".main-swiper .swiper-wrapper");

    // html에 데이터 출력
    await renderMainSwiper(selectedData, mainSwiper);

    // Initialize Swiper
    new Swiper(".main-swiper .swiper", swiperOptions);
  } catch (err) {
    console.error(err);
  }
}

function renderMainSwiper(movies, mainSwiper) {
  movies.forEach((movie) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    const movieEl = document.createElement("a");
    movieEl.classList.add("block", "w-full", "h-175", "relative", "cursor-pointer");
    movieEl.setAttribute("href", "./sub/info.html");
    movieEl.addEventListener("click", () => {
      saveState("updatedId", movie.imdbID);
    });
    movieEl.innerHTML = `
      <div class="absolute top-0 left-0 w-full h-full 
                bg-gradient-to-t from-primary opacity-25
                via-transparent to-transparent z-10">
      </div>
      <img src="${movie.Poster}" alt="" class="w-full h-full object-cover overflow-hidden opacity-30"/>
      <div class="absolute z-50 w-140 
                  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  flex items-center justify-center text-center gap-10">
        <div class="w-75 flex-shrink-0">
          <img src="${movie.Poster}" alt="${movie.Title}" class="block"/>
        </div>
        <div class="flex-shrink-0">
          <h2 class="text-white title1 font-semibold mb-6 max-w-[420px]">${movie.Title}</h2>
          <p class="text-primary">${movie.imdbRating}</p>
        </div>
      </div>
    `;
    slide.appendChild(movieEl);
    mainSwiper.appendChild(slide);
  });
}
