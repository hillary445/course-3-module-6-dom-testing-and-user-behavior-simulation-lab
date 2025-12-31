/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
require("@testing-library/jest-dom");

const {
  initDOM
} = require("../index.js");

describe("DOM Testing Lab", () => {
  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../index.html"),
      "utf8"
    );

    document.documentElement.innerHTML = html;

    // 🔑 THIS IS THE MISSING PIECE
    initDOM();
  });

  test("should render required DOM elements", () => {
    expect(document.getElementById("simulate-click")).toBeInTheDocument();
    expect(document.getElementById("user-form")).toBeInTheDocument();
    expect(document.getElementById("user-input")).toBeInTheDocument();
  });

  test("should update DOM on button click", () => {
    const button = document.getElementById("simulate-click");
    const content = document.getElementById("dynamic-content");

    button.click();

    expect(content.textContent).toBe("Button Clicked!");
  });

  test("should show error when submitting empty input", () => {
    const form = document.getElementById("user-form");
    const error = document.getElementById("error-message");

    form.dispatchEvent(new Event("submit"));

    expect(error).toBeVisible();
    expect(error.textContent).toBe("Input cannot be empty");
  });

  test("should add new content on valid form submission", () => {
    const input = document.getElementById("user-input");
    const form = document.getElementById("user-form");
    const content = document.getElementById("dynamic-content");

    input.value = "Hello World";
    form.dispatchEvent(new Event("submit"));

    expect(content.textContent).toContain("Hello World");
  });
});
