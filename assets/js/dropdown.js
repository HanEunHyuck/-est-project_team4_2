import { saveState } from "./saveData.js";

// 년도 선택
const years = ["All years", "2023", "2022", "2021", "2020", "Enter directly"];

export function dropdown(dropdownName, options) {

  // 드롭다운 구분
  const dropdown = document.querySelector(`.${dropdownName}`);
  
  if (!dropdown) return;

  if(options =="years") {
    options = years;
  }

  // 드롭다운 버튼
  const dropdownButton = dropdown.querySelector(".button-dropdown");

  // 드롭다운 값
  const dropdownValue = dropdown.querySelector(".value");

  // 드롭다운 옵션 리스트
  const optionsList = dropdown.querySelector(".options-list");

  // 드롭다운 초기 값 설정
  dropdownValue.innerHTML = options[0];

  // 드롭다운 버튼 클릭 시
  dropdownButton.addEventListener("click", () => {
    if (dropdown.classList.contains("active")) {
      optionsList.classList.add("hidden");
      optionsList.style.height = "0px";
      dropdown.classList.remove("active");
    } else {
      optionsList.classList.remove("hidden");
      optionsList.style.height = options.length * 62 + 8 + "px";
      dropdown.classList.add("active");
    }
  });

  const yearValue = dropdown.querySelector(".value");
  // 년도 직접 입력 시
  if (yearValue.innerHTML === "Enter directly") {
    let inputYear;
    inputYear = dropdown.nextElementSibling.querySelector("input");
    saveState("selectedYear", inputYear.value);
  } else {
    // 드롭 다운 옵션으로 선택 시
    saveState("selectedYear", yearValue.innerHTML);
  }

  options.forEach((option, index) => {
    const optionItem = document.createElement("li");
    const optionButton = document.createElement("button");
    optionButton.innerHTML = option;

    // 옵션 1번 기본 선택 상태 표시
    if (index === 0) {
      optionItem.classList.add("selected");
    }

    // 옵션 선택 시
    optionButton.addEventListener("click", () => {
      // 선택 값으로 드롭다운 값 변경
      dropdownValue.innerHTML = option;

      const selectedOption = optionsList.querySelector(".selected");
      if (selectedOption) {
        selectedOption.classList.remove("selected");
      }
      optionItem.classList.add("selected");
      optionsList.style.height = "0px";
      optionsList.classList.add("hidden");
      dropdown.classList.remove("active");
      dropdown.querySelector(".button-dropdown").focus();

      let additionalInput;
      if (dropdownName === "dropdown1" && option === options[options.length - 1]) {
        additionalInput = dropdown.nextElementSibling;
        additionalInput.classList.remove("hidden");
        additionalInput.querySelector("input").value = "";
        additionalInput.querySelector("input").focus();
      } else if (dropdownName === "dropdown1") {
        additionalInput = dropdown.nextElementSibling;
        additionalInput.classList.add("hidden");
      }
    });

    optionItem.appendChild(optionButton);
    optionsList.appendChild(optionItem);
  });

  // 외부 클릭 감지
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      optionsList.classList.add("hidden");
      dropdown.classList.remove("active");
      optionsList.style.height = "0px";
    }
  });
}
