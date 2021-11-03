import "../css/index.scss";

import { initRegister } from "../js/user-access/register";
import { initLogin } from "../js/user-access/login";
import {
  initForgotPassword,
  initResetPassword
} from "../js/user-access/forgot-password";
import { initHomePage } from "../js/home-page";
import { showGlobalError } from "./shared";

// server error global event listener
window.addEventListener("server_error", showGlobalError);

initHomePage();
initLogin();

// register page
initRegister();

// forgot password pages
initForgotPassword();
initResetPassword();

// dispatch the event across app
// window.dispatchEvent(new Event('server_error'));
