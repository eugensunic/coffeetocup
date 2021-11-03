/**
 file is used to store functions across the application
 service could have been created for some, but it seems vastly
 unnecessary to hold one or two functions inside that service,
 usually such things are done through DI but decided not go with it
 rather just call the method wherever it's needed
**/

export function removeNavbarDropdown() {
  document.querySelector('#angularNavbarNavDropdown').classList.remove('show');
}

export function activateStep(stepNumber: number) {
  Array.from(document.getElementsByClassName('step')).forEach((item, index) => {
    const labelName = item.querySelector('.label') as HTMLElement;
    if (!labelName) return;
    if (index + 1 === stepNumber) {
      labelName.style.display = '';
      item.className = 'step active';
    } else {
      labelName.style.display = 'none';
      item.className = 'step blur-icon';
    }
  });
}

export function isDigitOnly(value: string) {
  return /^\d+$/.test(value);
}

// Cookie functions
export function setCookie(name: string, value: string, days: number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

export function cookieObject(cookieName: string): any {
  const cookieValue = getCookie(cookieName);
  if (cookieValue) {
    return JSON.parse(decodeURIComponent(cookieValue).trim().substring(2));
  }
}

// not used
export function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

export function getToken(url: string, name: string) {
  return url.indexOf(name) > -1
    ? url
        .substring(url.indexOf(name) + name.length)
        .split('/')
        .join('')
    : '';
}

// return format example --> 22/12/2018, 02:45
export function getCurrentDateTimeString() {
  const d = new Date();
  const date = d.getDate().toString().length === 1 ? '0' + d.getDate().toString() : d.getDate().toString();
  const month =
    (d.getMonth() + 1).toString().length === 1
      ? '0' + (d.getMonth() + 1).toString()
      : (d.getMonth() + 1).toString();
  const year = d.getFullYear();

  const hour = d.getHours().toString().length === 1 ? '0' + d.getHours().toString() : d.getHours().toString();
  const minutes =
    d.getMinutes().toString().length === 1 ? '0' + d.getMinutes().toString() : d.getMinutes().toString();

  const MM_DD_YYY__hh_mm = month + '/' + date + '/' + year + ', ' + hour + ':' + minutes;
  return MM_DD_YYY__hh_mm;
}

// d represents date

export function convertToDateTimeString(d) {
  if (!d || isNaN(d)) return '';
  const date = d.getDate().toString().length === 1 ? '0' + d.getDate().toString() : d.getDate().toString();
  const month =
    (d.getMonth() + 1).toString().length === 1
      ? '0' + (d.getMonth() + 1).toString()
      : (d.getMonth() + 1).toString();
  const year = d.getFullYear();

  const hour = d.getHours().toString().length === 1 ? '0' + d.getHours().toString() : d.getHours().toString();
  const minutes =
    d.getMinutes().toString().length === 1 ? '0' + d.getMinutes().toString() : d.getMinutes().toString();

  const MM_DD_YYY__hh_mm = month + '/' + date + '/' + year + ', ' + hour + ':' + minutes;
  return MM_DD_YYY__hh_mm;
}

// not used
export function getRandomColor(amount) {
  const letters = '0123456789ABCDEF';
  const array = [];
  let color = '#';
  for (let j = 0; j < amount; j++) {
    for (let i = 0; i < amount; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    array.push(color);
  }

  return array;
}

export function isEmailValid(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
