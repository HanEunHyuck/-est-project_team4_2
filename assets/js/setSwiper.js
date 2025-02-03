import { renderSwiperOptions } from "./swiperOption.js";
import { releasedYear } from "./movieElement.js";
import { saveState } from "./saveData.js";

// 영화 스와이퍼
export async function setSwiper(sort) {
  const swiperSort = document.querySelector(`.section-${sort}`);

  if (!swiperSort) return;

  // '스와이퍼 옵션' 함수 호출
  const swiperOptions = renderSwiperOptions({
    loop: false, // 자동 루프x
    slidesPerView: 4, // 4개씩 출력
    spaceBetween: 20, // 슬라이드 간격 20px
    autoplayDelay: 10000, // 슬라이드 자동 재생, 10초
    disableAutoplayOnInteraction: false, // 사용자가 클릭하면 재생 멈춤
    usePagination: false,
    nextEl: `.section-${sort} .swiper-button-next`,
    prevEl: `.section-${sort} .swiper-button-prev`,
  });

  try {
    // JSON 데이터 가져오기
    const res = await fetch("./../assets/data/data.json");

    if (!res.ok) {
      throw new Error(res.status);
    }

    const data = await res.json();

    // 최신개봉순
    let sortedData;
    if (sort === "latest") {
      sortedData = sortReleased(data, "desc");
    } else if (sort === "rates") {
      sortedData = sortDataRating(data);
    }

    // 포스터 이미지 있는 데이터만 필터링
    const filteredData = sortedData.filter((movie) => movie.Poster && movie.Poster.includes("SX300"));
    // 데이터 15개
    const limitedData = filteredData.slice(0, 15);

    // swiper-wrapper에 데이터 출력
    const swiperWrapper = document.querySelector(`.${sort}-swiper .swiper-wrapper`);

    // 스와이퍼 내부에 들어가는 함수 호출
    await renderRatesSwiper(limitedData, swiperWrapper, sort);

    // Initialize Swiper
    new Swiper(`.${sort}-swiper`, swiperOptions);
  } catch (err) {
    console.error(err);
  } finally {
  }
}

// '최신 개봉순으로 정렬' 함수
// 데이터 개수를 정해서 불러오기 전에 최신개봉순으로 정렬 먼저 할 것
function sortReleased(data, order = "desc") {
  return data.sort(function (a, b) {
    // 비교할 개봉일 데이터 가져오기
    const dateA = new Date(a.Released);
    const dateB = new Date(b.Released);

    // 정렬 방식
    if (order === "asc") {
      return dateA - dateB; // 개봉순
    } else if (order === "desc") {
      return dateB - dateA; // 최신개봉순
    }
    return 0;
  });
}

// imdbRating(평점) 데이터에 N/A, 빈 배열 걸러내고 숫자만 받는 함수
function filterRatings(data) {
  return data.filter((item) => {
    const rating = parseFloat(item.imdbRating);
    // 숫자만 리턴하도록
    return !isNaN(rating);
  });
}

// '평점순'으로 정렬하는 함수
function sortDataRating(data) {
  const filterData = filterRatings(data);
  // 점수 높은순
  return filterData.sort(function (a, b) {
    return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
  });
}

// 스와이퍼 내부에 '출력'하는 '최신개봉순' 함수
async function renderRatesSwiper(limitedData, swiperWrapper, sort) {
  for (const [index, movie] of limitedData.entries()) {
    const movieYear = releasedYear(movie.Released);

    // swiper-wrapper 내부에 data 가져오기 - html로 출력
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    const movieEl = document.createElement("a");
    movieEl.classList.add("group/item");
    movieEl.setAttribute("href", "./sub/info.html");
    movieEl.addEventListener("click", () => {
      saveState("updatedId", movie.imdbID);
    });
    movieEl.innerHTML += `
        <div class="relative mb-5 overflow-hidden">
          <img src="${movie.Poster}" alt="" class="w-full aspect-[3/4] object-cover 
              transition-transform duration-300 group-hover/item:scale-105">
    `;
    // rates에서만 아래 코드를 이 위치에 추가
    if (sort === "rates") {
      movieEl.innerHTML += `
        <div class="absolute top-2 left-5 text-white text-44 font-bold z-10">
            ${index + 1}
        </div>
      `;
    }
    movieEl.innerHTML += `
        </div>
        <h3 class="text-2xl text-white mb-4 font-semibold truncate">${movie.Title}</h3>
        <div>
            <span class="text-xl text-gray62 mr-4.5">${movieYear}</span>
            <span class="text-xl text-primary">${movie.imdbRating}</span>
        </div>
    `;
    slide.appendChild(movieEl);
    swiperWrapper.appendChild(slide);
  }
}
