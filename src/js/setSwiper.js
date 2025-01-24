import { renderSwiperOptions } from "./swiperOption.js";
import { getPosterUrl, releasedYear } from "./movieElement.js";
import { movieDetail } from "./movieDetail.js";

// 영화 스와이퍼
export async function setSwiper(sort) {
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
    const res = await fetch("./../src/data/data.json");

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

    // 데이터 30개
    const limitedData = sortedData.slice(0, 30);

    // swiper-wrapper에 데이터 출력
    const swiperWrapper = document.querySelector(`.${sort}-swiper .swiper-wrapper`);

    // 스와이퍼 내부에 들어가는 함수 호출
    await renderRatesSwiper(limitedData, swiperWrapper, sort);

    // Initialize Swiper
    new Swiper(`.${sort}-swiper`, swiperOptions);
  } catch (err) {
    console.error(err);
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

export let movieId = null;
// 스와이퍼 내부에 '출력'하는 '최신개봉순' 함수
// swiper-wrapper 내부에 data 가져오기 - html로 출력
// 여기서 limitedData로 받아야 10개만 출력할 수 있음
async function renderRatesSwiper(limitedData, swiperWrapper, sort) {
  // 고화질이 없으면 저화질 포스터 링크 가져옴
  // ${movie.Year} 대신 가져오는 개봉연도
  for (const [index, movie] of limitedData.entries()) {
    // 고화질이 없으면 저화질 포스터 링크 가져옴
    // ${movie.Year} 대신 가져오는 개봉연도
    const posterSrc = await getPosterUrl(movie.Poster);
    const movieYear = releasedYear(movie.Released);

    // swiper-wrapper 내부에 data 가져오기 - html로 출력
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide", "cursor-pointer", "movie");
    slide.addEventListener("click", () => {
      movieId = movie.imdbID;
      window.location.href="./sub/info2.html";
    });
    slide.innerHTML += `
        <div class="relative mb-5">
            <img src="${posterSrc}" alt="" class="w-full aspect-[3/4] object-cover 
                transition-transform duration-300 hover:scale-105">
    `;
    if (sort === "rates") {
      slide.innerHTML += `
              <div class="absolute top-2 left-5 text-white text-44 font-bold z-10">
                  ${index + 1}
              </div>
      `;
    }
    slide.innerHTML += `
        </div>
        <h3 class="text-2xl text-white mb-4 font-semibold truncate">${movie.Title}</h3>
        <div>
            <span class="text-xl text-gray62 mr-4.5">${movieYear}</span>
            <span class="text-xl text-primary">${movie.imdbRating}</span>
        </div>
    `;
    swiperWrapper.appendChild(slide);
  }
}
