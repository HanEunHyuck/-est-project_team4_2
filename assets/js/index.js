import { dropdown } from "./dropdown.js";
import { clearInput, validation } from "./input.js";
import { loadMainSwiper } from "./mainSwiper.js";
import { loadSeries } from "./typeFilter.js";
import { scrollToTop } from "./scroll.js";
import { setSwiper, movieId } from "./setSwiper.js";
import { movieDetail } from "./movieDetail.js";
import { loading } from "./loading.js";
import { handleSearch, movieApiId } from "./searchResult.js";
import { saveState, loadState } from "./saveData.js";

// 검색 필터
// 년도 선택
const years = ["All years", "2023", "2022", "2021", "2020", "Enter directly"];

// 검색 내용 선택
// const content = ["제목", "내용"];

// 드롭다운
if (document.querySelector(".dropdown1")) dropdown("dropdown1", years);
// if (document.querySelector(".dropdown2")) dropdown("dropdown2", content);

// 인풋 초기화
clearInput();
// 유효성 검사
validation();

// 로딩
loading();

if (document.querySelector(".main-swiper")) loadMainSwiper(); // 메인 스와이퍼
if (document.querySelector(".section-latest")) setSwiper("latest"); // 최신개봉 스와이퍼
if (document.querySelector(".section-rates")) setSwiper("rates"); // 평점순 스와이퍼
if (document.querySelector(".section-series")) loadSeries(); // 시리즈

// 스크롤 탑
if (document.querySelector(".top-button")) {
  const topButton = document.querySelector(".top-button");
  topButton.addEventListener("click", () => {
    scrollToTop();
  });
}

// 헤더 이벤트
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.remove("bg-opacity-0");
  } else {
    header.classList.add("bg-opacity-0");
  }
});

// 로컬 저장 영화 아이디 가져오기
/** 
 * 아이디 값 분리
 * 메인에서 클릭한 아이디값
 * 검색결과에서 클릭한 아이디 값
 * 같은 저장소 아이디에 담았더니 최신화 오류로 인한 조치
 */ 
let updatedId = loadState("updatedId");
let searchUpdatedId = loadState("searchUpdatedId");
// 로컬 저장 인풋 값 가져오기
let inputValue = loadState("inputValue");
// 로컬 저장 년도 값 가져오기
let selectedYear = loadState("selectedYear");

let searchPageMovie = loadState("searchPageMovie");

// 영화 리스트 가져오기
// 페이지에 영화 리스트가 호출되는 시간을 고려해 setTimeout 사용
setTimeout(function () {
  const movies = document.querySelectorAll(".movie");
  movies.forEach((movie) => {
    // 영화 요소 클릭 시 이벤트
    movie.addEventListener("click", function () {
      // 검색 결과에 있는 영화 클릭 시
      if (movie.classList.contains("search-result")) {
        searchPageMovie = true;
        saveState("searchUpdatedId", movieApiId);
      } else {
        // 메인에 있는 영화 클릭 시
        searchPageMovie = false;
        saveState("updatedId", movieId);
      }
      saveState("searchPageMovie", searchPageMovie);
    });
  });
}, 250);

let searchInput, searchResults, searchButton;

// 제목 검색 시작
if (document.getElementById("title")) {
  searchInput = document.getElementById("title");
  // 검색 결과 페이지 검색창 값 지정
  if (searchInput.parentElement.classList.contains("sub")) {
    searchInput.value = inputValue;
  } else {
    // 메인 페이지 검색창 리셋
    searchInput.value = "";
  }
  // 엔터키로 검색 실행
  searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      getResult();
    }
  });
}

// 검색 결과 페이지 검색창 값에 있는 결과로 리스트 반환
if (document.getElementById("search-results")) {
  searchResults = document.getElementById("search-results");
  handleSearch(searchInput.value, searchResults, selectedYear);
}

// 버튼 클릭 시 영화 리스트 반환
if (document.querySelector("#search-form .search-btn")) {
  searchButton = document.querySelector("#search-form .search-btn");
  searchButton.addEventListener("click", async () => {
    getResult();
  });
}

// 영화 반환 함수
async function getResult() {
  // 검색창에 있는 값을 inputValue에 저장
  saveState("inputValue", searchInput.value);

  const query = searchInput.value.trim(); // 입력값 가져오기

  // 입력값 없을 때
  if (!query) {
    alert("검색어를 입력해주세요.");
    return;
  }

  // 메인 페이지에서 결과페이지 이동 시
  if (searchButton.parentElement.classList.contains("main-input")) {
    window.location.href = "./sub/searchResult.html";
    setTimeout(function () {
      searchInput.value = "";
    });
  }

  // 년도 선택 시
  if (document.querySelector(".dropdown1")) {
    const yearDropdown = document.querySelector(".dropdown1");
    const yearValue = yearDropdown.querySelector(".value");
    // 년도 직접 입력 시
    if (yearValue.innerHTML === "Enter directly") {
      let inputYear;
      inputYear = yearDropdown.nextElementSibling.querySelector("input");
      saveState("selectedYear", inputYear.value);
    } else {
      // 드롭 다운 옵션으로 선택 시
      saveState("selectedYear", yearValue.innerHTML);
    }
  }

  // 검색 함수 호출
  await handleSearch(query, searchResults);
}

// 로컬에 저장된 영화 아이디 값에 해당하는 상세 페이지 출력
// 가져오는 아이디 값 분리 (메인 페이지, 검색 결과 페이지)
if (searchPageMovie === true) {
  movieDetail(searchUpdatedId);
} else {
  movieDetail(updatedId);
}
