// 1. 최신개봉순(Year)으로 정렬  
// 2. 평점순으로 정렬
// 3. (1/2) 중에 선택할 수 있게 함수 만들기
// 4. 최신개봉순(Year) → Released 로 변경하기
//  - 뒤에 4자리(연도) 비교
//  - 월(문자) 비교
//  - 날짜 비교
//  헐...... Date()를 쓰면 포맷 변경이 됨...ㅜㅜ


// 수정 필요 : search 드롭다운 z-index: 999
// 개선 필요 : 포스터 클릭하면 링크로 이동하게 → imdbID 받아오게
//  └ 편의성을 위해 [포스터 + 정보] div에 a링크 추가
// 마우스 오버 효과!!

// 더 사용하기 편리하게 개선을 못하겠음...(유지보수성을 대체 어떻게?)
// 고화질 포스터?????? -> 존재하는지 모르겠음...



// imdbRating 데이터에 N/A, 빈 배열 걸러내고 숫자만 받기
function filterRatings(data) {
    return data.filter(item => {
        const rating = parseFloat(item.imdbRating);
        // 숫자만 리턴하도록
        return !isNaN(rating); 
    });
}

// 평점순 
function sortDataRating(data) {
    const filterData = filterRatings(data); 
    // 점수 높은순
    return filterData.sort(function (a, b) {
        return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
    });
}


// 평점순 스와이퍼
export async function ratingSwiper() {
    const swiperOptions = {
        slidesPerView: 4, // 4개
        spaceBetween: 20, // 간격(px)
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    };


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
        limitedData.forEach((movie) => {
            const slide = document.createElement("div");
            // Poster 빈값이면 대체이미지 쓰기 (img.png 경로 바꿀 것)
            const posterSrc = movie.Poster === "N/A" || !movie.Poster ? "img.png" : movie.Poster;
            slide.classList.add("swiper-slide");
            slide.innerHTML = `
                <div class="mb-5 transition-transform duration-300 hover:scale-105">
                    <img src="${posterSrc}" alt="" />
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




