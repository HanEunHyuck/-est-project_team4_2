import { dropdown } from "./dropdown.js";
import { clearInput, validation } from "./input.js";
import { ratingSwiper } from "./ratesSwiper.js";
import { latestSwiper } from "./latestSwiper.js";
import { initializeSwiper } from "./typeSwiper.js";
import { loadMainSwiper } from "./mainSwiper.js";
import { loadSeries } from "./typeFilter.js";
import { scrollToTop } from "./scroll.js";
// import { SearchResult } from "./search.js";
import { movieDetail } from "./movieDetail.js";

// 검색 필터
// 년도 선택
const years = ["모든 년도", "2023", "2022", "2021", "2020", "직접 입력"];

// 검색 내용 선택
const content = ["제목", "내용"];

if (document.querySelector(".dropdown1")) dropdown("dropdown1", years);
if (document.querySelector(".dropdown2")) dropdown("dropdown2", content);

clearInput();
validation();

loadMainSwiper(); // 메인 스와이퍼
ratingSwiper(); // 평점순 스와이퍼
latestSwiper(); // 최신개봉순 스와이퍼
initializeSwiper(); // 타입별 스와이퍼
loadSeries(); // 시리즈

movieDetail();

// 스크롤 탑
const topButton = document.querySelector(".top-button");
topButton.addEventListener("click", () => {
  scrollToTop();
});

const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
  SearchResult();
});
