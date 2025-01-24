import { renderSwiperOptions } from "./swiperOption.js"; // 스와이퍼 옵션
import { getPosterUrl, releasedYear } from './movieElement.js'; // 고화질 포스터

// 추후 수정 : 포스터 클릭하면 상세정보페이지로 이동하게 → imdbID 받아오게

// 평점순 스와이퍼
export async function ratingSwiper() {

    // '스와이퍼 옵션' 함수 호출 
    const swiperOptions = renderSwiperOptions({
        loop: false, // 자동 루프x
        slidesPerView: 4, // 4개씩 출력
        spaceBetween: 20, // 슬라이드 간격 20px
        autoplayDelay: 10000, // 슬라이드 자동 재생, 10초
        disableAutoplayOnInteraction: false, // 사용자가 클릭하면 재생 멈춤
        usePagination: false,
        nextEl: '.section-rates .swiper-button-next', 
        prevEl: '.section-rates .swiper-button-prev',
    });

    try {
        // JSON 데이터 가져오기
        const res = await fetch("./../src/data/data.json");

        if (!res.ok) {
            throw new Error(res.status);
        }

        const data = await res.json();

        // 평점순으로 데이터 정렬
        const sortedData = sortDataRating(data);

        // 30개 출력
        const limitedData = sortedData.slice(0, 30);

        // swiper-wrapper에 데이터 출력
        const swiperWrapper = document.querySelector(".rates-swiper .swiper-wrapper");

        // 스와이퍼 내부에 '출력'하는 '평점순' 함수 호출 
        await renderRatesSwiper(limitedData, swiperWrapper);

        // Initialize Swiper
        new Swiper(".rates-swiper", swiperOptions);
    } catch (err) {
        console.error(err);
    }
}

// imdbRating(평점) 데이터에 N/A, 빈 배열 걸러내고 숫자만 받는 함수
function filterRatings(data) {
    return data.filter(item => {
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

// 스와이퍼 내부에 '출력'하는 '평점순' 함수 
async function renderRatesSwiper (limitedData, swiperWrapper) {

    // 평점 순위 : index로 추가
    for (const [index, movie] of limitedData.entries()) {
        // 고화질이 없으면 저화질 포스터 링크 가져옴
        // ${movie.Year} 대신 가져오는 개봉연도
        const posterSrc = await getPosterUrl(movie.Poster); 
        const movieYear = releasedYear(movie.Released);

        // swiper-wrapper 내부에 data 가져오기 - html로 출력
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `
            <div class="relative mb-5">
                <img src="${posterSrc}" alt="" class="w-full aspect-[3/4] object-cover 
                    transition-transform duration-300 hover:scale-105">
                <div class="absolute top-2 left-5 text-white text-44 font-bold z-10">
                    ${index + 1}
                </div>
            </div>
            <h3 class="text-2xl text-white mb-4 font-semibold truncate">${movie.Title}</h3>
            <div>
                <span class="text-xl text-gray62 mr-4.5">${movieYear}</span>
                <span class="text-xl text-primary">${movie.imdbRating}</span>
            </div>
        `;
        swiperWrapper.appendChild(slide);
    };
}