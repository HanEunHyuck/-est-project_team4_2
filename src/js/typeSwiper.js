// same type별로 영화를 필터링하는 함수
function sortByType(data, type) {
    return data.filter((movie) => movie.Type === type)
  }
  
  // 스와이퍼 초기화 함수
function initializeSwiper(type) {
    const swiperOptions = {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    }
  
    async function fetchAndDisplayMovies() {
      try {
        // JSON 데이터 가져오기
        const res = await fetch("./../src/data/data.json")
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
  
        // 특정 타입의 영화만 필터링
        const sortedData = sortByType(data, type)
  
        // 최대 10개의 영화만 선택
        const limitedData = sortedData.slice(0, 10)
  
        // swiper-wrapper에 데이터 출력
        const swiperWrapper = document.querySelector(`.${type}-swiper .swiper-wrapper`)
        swiperWrapper.innerHTML = "" // 기존 내용 초기화
  
        // swiper-wrapper 내부에 data 가져오기 - html로 출력
        limitedData.forEach((movie) => {
          const posterSrc = movie.Poster === "N/A" || !movie.Poster ? "img.png" : movie.Poster
          const slide = `
            <div class="swiper-slide">
              <div class="movie-poster">
                <img src="${posterSrc}" alt=""/>
              </div>
              <h3 class="text-2xl text-white">${movie.Title}</h3>
              <div>
                <span class="text-xl">${movie.Year}</span>
                <span class="text-xl text-primary">${movie.imdbRating}</span>
              </div>
            </div>
          `
          swiperWrapper.insertAdjacentHTML("beforeend", slide)
        })
  
        // Initialize Swiper
        new Swiper(`.${type}-swiper`, swiperOptions)
      } catch (err) {
        console.error("Failed to fetch movies:", err)
      }
    }
  
    fetchAndDisplayMovies()
  }

