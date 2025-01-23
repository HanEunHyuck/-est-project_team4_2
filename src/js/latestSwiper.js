import { renderSwiperOptions } from "./swiperOption.js";

// 최신개봉순 스와이퍼
export async function latestSwiper(){

    // '스와이퍼 옵션' 함수 호출 
    const swiperOptions = renderSwiperOptions({
        loop: false, // 자동 루프x
        slidesPerView: 4, // 4개씩 출력
        spaceBetween: 20, // 슬라이드 간격 20px
        autoplayDelay: 10000, // 슬라이드 자동 재생, 10초
        disableAutoplayOnInteraction: false, // 사용자가 클릭하면 재생 멈춤
        usePagination: false, 
    });
  
    try { // JSON 데이터 가져오기
        const res = await fetch("./../src/data/data.json");

        if (!res.ok) {
            throw new Error(res.status);
        }

        const data = await res.json();

        // 최신개봉순
        const sortedData = sortReleased(data, "desc");

        // 데이터 10개
        const limitedData = sortedData.slice(0, 10);

        // swiper-wrapper에 데이터 출력
        const swiperWrapper = document.querySelector(".latest-swiper .swiper-wrapper");

        // 스와이퍼 내부에 들어가는 '최신개봉순' 함수 호출
        limitedData.forEach((movie) => {
            renderLatestSwiper(movie, swiperWrapper);
        });

        // Initialize Swiper
        new Swiper(".latest-swiper", swiperOptions);
    } catch (err) {
        console.error(err);
    }
}


// '최신 개봉순으로 정렬' 함수
// 데이터 개수를 정해서 불러오기 전에 최신개봉순으로 정렬 먼저 할 것 
function sortReleased(data, order = "desc") {
    return  data.sort(function (a, b){
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

// 스와이퍼 내부에 '출력'하는 '최신개봉순' 함수 
// swiper-wrapper 내부에 data 가져오기 - html로 출력
// 여기서 limitedData로 받아야 10개만 출력할 수 있음
function renderLatestSwiper(movie, swiperWrapper){
    const slide = document.createElement("div");
    // Poster 빈값이면 대체이미지 쓰기 (img.png 경로 바꿀 것)
    const posterSrc = movie.Poster === "N/A" || !movie.Poster ? "img.png" : movie.Poster;
    slide.classList.add("swiper-slide");
    slide.innerHTML = `
        <div class="mb-5">
            <img src="${posterSrc}" alt="" class="w-full aspect-[3/4] object-cover 
                transition-transform duration-300 hover:scale-105">
        </div>
        <h3 class="text-2xl text-white mb-4 font-semibold">${movie.Title}</h3>
        <div>
            <span class="text-xl text-gray62 mr-4.5">${movie.Year}</span>
            <span class="text-xl text-primary">${movie.imdbRating}</span>
        </div>
    `;
    swiperWrapper.appendChild(slide);
}
