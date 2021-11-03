import {
  isEmpty,
  isPasswordLessThan5,
  isEmailValid,
  isLoggedIn,
  getCurrentDateTimeString,
} from "../shared";
import { ENDPOINT, COOKIE, RESPONSE_MESSAGE, USER_KEY } from "../config";

//  login html nodes
const email = document.getElementById("login-email");
const password = document.getElementById("login-password");
const login = document.getElementById("login");

const modalWindow = document.getElementsByClassName("modal-content")[0];
const openLoginBtn = document.getElementById("open-login");
const closeModalButton = document.getElementsByClassName("close")[0];

let isModalLoginBtnClicked = false;
let isRequestPending = false;
const googleLogin = document.getElementById("google-login");
const facebookLogin = document.getElementById("facebook-login");
const forgotPasswordLink = document.getElementById(
  "forgot-password-navigation"
);
const signUpBtn = document.getElementById("open-sign-up");

// login errors
const err1 = document.getElementById("login-pwd-err-1");
const err2 = document.getElementById("login-pwd-err-2");

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export function initLogin() {
  if (
    !modalWindow ||
    !email ||
    !password ||
    !openLoginBtn ||
    !login ||
    !closeModalButton
  )
    return;

  // open login if explicitly set on another page
  if (window.location.href.includes('openLogin')) {
    openLoginBtn.click();
    history.replaceState(null, null, '/');
  }

  if (localStorage.getItem(USER_KEY.registered) === "true") {
    localStorage.removeItem(USER_KEY.registered);
    openLoginBtn.click();
  }

  if (isLoggedIn(COOKIE.NAME)) {
    signUpBtn.style.display = "none";
    removeLoginButton();
    const logoElementSm = document.querySelector('#angular-header-navbar-title-sm')
    if (logoElementSm) {
      logoElementSm.classList.remove('logo-logged-in');
    }
    if (window.location.pathname === '/') {
      const logoWrapper = document.getElementById('logo-wrapper');
      if (logoWrapper) {
        logoWrapper.classList.add('logo-wrapper-margin');
      }
      addLogoutButtonDesktop();
    }
  } else {
    const logoElementSm = document.querySelector('#angular-header-navbar-title-sm')
    if (logoElementSm) {
      logoElementSm.classList.add('logo-logged-in');
    }
    login.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      validateForm(email, password)
    });
  }

  openLoginBtn.addEventListener("click", () => {
    document.addEventListener("keyup", onEscKeyPress);
    document.addEventListener("click", onShadowBackgroundClick);
  });

  modalWindow.addEventListener("keypress", (e) => {
    if ((e.which === ENTER_KEY || e.keyCode === ENTER_KEY) && !isRequestPending) {
      validateForm(email, password);
      return;
    }
  });

  googleLogin.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/auth/google";
  });

  facebookLogin.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/auth/facebook";
  });

  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/forgot-password";
  });

  //close modal
  closeModalButton.addEventListener("click", () => {

    isModalLoginBtnClicked = false;
    removeFormErrors();
    removeBackendResponseMessage();
    clearPasswordInputField();
  });

  // input fields change
  email.addEventListener("input", (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeBackendResponseMessage();
    if (!isModalLoginBtnClicked) return;
    if (!isEmailValid(email.value)) {
      email.classList.add("is-invalid");
      return;
    }
    email.classList.remove("is-invalid");
  });

  password.addEventListener("input", (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeBackendResponseMessage();
    if (!isModalLoginBtnClicked) return;
    if (isEmpty(password.value)) {

      err1.style.display = "inline-block";
      err2.style.display = "none";
      return;
    }
    if (isPasswordLessThan5(password.value)) {

      err1.style.display = "none";
      err2.style.display = "inline-block";;
      password.classList.add("is-invalid");
      return;
    }
    password.classList.remove("is-invalid");
    err1.style.display = 'none';
    err2.style.display = 'none';

  });
}

function validateForm(email, password) {
  isModalLoginBtnClicked = true;


  removeSpinner();
  removeBackendResponseMessage();
  removeFormErrors();
  if (!isFrontendValid(email.value, password.value)) {
    if (!isEmailValid(email.value)) {
      email.classList.add("is-invalid");
    }
    if (isEmpty(password.value)) {
      password.classList.add("is-invalid");
      err1.style.display = "inline-block";
      err2.style.display = "none";
    } else if (isPasswordLessThan5(password.value)) {
      password.classList.add("is-invalid");
      err1.style.display = "none";
      err2.style.display = "inline-block";
    }
    return;
  }
  // backend call
  addSpinner();
  login.disabled = true;
  fetch(ENDPOINT.LOGIN, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => res)
    .then((x) => {
      isRequestPending = false;
      if (x.status >= 500) {
        removeSpinner();
        login.disabled = false;
        throw new Error();
      }
      if (x.status !== 200) {
        removeSpinner();
        password.value = "";
        login.disabled = false;
        addBackendResponseMessage(
          "alert-danger",
          RESPONSE_MESSAGE.UNSUCCESSFUL_LOGIN
        );
        return;
      }

      if (window.location.href.includes('shared/')) {
        return window.location.reload();
      }
      //navigate to user profile page
      window.location.href = history.state ? history.state.url : '/profile';
      return;
    })
    .catch((_) => {
      isRequestPending = false;
      removeSpinner();
      login.disabled = false;
      addBackendResponseMessage("alert-danger", RESPONSE_MESSAGE.SERVER_ERROR);
      password.value = "";
    });
}

