import { handleSearch } from "./searchResult.js";
import { saveState, loadState } from "./saveData.js";

export function searchEvent() {
  // 로컬 저장 인풋 값 가져오기
  let inputValue = loadState("inputValue");

  // 로컬 저장 년도 값 가져오기
  let selectedYear = loadState("selectedYear");

  let searchInput, searchButton;

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

  // 버튼 클릭 시 영화 리스트 반환
  if (document.querySelector("#search-form .search-btn")) {
    searchButton = document.querySelector("#search-form .search-btn");
    searchButton.addEventListener("click", async () => {
      getResult();
    });
  }

  // 영화 반환 함수
  async function getResult() {
    const query = searchInput.value.trim(); // 입력값 가져오기

    // 입력값 없을 때
    if (!query) {
      alert("검색어를 입력해주세요.");
      return;
    }

    // 검색창에 있는 값을 inputValue에 저장
    saveState("inputValue", searchInput.value);
    inputValue = loadState("inputValue");

    // 메인 페이지에서 결과페이지 이동 시
    if (searchButton.parentElement.classList.contains("main-input")) {
      window.location.href = "./sub/searchResult.html";
      setTimeout(function () {
        searchInput.value = "";
      });
    } else {
      saveState("selectedYear", "All years");
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
    await handleSearch(inputValue);
  }

  // 검색 결과 페이지 검색창 값에 있는 결과로 리스트 반환
  handleSearch(inputValue, selectedYear);
}
