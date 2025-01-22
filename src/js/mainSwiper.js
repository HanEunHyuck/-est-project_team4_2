// (1) 데이터를 무작위로 추출 
//   └ 5개 선택
// (2) main-swiper 안에 데이터 뿌리기 (html구조)
// (3) (1, 2 성공하면...) 일정 시간마다 자동으로 넘어가게 해보기 => autoplay
// (4) 포스터 이미지 꽉차게...
// (5) 포스터 클릭하면 상세페이지로 넘어가게 링크

// 메인 스와이퍼 
export async function loadMainSwiper() {
  // 스와이퍼 옵션
  const swiperOptions = {
    loop: true, 
    slidesPerView: 1, // 1개씩 표시
    spaceBetween: 0, // 간격 없음
    navigation: { 
      nextEl: ".swiper-button-next", 
      prevEl: ".swiper-button-prev" 
    },
    pagination: { 
      el: ".swiper-pagination", 
      clickable: true 
    },
    autoplay: { // 슬라이드 자동 재생 
      delay: 5000, // 5초
      disableOnInteraction: false, // 사용자가 클릭하면 재생 멈춤
    },
  };
  
 
  try { // JSON 데이터 가져오기
    const res = await fetch("../src/data/data.json"); 

    if (!res.ok) {
      throw new Error(res.status);
    }

    const data = await res.json();

    // 무작위로 5개 가져오기
    const randomData = data.sort(function() {
      return Math.random() - 0.5;
    });
    const selectedData = randomData.slice(0, 5);

    // main-swiper 에 데이터 추가 
    const mainSwiper = document.querySelector(".main-swiper .swiper-wrapper");

    // html에 데이터 출력
    selectedData.forEach((movie) => {
      const slide = document.createElement("div");
      // Poster 빈값이면 대체이미지 쓰기 (img.png 경로 바꿀 것)
      const posterSrc = movie.Poster === "N/A" || !movie.Poster ? "img.png" : movie.Poster;
      slide.classList.add("swiper-slide");
      slide.innerHTML = `
        <div class="w-full h-full object-cover">
          <img src="${posterSrc}" alt="" />
        </div>
        <div class="absolute swiper-inner">
          <h2 class="text-white swiper-title title1">${movie.Title}</h2>
          <p class="text-primary">${movie.imdbRating}</p>
        </div>
        `;
      mainSwiper.appendChild(slide);
    });

    // Initialize Swiper
    new Swiper(".main-swiper", swiperOptions);
  }catch (err) {
    console.error(err);
  }
}
