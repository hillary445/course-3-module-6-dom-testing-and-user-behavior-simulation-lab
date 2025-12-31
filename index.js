// ==============================
// DOM INITIALIZATION
// ==============================
function initDOM() {
  const button = document.getElementById("simulate-click");
  const form = document.getElementById("user-form");
  const input = document.getElementById("user-input");
  const dynamicContent = document.getElementById("dynamic-content");
  const errorMessage = document.getElementById("error-message");

  if (button) {
    button.addEventListener("click", () => {
      dynamicContent.textContent = "Button Clicked!";
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (input.value.trim() === "") {
        errorMessage.textContent = "Input cannot be empty";
        errorMessage.classList.remove("hidden");
        return;
      }

      errorMessage.classList.add("hidden");

      const p = document.createElement("p");
      p.textContent = input.value;
      dynamicContent.appendChild(p);
      input.value = "";
    });
  }
}

// ==============================
// FUNCTIONS REQUIRED BY TESTS
// ==============================
function addElementToDOM(containerId, text) {
  const container = document.getElementById(containerId);
  const p = document.createElement("p");
  p.textContent = text;
  container.appendChild(p);
}

function removeElementFromDOM(elementId) {
  const element = document.getElementById(elementId);
  if (element) element.remove();
}

function simulateClick(containerId, text) {
  const container = document.getElementById(containerId);
  container.textContent = text;
}

function handleFormSubmit(formId, containerId) {
  const form = document.getElementById(formId);
  const input = form.querySelector("input");
  const container = document.getElementById(containerId);
  const errorMessage = document.getElementById("error-message");

  if (input.value.trim() === "") {
    errorMessage.textContent = "Input cannot be empty";
    errorMessage.classList.remove("hidden");
    return;
  }

  errorMessage.classList.add("hidden");
  container.textContent = input.value;
  input.value = "";
}

// ==============================
// EXPORTS FOR JEST
// ==============================
module.exports = {
  initDOM,
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit
};

// ==============================
// BROWSER EXECUTION SAFETY
// ==============================
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initDOM);
}


