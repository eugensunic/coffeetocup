//  home page html nodes

import { isLoggedIn } from '../shared';

// const openLoginBtn = document.getElementById('open-login');
const signUpBtn = document.getElementById("open-sign-up");
const homePageFirstMainBtn = document.getElementById(
  "home-page-first-btn-main"
);
const getStartedBtn = document.getElementById("btn-get-started");

const profileNavBtn = document.getElementById("btn-profile");
const coffeesNavBtn = document.getElementById("btn-coffees");
const communityNavBtn = document.getElementById("btn-community");

const openLoginBtn = document.getElementById("open-login");

export function initHomePage() {
  if (!isLoggedIn()) {
    hideNavbarElements();
  } else {
    showNavbarElements()
  }

  if (!signUpBtn || !profileNavBtn || !coffeesNavBtn || !communityNavBtn) return;

  // navigation buttons
  profileNavBtn.addEventListener("click", e => {
    e.preventDefault();
    if (!isLoggedIn()) {
      openLoginBtn.click();
      history.replaceState({ url: '/profile' }, null);
      return;
    }
    window.location.href = "/profile";
  });

  coffeesNavBtn.addEventListener("click", e => {
    e.preventDefault();
    if (!isLoggedIn()) {
      openLoginBtn.click();
      history.replaceState({ url: '/coffees' }, null);
      return;
    }
    window.location.href = "/coffees";
  });

  communityNavBtn.addEventListener("click", e => {
    e.preventDefault();
    if (!isLoggedIn()) {
      openLoginBtn.click();
      history.replaceState({ url: '/community' }, null);
      return;
    }
    window.location.href = "/community";
  });

  signUpBtn.addEventListener("click", e => {
    window.location.href = "/register";
  });

  // content buttons
  if (homePageFirstMainBtn) {
    homePageFirstMainBtn.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = "/brewcollectexplore";
    });
  }
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = "/register";
    });
  }
}

function hideNavbarElements() {
  if (!document.getElementById('btn-community') || !document.getElementById('btn-coffees')) return;
  document.getElementById('btn-community').parentElement.style.display = 'none';
  document.getElementById('btn-coffees').parentElement.style.display = 'none';
}

function showNavbarElements() {
  if (!document.getElementById('btn-community') || !document.getElementById('btn-coffees')) return;
  document.getElementById('btn-community').parentElement.style.display = '';
  document.getElementById('btn-coffees').parentElement.style.display = '';
}
