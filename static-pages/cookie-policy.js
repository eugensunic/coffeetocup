
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

function addCookieScript() {
  const head = document.getElementsByTagName('head')[0];
  const js = document.createElement('script');
  js.type = 'text/javascript';
  js.src = 'https://cdn-cookieyes.com/client_data/8a13e5bcbdd27d64b0b787cd.js';
  js.id = 'cookieyes';
  js.setAttribute('defer', 'defer');
  js.setAttribute('crossorigin', 'anonymous');

  head.appendChild(js);
}

console.log(parseCookie('cky-action'));

if (!parseCookie('cky-action')) {
  addCookieScript();
}




