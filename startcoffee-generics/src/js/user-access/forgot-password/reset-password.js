import { isEmpty, isPasswordLessThan5 } from "../../shared";
import { ENDPOINT, RESPONSE_MESSAGE, EVENT } from "../../config";

//  reset password html nodes
const password = document.getElementById("reset-password-input");
const resetPasswordSubmitBtn = document.getElementById("reset-password");
const resetPasswordSuccessWrapper = document.getElementById(
  "reset-password-verification-wrapper"
);

// reset password errors
const err1 = document.getElementById("reset-pwd-err-1");
const err2 = document.getElementById("reset-pwd-err-2");

let isResetPasswordSubmitBtnClicked = false;

export function initResetPassword() {
  if (!resetPasswordSubmitBtn || !resetPasswordSuccessWrapper) {
    return;
  }
  hideResetPasswordSuccessWrapper();
  resetPasswordSubmitBtn.addEventListener("click", () =>
    validateForm(password)
  );

  password.addEventListener("input", () => {
    if (!isResetPasswordSubmitBtnClicked) return;
    if (isEmpty(password.value)) {
      err1.style.display = "";
      err2.style.display = "none";
      return;
    }
    if (isPasswordLessThan5(password.value)) {
      err1.style.display = "none";
      err2.style.display = "";
      password.classList.add("is-invalid");
      return;
    }
    password.classList.remove("is-invalid");
  });
}

function validateForm(password) {
  isResetPasswordSubmitBtnClicked = true;
  removeBackendResponseMessage();
  removeFormError();
  if (!isFrontendValid(password.value)) {
    if (isEmpty(password.value)) {
      err1.style.display = "";
      err2.style.display = "none";
      password.classList.add("is-invalid");
    } else if (isPasswordLessThan5(password.value)) {
      err1.style.display = "none";
      err2.style.display = "";
      password.classList.add("is-invalid");
    }
    return;
  }

  // backend call
  addSpinner();
  resetPasswordSubmitBtn.disabled = true;
  fetch(ENDPOINT.RESET_PASSWORD, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: getTokenFromUrl(),
      password: password.value
    })
  })
    .then(res => ({ status: res.status }))
    .then(res => {
      removeSpinner();
      resetPasswordSubmitBtn.disabled = false;
      if (res.status >= 500) throw new Error();
      if (res.status > 400 && res.status < 500) {
        addBackendResponseMessage(
          "alert-danger",
          RESPONSE_MESSAGE.RESET_PASSWORD_TEXT
        );
        return;
      }
      // display success window
      hideResetPassword();
      showResetPasswordSuccessWrapper();
    })
    .catch(_ => {
      removeSpinner();
      resetPasswordSubmitBtn.disabled = false;
      window.dispatchEvent(new Event(EVENT.SERVER_ERROR));
    });
}

function isFrontendValid(password) {
  return !!password && !isPasswordLessThan5(password);
}

// reset login form from errors
function removeFormError() {
  password.classList.remove("is-invalid");
}

function addBackendResponseMessage(classValue, messageValue) {
  const backendResponseWrapper = document.getElementById(
    "reset-password-submit-wrapper"
  );
  const message = document.createElement("div");

  message.id = "reset-password-backend-message";
  message.classList.add("alert");
  message.classList.add(classValue);
  message.style.marginTop = "";
  message.style.maxWidth = "500px";
  message.style.top = "10px";
  message.innerHTML = messageValue;
  message.role = "alert";

  backendResponseWrapper.insertBefore(
    message,
    backendResponseWrapper.firstChild
  );
}

function removeBackendResponseMessage() {
  const message = document.getElementById("reset-password-backend-message");
  if (!message) return;
  message.parentNode.removeChild(message);
}

function showResetPasswordSuccessWrapper() {
  resetPasswordSuccessWrapper.className = "user-access-box-wrapper";
  resetPasswordSuccessWrapper.innerHTML = ` 
   <h5 id="reset-password-verification-title" class="user-access-box-wrapper-title horizontal-line ">
        Password changed
   </h5>
   <div id="reset-password-confirmation-text-wrapper" class="container text-center">
      <p class="user-access-text">
        Login with you new password.
        <p>
         <a href="/"> Back to Home page</a>
        </p>
      </p>
   </div>`;
}

function hideResetPasswordSuccessWrapper() {
  resetPasswordSuccessWrapper.innerHTML = "";
}

function hideResetPassword() {
  const resetPasswordWrapper = document.getElementById(
    "reset-password-wrapper"
  );
  resetPasswordWrapper.parentElement.removeChild(resetPasswordWrapper);
}

function addSpinner() {
  const spinnerContainer = document.getElementById(
    "reset-password-submit-wrapper"
  );
  const spinner = document.createElement("div");
  spinner.id = "reset-password-spinner";
  spinner.classList.add("generics-loader");
  spinner.style.top = "35px";

  spinnerContainer.insertBefore(spinner, spinnerContainer.firstChild);
}

function removeSpinner() {
  const spinner = document.getElementById("reset-password-spinner");
  if (!spinner) return;

  spinner.parentNode.removeChild(spinner);
}

function getTokenFromUrl() {
  // using regex lookbehind
  // pathName.match(/?<=reset-password\/).+/g) // returns [token_name], lack of browser support
  const pathName = window.location.pathname;
  const key = "reset-password/";
  const token = pathName.substring(pathName.indexOf(key) + key.length);
  return token;
}
