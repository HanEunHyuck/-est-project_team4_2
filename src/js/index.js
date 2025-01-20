import { dropdown } from "./dropdown.js";

// 검색 필터
// 년도 선택
const years = ["모든 년도", "2023", "2022", "2021", "2020", "직접 입력"];

// 검색 내용 선택
const content = ["제목", "내용"];

window.addEventListener("DOMContentLoaded", () => {
  dropdown("dropdown1", years);
  dropdown("dropdown2", content);
});
