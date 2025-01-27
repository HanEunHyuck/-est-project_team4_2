import { renderSwiperOptions } from "./swiperOption.js"; // 스와이퍼 옵션
// import { getPosterUrl } from './movieElement.js'; // 고화질 포스터

// (1) 데이터를 무작위로 추출 
//   └ 5개 선택
// (2) main-swiper 안에 데이터 뿌리기 (html구조)
// (3) (1, 2 성공하면...) 일정 시간마다 자동으로 넘어가게 해보기 => autoplay
// (4) 포스터 이미지 꽉차게...
// (5) 포스터 클릭하면 상세페이지로 넘어가게 링크

// 슬라이드가 잘 넘어가게 하려면 .swiper > .swiper-wrapper > .swiper-slide 구조여야 함

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
 
  try { // JSON 데이터 가져오기
    const res = await fetch("./../assets/data/data.json"); 

    if (!res.ok) {
      throw new Error(res.status);
    }

    const data = await res.json();

    // 무작위로 5개 가져오기
    // 원본 배열을 바꾸지 않고 데이터를 가져오게 수정함
    const randomData = [...data].sort(function() {
      return Math.random() - 0.5;
    });
    const selectedData = randomData.slice(0, 5);

    // 포스터 이미지 있는 데이터만 필터링 
    // main에 호출되는 poster에는 전부 적용할 것
    // (1) Poster이 존재하고 (2) SX300이 존재하는 경우로 한정
    const filteredData = selectedData.filter(
      (movie) => movie.Poster && movie.Poster.includes("SX300")
    );

    // 고화질 포스터가 존재하는 데이터만 가져옴
    // const hdMovies = await getHdPosterData(filteredData);

    // main-swiper 에 데이터 추가 
    const mainSwiper = document.querySelector(".main-swiper .swiper-wrapper");
    
    // html에 데이터 출력
    await renderMainSwiper(filteredData, mainSwiper);

    // Initialize Swiper
    new Swiper(".main-swiper .swiper", swiperOptions);
  }catch (err) {
    console.error(err);
  }
}


// '고화질 포스터가 있는 데이터만' 출력하는 함수
// 이러면 콘솔창에 에러가 보임... 해당 링크 404라고...
// async function getHdPosterData(movies) {
//   const hdMovies = [];

//   for (const movie of movies) {
//       // 고화질 포스터 URL 가져옴
//       const posterUrl = await getPosterUrl(movie.Poster);

//       // 고화질 포스터 URL이 있으면 hdMovies에 추가
//       // hdMovies에 배열을 담아두는 것...
//       // 이렇게 하면 초기 로딩이 느린 느낌... 그럴만도함...
//       if (posterUrl !== movie.Poster) {
//           hdMovies.push(movie); 
//       }
//   }

//   return hdMovies; 
// }



// html에 데이터 출력하는 함수 (포스터 있는 경우에 한정)
async function renderMainSwiper(hdMovies, mainSwiper) {
  for (const movie of hdMovies) {
    // 이미 포스터 이미지가 있는 데이터만 필터링했기 때문에 변수 지정할 필요가 없음
    // const posterSrc = movie.Poster;
    
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = `
      <div class="w-full h-175 relative">
      <div class="absolute top-0 left-0 w-full h-full 
                  bg-gradient-to-t from-primary opacity-25
                  via-transparent to-transparent z-10"></div>
        <img src="${movie.Poster}" alt="" class="w-full h-full object-cover overflow-hidden"/>
      </div>
      <div class="absolute z-50 w-140 
                  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  flex flex-col items-center justify-center text-center">
        <h2 class="text-white title1 font-semibold mb-6">${movie.Title}</h2>
        <p class="text-primary">${movie.imdbRating}</p>
      </div>
      `;
    mainSwiper.appendChild(slide);
  };
}