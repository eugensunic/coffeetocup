export const ENDPOINT = {
  FORGOT_PASSWORD: "/api/password/forgot",
  RESET_PASSWORD: "/api/password/reset",
  REGISTER: "/api/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

export const RESPONSE_MESSAGE = {
  SERVER_ERROR: "Server error occurred, if it persists, contact administrator",
  UNSUCCESSFUL_LOGIN: "Wrong mail or password, try again",
  SUCCESSFUL_LOGIN: "Login successful!",
  EMAIL_EXISTS: "User with provided email already exists",
  USERNAME_EXISTS: "User with provided username already exists",
  SUCCESSFUL_REGISTRATION: "User registration successful!",
  FORGOT_PASSWORD_NON_EXISTING_MAIL:
    "Provided email does not exist in database",
  RESET_PASSWORD_TEXT:
    "Your reset query may not longer be valid, try again or <a href='/forgot-password'>Reset password again</a>",
};

export const EVENT = {
  SERVER_ERROR: "server_error",
};

export const GLOBAL_ERROR = {
  TIMEOUT_TIME: 6000,
};

export const COOKIE = {
  NAME: "auth",
};

export const USER_KEY = {
  registered: "registered",
};
