import {
  isPasswordLessThan5,
  isUsernameLessThan5,
  isEmailValid,
  isEmpty,
  getCurrentDateTimeString,
} from "../shared";
import { ENDPOINT, RESPONSE_MESSAGE, EVENT, USER_KEY } from "../config";

//  user register html nodes
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const username = document.getElementById("register-username");
const email = document.getElementById("register-email");
const password = document.getElementById("register-password");
const register = document.getElementById("register");
const registerFormWrapper = document.getElementById("register-form-wrapper");

// const googleRegister = document.getElementById('google-register');
// const facebookRegister = document.getElementById('facebook-register');

let isRegisterBtnClicked = false;
const ENTER_KEY = 13;

export function initRegister() {
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !register ||
    !registerFormWrapper
  )
    return;

  register.addEventListener("click", () => validateForm(email, password));

  // input fields change
  firstName.addEventListener("input", () => {
    removeBackendResponseMessage();
    if (!isRegisterBtnClicked) return;
    if (isEmpty(firstName.value)) {
      firstName.classList.add("is-invalid");
      return;
    }
    firstName.classList.remove("is-invalid");
  });

  lastName.addEventListener("input", () => {
    removeBackendResponseMessage();
    if (!isRegisterBtnClicked) return;
    if (isEmpty(lastName.value)) {
      lastName.classList.add("is-invalid");
      return;
    }
    lastName.classList.remove("is-invalid");
  });

  username.addEventListener("input", () => {
    removeBackendResponseMessage();
    if (!isRegisterBtnClicked) return;
    if (isUsernameLessThan5(username.value)) {
      username.classList.add("is-invalid");
      return;
    }
    username.classList.remove("is-invalid");
  });

  email.addEventListener("input", () => {
    removeBackendResponseMessage();
    if (!isRegisterBtnClicked) return;
    if (!isEmailValid(email.value)) {
      email.classList.add("is-invalid");
      return;
    }
    email.classList.remove("is-invalid");
  });

  password.addEventListener("input", () => {
    removeBackendResponseMessage();
    if (!isRegisterBtnClicked) return;
    if (isPasswordLessThan5(password.value)) {
      password.classList.add("is-invalid");
      return;
    }
    password.classList.remove("is-invalid");
  });

  registerFormWrapper.addEventListener("keypress", (e) => {
    if (e.which === ENTER_KEY || e.keyCode === ENTER_KEY) {
      validateForm(email, password);
      return;
    }
  });
}

function validateForm(email, password) {

  isRegisterBtnClicked = true;
  removeSpinner();
  removeBackendResponseMessage();
  removeFormErrors();
  if (
    !isFrontendValid(
      firstName.value,
      lastName.value,
      username.value,
      email.value,
      password.value
    )
  ) {
    if (isEmpty(firstName.value)) {
      firstName.classList.add("is-invalid");
    }
    if (isEmpty(lastName.value)) {
      lastName.classList.add("is-invalid");
    }
    if (isUsernameLessThan5(username.value)) {
      username.classList.add("is-invalid");
    }
    if (!isEmailValid(email.value)) {
      email.classList.add("is-invalid");
    }
    if (isPasswordLessThan5(password.value)) {
      password.classList.add("is-invalid");
    }
    setTimeout(_ => { scrollToInvalidField() }, 10);
    return;
  }

  addSpinner();
  register.disabled = true;

  // backend call
  fetch(ENDPOINT.REGISTER, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      email: email.value,
      password: password.value,
      registrationTime: getCurrentDateTimeString(),
    }),
  })
    .then((res) => res.json())
    .then((x) => {
      removeSpinner();
      register.disabled = false;
      if (x.emailExists) {
        addBackendResponseMessage(
          "alert-danger",
          RESPONSE_MESSAGE.EMAIL_EXISTS
        );
        return;
      }
      if (x.usernameExists) {
        addBackendResponseMessage(
          "alert-danger",
          RESPONSE_MESSAGE.USERNAME_EXISTS
        );
        return;
      }
      //navigate to home page for login
      addBackendResponseMessage(
        "alert-success",
        RESPONSE_MESSAGE.SUCCESSFUL_REGISTRATION
      );
      //redirect to home page
      setTimeout(() => {
        localStorage.setItem(USER_KEY.registered, "true");
        location.href = "/";
      }, 1200);
      clearAllFields();
    })
    .catch((_) => {
      removeSpinner();
      register.disabled = false;
      window.dispatchEvent(new Event(EVENT.SERVER_ERROR));
    });
}

function isFrontendValid(first, last, username, email, password) {


  return (
    !isEmpty(first) &&
    !isEmpty(last) &&
    !isUsernameLessThan5(username) &&
    isEmailValid(email) &&
    !!password &&
    !isPasswordLessThan5(password)
  );
}

// reset login form from errors
function removeFormErrors() {
  firstName.classList.remove("is-invalid");
  lastName.classList.remove("is-invalid");
  username.classList.remove("is-invalid");
  email.classList.remove("is-invalid");
  password.classList.remove("is-invalid");
}

function addSpinner() {
  const spinnerContainer = document.getElementById("register-submit-wrapper");
  const spinner = document.createElement("div");

  spinner.classList.add("generics-loader");
  spinner.id = "register-spinner";
  spinner.style = "margin-top: 50px; margin-bottom: 0px;";

  spinnerContainer.insertBefore(spinner, spinnerContainer.firstChild);
}

function removeSpinner() {
  const spinner = document.getElementById("register-spinner");
  if (!spinner) return;
  spinner.parentNode.removeChild(spinner);
}

function scrollToInvalidField() {
  const invalidElm = document.querySelector('.is-invalid')
  if (invalidElm) {
    invalidElm.previousElementSibling.scrollIntoView();
  }
}

function addBackendResponseMessage(classValue, messageValue) {
  removeBackendResponseMessage();
  const backendResponseWrapper = document.getElementById(
    "register-submit-wrapper"
  );
  const message = document.createElement("div");

  message.id = "register-backend-message";
  message.classList.add("alert");
  message.classList.add(classValue);
  message.style.marginTop = "30px";
  message.innerText = messageValue;
  message.role = "alert";

  backendResponseWrapper.insertBefore(
    message,
    backendResponseWrapper.firstChild
  );
}

function removeBackendResponseMessage() {
  const message = document.getElementById("register-backend-message");
  if (!message) return;
  message.parentNode.removeChild(message);
}

function clearAllFields() {
  firstName.value = "";
  lastName.value = "";
  username.value = "";
  email.value = "";
  password.value = "";
}
