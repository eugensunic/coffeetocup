const fs = require("fs");

module.exports.init = (app) => {
  // generics
  const HOME_PAGE_HTML = fs.readFileSync(__dirname + "/html/index.html");
  const REGISTER_PAGE_HTML = fs.readFileSync(__dirname + "/html/register.html");
  const FORGOT_PASSWORD_HTML = fs.readFileSync(
    __dirname + "/html/forgot-password.html"
  );
  const RESET_PASSWORD_HTML = fs.readFileSync(
    __dirname + "/html/reset-password.html"
  );
  // SEO SSR rendering from angular pages
  const ABOUT_HTML = fs.readFileSync(__dirname + "/html/about.html");
  const PRIVACY_POLICY_HTML = fs.readFileSync(__dirname + "/html/privacy-policy.html");
  const BREW_COLLECT_EXPLORE = fs.readFileSync(__dirname + "/html/brew-collect-explore.html");
  const HOW_IT_WORKS = fs.readFileSync(__dirname + "/html/how-it-works.html");
  const LEARN = fs.readFileSync(__dirname + "/html/learn.html");
  const COOKIE_POLICY = fs.readFileSync(__dirname + "/html/cookie-policy.html");

  const ANGULAR_PAGE = fs.readFileSync("./angular/profile.html");

  // OUTSIDE ANGULAR PAGES SSR rendering for SEO
  app.route("/").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(HOME_PAGE_HTML);
  });

  app.route("/register").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(REGISTER_PAGE_HTML);
  });

  app.route("/forgot-password").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(FORGOT_PASSWORD_HTML);
  });

  app.route("/reset-password/*").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(RESET_PASSWORD_HTML);
  });

  // static pages
  app.route("/brewcollectexplore").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(BREW_COLLECT_EXPLORE);
  });

  app.route("/howitworks").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(HOW_IT_WORKS);
  });

  app.route("/learn").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(LEARN);
  });


  app.route("/about").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(ABOUT_HTML);
  });

  app.route("/privacy-policy").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(PRIVACY_POLICY_HTML);
  });

  app.route("/cookie-policy").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(COOKIE_POLICY);
  });

  // ANGULAR 
  app.route('/*').get(function (req, res) {
    res.end(ANGULAR_PAGE);
  });


};
