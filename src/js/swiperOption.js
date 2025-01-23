export function renderSwiperOptions({ 
  loop = true, // 자동 루프
  slidesPerView = 1, // 1개씩 출력
  spaceBetween = 0, // 슬라이드 간격 없음
  autoplayDelay = 5000, // 슬라이드 자동 재생, 5초
  disableAutoplayOnInteraction = false, // 사용자가 클릭하면 재생 멈춤
  usePagination = false, // 메인 슬라이드에서만 사용 
  // breakpoints = { }, // 반응형 
}) 
{
  const options = {
    loop,
    slidesPerView,
    spaceBetween,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    autoplay: {
        delay: autoplayDelay,
        disableOnInteraction: disableAutoplayOnInteraction,
    },
    // ▼ 반응형 할 때 사용
    // breakpoints: { 
    //   768: {
    //         slidesPerView: 3,
    //         spaceBetween: 20,
    //   },
    // },
  };
  if (usePagination) {
      options.pagination= {
        el: ".swiper-pagination",
        clickable: true,
    };
  }
  return options;
}