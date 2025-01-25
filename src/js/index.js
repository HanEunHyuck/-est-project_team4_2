import { dropdown } from "./dropdown.js";
import { clearInput, validation } from "./input.js";
import { loadMainSwiper } from "./mainSwiper.js";
import { loadSeries } from "./typeFilter.js";
import { scrollToTop } from "./scroll.js";
import { setSwiper, movieId } from "./setSwiper.js";
import { movieDetail } from "./movieDetail.js";
import { loading } from "./loading.js";
import { handleSearch, movieApiId } from './searchResult.js';


// 검색 필터
// 년도 선택
const years = ["모든 년도", "2023", "2022", "2021", "2020", "직접 입력"];

// 검색 내용 선택
// const content = ["제목", "내용"];

if (document.querySelector(".dropdown1")) dropdown("dropdown1", years);
// if (document.querySelector(".dropdown2")) dropdown("dropdown2", content);

clearInput();
validation();

if (document.querySelector(".main-swiper")) loadMainSwiper(); // 메인 스와이퍼
if (document.querySelector(".section-latest")) setSwiper("latest");
if (document.querySelector(".section-rates")) setSwiper("rates");
if (document.querySelector(".section-series")) loadSeries(); // 시리즈

// 스크롤 탑
if (document.querySelector(".top-button")) {
  const topButton = document.querySelector(".top-button");
  topButton.addEventListener("click", () => {
    scrollToTop();
  });
}



window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.remove("bg-opacity-0");
  } else {
    header.classList.add("bg-opacity-0");
  }
});

// 저장소에 저장되어 있는 아이디 가져오기
let updatedId = loadState("updatedId");

setTimeout(function () {
  const movies = document.querySelectorAll(".movie");
  movies.forEach((movie) => {
    // 메인에 있는 영화 클릭 시 아이디값 저장
    movie.addEventListener("click", function () {
      saveState("updatedId", movieId);
      updatedId = loadState("updatedId");
    });
  });
}, 250);

// 상태를 로컬 저장소에 저장
function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// 로컬 저장소에서 값 가져오기
function loadState(key) {
  const savedState = localStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : null;
}

// 클릭하여 가져온 영화 아이디 값에 해당하는 상세 페이지 출력
movieDetail(updatedId);

// 로딩
loading();


// 검색결과에서 영화를 클릭하면 상세페이지로 넘어가게
// 저장소에 저장되어 있는 movieApiId 가져오기
let updatedApiId = loadState("updatedApiId");

setTimeout(function () {
  const movies = document.querySelectorAll(".movie");
  movies.forEach((movie) => {
    // 검색결과에 있는 영화 클릭 시 movieApiId 저장
    movie.addEventListener("click", function () {
      saveState("updatedApiId", movieApiId);
      updatedApiId = loadState("updatedApiId");
    });
  });
}, 250);

// 클릭하여 가져온 영화 아이디 값에 해당하는 상세 페이지 출력
movieDetail(updatedApiId);


// 제목 검색 시작
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("title");
const searchResults = document.getElementById("search-results");
const searchButton = searchForm.querySelector(".search-btn"); 

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim(); // 입력값 가져오기

    if (!query) {
        alert("검색어를 입력해주세요."); // 입력값 없을 때 알림
        return;
    }

    // 검색 함수 호출
    await handleSearch(query, searchResults);
});

// 엔터키로 검색 실행
searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {  
        const query = searchInput.value.trim(); 
        if (!query) {
            alert("검색어를 입력해주세요.");
            return;
        }
        await handleSearch(query, searchResults); 
    }
});
// ▲제목 검색 끝

