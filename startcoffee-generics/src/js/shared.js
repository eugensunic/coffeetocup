// Forms
let timer = null;
import { GLOBAL_ERROR } from "./config";

export function isEmailValid(mail) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(mail).toLowerCase());
}

export function isEmpty(param) {
  return !param;
}

export function isPasswordLessThan5(password) {
  return password.length < 5;
}

export function isUsernameLessThan5(username) {
  return username.length < 5;
}

export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// isUserLoggedIn
export const isLoggedIn = () => !!parseCookie("auth");

// cookie actions
export const parseCookie = param => {
  var nameEQ = param + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// keyboard key press
export const handleEnterKeyPress = (callback, keyCode) => {
  if (keyCode === 13) {
    callback();
  }
};
// other
export const getCurrentDateTimeString = () => {
  const d = new Date();
  const date =
    d.getDate().toString().length === 1
      ? "0" + d.getDate().toString()
      : d.getDate().toString();
  const month =
    (d.getMonth() + 1).toString().length === 1
      ? "0" + (d.getMonth() + 1).toString()
      : (d.getMonth() + 1).toString();
  const year = d.getFullYear();

  const hour =
    d.getHours().toString().length === 1
      ? "0" + d.getHours().toString()
      : d.getHours().toString();
  const minutes =
    d.getMinutes().toString().length === 1
      ? "0" + d.getMinutes().toString()
      : d.getMinutes().toString();

  const MM_DD_YYY__hh_mm =
    month + "/" + date + "/" + year + ", " + hour + ":" + minutes;
  return MM_DD_YYY__hh_mm;
};

export function showGlobalError() {
  console.log("Global error occured");
  removeGlobalError();
  window.scrollTo(0, 0);
  const errorContainer = document.createElement("div");
  const body = document.body;

  errorContainer.id = "global-error-message";
  errorContainer.classList.add("alert");
  errorContainer.classList.add("alert-danger");
  errorContainer.style.textAlign = "center";
  errorContainer.style.paddingTop = "10px";
  errorContainer.innerText =
    "Server error occurred, if it persists, contact administrator";
  errorContainer.role = "alert";

  body.insertBefore(errorContainer, body.firstChild);
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (!errorContainer) return;
    errorContainer.parentNode.removeChild(errorContainer);
  }, GLOBAL_ERROR.TIMEOUT_TIME);
}

function removeGlobalError() {
  if (document.getElementById("global-error-message")) {
    document
      .getElementById("global-error-message")
      .parentNode.removeChild(document.getElementById("global-error-message"));
  }
}