function addLogoutButtonDesktop() {
  if (document.getElementById('my-account-header-label')) return;
  const imgBgWrapper = document.getElementById("img-bg-wrapper");
  const logoutWrapper = document.createElement("div");
  logoutWrapper.id = "logout-wrapper";
  logoutWrapper.className = "dropdown";

  const account = document.createElement("div");
  account.id = "my-account-header-label";
  account.className = "nav-link dropdown-toggle";
  account.textContent = "My account";
  account.setAttribute("data-toggle", "dropdown");

  const accountDropdown = document.createElement("div");
  accountDropdown.id = "my-account-dropdown";
  accountDropdown.className = "dropdown-menu";
  accountDropdown.style.position = "static!important";
  accountDropdown.style.transform = "none";


  // children of accountDropdown
  const navigateToUserSettings = document.createElement("a");
  navigateToUserSettings.id = "navigate-to-s";
  navigateToUserSettings.className = "dropdown-item";
  navigateToUserSettings.style.zIndex = "1000";
  navigateToUserSettings.textContent = "User settings";
  navigateToUserSettings.href = "/settings";

  const logoutButton = document.createElement("div");
  logoutButton.id = "logout";
  logoutButton.classList.add("dropdown-item", "logout-action-desktop")
  logoutButton.textContent = "Logout";
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(ENDPOINT.LOGOUT, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loggedOutTime: getCurrentDateTimeString() }),
    }).then((res) => {
      if (res.ok) {
        window.location.href = '/';
      }
    }).catch(_ => {
      window.location.href = '/';
    })
  });

  accountDropdown.appendChild(navigateToUserSettings);
  accountDropdown.appendChild(logoutButton);

  logoutWrapper.appendChild(account);
  logoutWrapper.appendChild(accountDropdown);

  imgBgWrapper.appendChild(logoutWrapper);
}

function removeLoginButton() {
  if (!openLoginBtn) return;
  openLoginBtn.parentNode.removeChild(openLoginBtn);
}

// ** UTIL FUNCTIONS BEGIN **
function isFrontendValid(email, password) {
  return isEmailValid(email) && !!password && !isPasswordLessThan5(password);
}

// reset login form from errors
function removeFormErrors() {
  email.classList.remove("is-invalid");
  password.classList.remove("is-invalid");
  err1.style.display = 'none';
  err2.style.display = 'none';
}

function clearPasswordInputField() {
  password.value = "";
}

function closeModal() {
  document.getElementsByClassName("close")[0].click();
}

function onEscKeyPress(e) {
  if (e.which === ESCAPE_KEY || e.keyCode === ESCAPE_KEY) {
    isModalLoginBtnClicked = false;
    closeModal();
    removeFormErrors();
    removeBackendResponseMessage();
    document.removeEventListener("keyup", onEscKeyPress);
    return;
  }
}

function addSpinner() {
  isRequestPending = true;
  const spinnerContainer = document.getElementById("login-submit-wrapper");
  const spinner = document.createElement("div");
  spinner.classList.add("generics-loader");
  spinner.id = "login-spinner";
  spinnerContainer.insertBefore(spinner, spinnerContainer.firstChild);
}

function removeSpinner() {
  const spinner = document.getElementById("login-spinner");
  if (!spinner) return;

  spinner.parentNode.removeChild(spinner);
}

function addBackendResponseMessage(classValue, messageValue) {
  removeBackendResponseMessage();
  const backendResponseWrapper = document.getElementById(
    "login-submit-wrapper"
  );
  const message = document.createElement("div");

  message.id = "login-backend-message";
  message.classList.add("alert");
  message.classList.add(classValue);
  message.style.marginTop = "";
  message.innerText = messageValue;
  message.role = "alert";

  backendResponseWrapper.insertBefore(
    message,
    backendResponseWrapper.firstChild
  );
}

function removeBackendResponseMessage() {
  const message = document.getElementById("login-backend-message");
  if (!message) return;
  message.parentNode.removeChild(message);
}

function onShadowBackgroundClick(e) {
  if (e.target.id === "login-modal-fade-in") {
    isModalLoginBtnClicked = false;
    removeFormErrors();
    removeBackendResponseMessage();
    clearPasswordInputField();
    document.removeEventListener("click", onShadowBackgroundClick);
  }
}

// ** UTIL FUNCTIONS END **
