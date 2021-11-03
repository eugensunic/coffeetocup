import { isEmailValid } from "../../shared";
import { ENDPOINT, RESPONSE_MESSAGE, EVENT } from "../../config";

//  forgot password html nodes
const email = document.getElementById("forgot-password-email");
const forgotPasswordSubmitBtn = document.getElementById("forgot-password");
const forgotPasswordSuccessWrapper = document.getElementById(
  "forgot-password-verification-wrapper"
);
let isForgotPasswordSubmitBtnClicked = false;

export function initForgotPassword() {
  if (!email || !forgotPasswordSubmitBtn || !forgotPasswordSuccessWrapper) {
    return;
  }
  hideforgotPasswordSuccessWrapper();
  forgotPasswordSubmitBtn.addEventListener("click", () => validateForm(email));

  email.addEventListener("input", () => {
    if (!isForgotPasswordSubmitBtnClicked) return;

    if (!isEmailValid(email.value)) {
      email.classList.add("is-invalid");
      return;
    }
    email.classList.remove("is-invalid");
  });
}

function validateForm(email) {
  isForgotPasswordSubmitBtnClicked = true;
  removeBackendResponseMessage();
  removeFormError();
  if (!isEmailValid(email.value)) {
    email.classList.add("is-invalid");
    return;
  }

  // backend call
  addSpinner();
  forgotPasswordSubmitBtn.disabled = true;
  fetch(ENDPOINT.FORGOT_PASSWORD, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      confirmedEmail: email.value
    })
  })
    .then(res => res.json())
    .then(({ user }) => {
      removeSpinner();
      forgotPasswordSubmitBtn.disabled = false;
      if (!user) {
        addBackendResponseMessage(
          "alert-danger",
          RESPONSE_MESSAGE.FORGOT_PASSWORD_NON_EXISTING_MAIL
        );
        return;
      }
      // display success window
      hideForgotPassword();
      showForgotPasswordSuccessWrapper();
    })
    .catch(_ => {
      removeSpinner();
      forgotPasswordSubmitBtn.disabled = false;
      window.dispatchEvent(new Event(EVENT.SERVER_ERROR));
    });
}

// reset login form from errors
function removeFormError() {
  email.classList.remove("is-invalid");
}

function addBackendResponseMessage(classValue, messageValue) {
  const backendResponseWrapper = document.getElementById(
    "forgot-password-submit-wrapper"
  );
  const message = document.createElement("div");

  message.id = "forgot-password-backend-message";
  message.classList.add("alert");
  message.classList.add(classValue);
  message.style.marginTop = "";
  message.style.maxWidth = "500px";
  message.style.top = "10px";
  message.innerText = messageValue;
  message.role = "alert";

  backendResponseWrapper.insertBefore(
    message,
    backendResponseWrapper.firstChild
  );
}

function removeBackendResponseMessage() {
  const message = document.getElementById("forgot-password-backend-message");
  if (!message) return;
  message.parentNode.removeChild(message);
}

function showForgotPasswordSuccessWrapper() {
  forgotPasswordSuccessWrapper.className = "user-access-box-wrapper";
  forgotPasswordSuccessWrapper.innerHTML = ` 
   <h5 id="forgot-password-verification-title" class="user-access-box-wrapper-title horizontal-line ">
        Verify your email account
   </h5>
   <div id="forgot-password-confirmation-text-wrapper" class="container text-center">
      <p class="user-access-text">
        We've sent you a confirmation email.
        <br />
        Use the received password to login.
        <p>
         <a href="/"> Back to login</a>
        </p>
      </p>
   </div>`;
}

function hideforgotPasswordSuccessWrapper() {
  forgotPasswordSuccessWrapper.innerHTML = "";
}

function hideForgotPassword() {
  const forgotPasswordWrapper = document.getElementById(
    "forgot-password-wrapper"
  );
  forgotPasswordWrapper.parentElement.removeChild(forgotPasswordWrapper);
}

function addSpinner() {
  const spinnerContainer = document.getElementById(
    "forgot-password-submit-wrapper"
  );
  const spinner = document.createElement("div");
  spinner.id = "forgot-password-spinner";
  spinner.classList.add("generics-loader");
  spinner.style.top = "35px";

  spinnerContainer.insertBefore(spinner, spinnerContainer.firstChild);
}

function removeSpinner() {
  const spinner = document.getElementById("forgot-password-spinner");
  if (!spinner) return;

  spinner.parentNode.removeChild(spinner);
}
