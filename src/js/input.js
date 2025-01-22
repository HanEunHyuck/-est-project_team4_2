// 인풋 초기화 함수
export function clearInput() {
  // 인풋 초기화 버튼
  const clearButton = document.querySelectorAll(".button-clear");

  // 인풋이 두개 인 경우를 대비하여 배열로 변수를 받아 반복문 실행
  clearButton.forEach((btn) => {
    btn.addEventListener("click", function () {
      // 에러 메세지
      const errorMsg = btn.parentElement.nextElementSibling;
      // 해당 인풋
      const inputEl = btn.previousElementSibling;

      // 인풋 값 초기화 및 포커스
      inputEl.value = "";
      inputEl.focus();

      // 버튼 숨김
      btn.classList.add("hidden");

      // 에러메세지 제거
      if (errorMsg && errorMsg.classList.contains("error-message")) {
        errorMsg.classList.add("hidden");
        errorMsg.innerHTML = "";
      }
    });
  });
}

// 유효성 검사 함수
export function validation() {
  // 인풋 호출
  const inputs = document.querySelectorAll("input");
  // 인풋 최소 길이를 담을 변수
  let inputLength = 0;

  // 인풋이 두개 인 경우를 대비하여 배열로 변수를 받아 반복문 실행
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      switch (input.getAttribute("type")) {
        case "text":
          inputLength = 8;
          break;
        case "password":
          inputLength = 10;
          break;
      }

      const errorMsg = input.parentElement.nextElementSibling;

      if (input.value.length < inputLength) {
        if (errorMsg && errorMsg.classList.contains("error-message")) {
          errorMsg.classList.remove("hidden");
          errorMsg.innerHTML = `Please enter longer than ${inputLength} characters`;
        }
      } else {
        if (errorMsg && errorMsg.classList.contains("error-message")) {
          errorMsg.classList.add("hidden");
          errorMsg.innerHTML = "";
        }
      }
    });
  });
}
