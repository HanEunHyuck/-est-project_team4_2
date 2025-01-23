import { renderSwiperOptions } from "./swiperOption.js";

// 개선 필요 : 포스터 클릭하면 링크로 이동하게 → imdbID 받아오게
//  └ 편의성을 위해 [포스터 + 정보] div에 a링크 추가

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

        // 10개만 출력
        const limitedData = sortedData.slice(0, 10);

        // swiper-wrapper에 데이터 출력
        const swiperWrapper = document.querySelector(".rates-swiper .swiper-wrapper");

        // swiper-wrapper 내부에 data 가져오기 - html로 출력
        // 여기서 limitedData로 받아야 10개만 출력할 수 있음
        // 평점 순위 : index로 추가
        limitedData.forEach((movie, index) => {
            const slide = document.createElement("div");
            // Poster 빈값이면 대체이미지 쓰기 (img.png 경로 바꿀 것)
            const posterSrc = movie.Poster === "N/A" || !movie.Poster ? "img.png" : movie.Poster;
            slide.classList.add("swiper-slide");
            slide.innerHTML = `
                <div class="relative mb-5">
                    <img src="${posterSrc}" alt="" class="w-full aspect-[3/4] object-cover 
                        transition-transform duration-300 hover:scale-105">
                    <div class="absolute top-2 left-5 text-white text-44 font-bold z-10">
                        ${index + 1}
                    </div>
                </div>
                <h3 class="text-2xl text-white mb-4 font-semibold">${movie.Title}</h3>
                <div>
                    <span class="text-xl text-gray62 mr-4.5">${movie.Year}</span>
                    <span class="text-xl text-primary">${movie.imdbRating}</span>
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });

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


