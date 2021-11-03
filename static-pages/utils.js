// script toggles navbar elements based on logged in stated which is defined by document.cookie

// functions begin
function hideLoginState() {
  document.getElementById('open-login').style.display = 'none';
  document.getElementById('open-sign-up').style.display = 'none';
  const angularIcon = document.getElementById('angular-user-icon');
  if (angularIcon) {
    angularIcon.style.display = '';
  }
}

function showLoginState() {
  document.getElementById('open-login').style.display = '';
  document.getElementById('open-sign-up').style.display = '';
  const angularIcon = document.getElementById('angular-user-icon');
  if (angularIcon) {
    angularIcon.style.display = 'none';
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

function parseCookie(param) {
  var nameEQ = param + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function getCurrentDateTimeString() {
  const d = new Date();
  const date =
    d.getDate().toString().length === 1
      ? '0' + d.getDate().toString()
      : d.getDate().toString();
  const month =
    (d.getMonth() + 1).toString().length === 1
      ? '0' + (d.getMonth() + 1).toString()
      : (d.getMonth() + 1).toString();
  const year = d.getFullYear();

  const hour =
    d.getHours().toString().length === 1
      ? '0' + d.getHours().toString()
      : d.getHours().toString();
  const minutes =
    d.getMinutes().toString().length === 1
      ? '0' + d.getMinutes().toString()
      : d.getMinutes().toString();

  const MM_DD_YYY__hh_mm =
    month + '/' + date + '/' + year + ', ' + hour + ':' + minutes;
  return MM_DD_YYY__hh_mm;
}

function handleOnLogoutClick() {
  const logoutButton = document.getElementById('logout-button');
  if (!logoutButton) return;
  logoutButton.addEventListener('click', () => {
    fetch('/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loggedOutTime: getCurrentDateTimeString() }),
    }).then((res) => {
      window.location.href = '/';
    });
  });
}

// functions end

// if logged in
if (parseCookie('auth')) {
  showNavbarElements();
  hideLoginState();
  var elements = document.getElementsByClassName('btn-get-started');
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.setProperty('display', 'none', 'important');
  }
} else {
  hideNavbarElements();
  showLoginState();
}

//event listeners
handleOnLogoutClick();

