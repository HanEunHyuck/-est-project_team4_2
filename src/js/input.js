export function clearInput() {
  const clearButton = document.querySelectorAll(".button-clear");
  const inputs = document.querySelectorAll("input");

  if (inputs.length >= 1) {
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        if (input.value !== "") {
          input.nextElementSibling.classList.remove("hidden");
        }
      });
    });
  }

  clearButton.forEach((btn) => {
    btn.addEventListener("click", function () {
      btn.previousElementSibling.value = "";
      btn.previousElementSibling.focus();
      btn.classList.add("hidden");
      if (btn.parentElement.nextElementSibling.classList.contains("error-message")) {
        btn.parentElement.nextElementSibling.innerHTML = "";
      }
    });
  });
}

export function validation() {
  const inputs = document.querySelectorAll("input");
  let inputLength = 0;

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      switch (input.getAttribute("type")) {
        case "text":
          inputLength = 10;
          break;
        case "password":
          inputLength = 8;
          break;
      }

      const errorMsg = input.parentElement.nextElementSibling;
      
      if (input.value.length <= inputLength) {
        if (errorMsg.classList.contains("error-message")) {
          errorMsg.innerHTML = `Please enter longer than ${inputLength} characters`;
        }
      } else {
        if (errorMsg.classList.contains("error-message")) {
          errorMsg.innerHTML = "";
        }
      }
    });
  });
}
