import { dropdown } from "./dropdown.js";
import { clearInput, validation } from "./input.js";

// 검색 필터
// 년도 선택
const years = ["모든 년도", "2023", "2022", "2021", "2020", "직접 입력"];

// 검색 내용 선택
const content = ["제목", "내용"];

window.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".dropdown1")) dropdown("dropdown1", years);
  if (document.querySelector(".dropdown2")) dropdown("dropdown2", content);

  clearInput();
  validation();
});
