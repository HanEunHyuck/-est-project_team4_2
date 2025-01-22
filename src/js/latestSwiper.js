

// 최신개봉순 함수 (수정해야 함)
// (1) 데이터 개수를 정해서 불러오기 전에 최신개봉순으로 정렬 먼저 할 것 
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

// 최신개봉순 스와이퍼
// Initialize Swiper
export async function latestSwiper(){
    const swiperOptions = {
        slidesPerView: 4, // 4개씩 표시
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // Q. 반응형 안 할 경우 아래 코드가 필요한가?
        // breakpoints: {
            //   768: {
                //     slidesPerView: 3,
                //     spaceBetween: 20,
                //   },
                // },
    };

  
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
        new Swiper(".latest-swiper", swiperOptions);
    } catch (err) {
        console.error(err);
    }
}


