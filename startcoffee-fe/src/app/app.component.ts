import { Component, OnInit } from '@angular/core';
import { cookieObject, getCurrentDateTimeString, removeNavbarDropdown } from 'src/app/utils';
import { KeepSessionAliveService } from './core-global-elements/services/keep-session-alive.service';
import { LoginService } from './login/services/login.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  removeDropdown = removeNavbarDropdown.bind(null);
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    document.querySelector('#angularNavbarNavDropdown ul').addEventListener('click', this.removeDropdown);
    if (cookieObject('auth')) {
      document.querySelector('#btn-profile').addEventListener('click', (e) => {
        window.location.href = '/profile';
      });
    } else {
      if (window.location.href.includes('shared/')) {
        document.getElementById('logo-mobile').style.marginRight = '145px';
        document.getElementById('angular-user-icon').style.display = 'none';
        document.getElementById('community-item').style.display = 'none';

        this.insertLoginWrapper();
        this.insertLoginSignOut();
        this.insertGenericsScript();
        this.insertGenericsStyles();
      }
    }
  }

  onLogout() {
    this.loginService.logout().then((_) => {
      window.location.href = '/';
    });
  }

  insertGenericsScript() {
    var generics = document.createElement('script');
    generics.setAttribute('src', '/assets/generics/generics.js');
    var polyfills = document.createElement('script');
    polyfills.setAttribute('src', '/assets/generics/polyfills.js');
    var eyeIcon = document.createElement('script');
    eyeIcon.setAttribute('src', '/assets/generics/eye-icon.js');

    document.body.appendChild(eyeIcon);
    document.body.appendChild(generics);
    document.body.appendChild(polyfills);
  }

  insertGenericsStyles() {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', '/assets/generics/bundle.css');
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  insertLoginWrapper() {
    document.getElementById('login-wrapper').innerHTML = `
    <div id="login-modal-fade-in" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content font-lato">
                <div class="modal-header">
                    <h4 class="modal-title" id="login-modal-title">
                        Log in
                    </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="container">
                        <div class="form-group">
                            <label class="cursor-pointer" for="login-email">E-mail</label>
                            <input id="login-email" type="email" class="form-control" required
                                placeholder="name@example.com" />
                            <div class="invalid-feedback">Please
                                enter valid email</div>
                        </div>
                        <div class="form-group">
                            <label class="cursor-pointer" for="login-password">Password</label>
                            <input id="login-password" type="password" class="form-control" required
                                placeholder="Password" />
                                <div class="position-relative">
                                <div id="password-eye-icon"
                                style="position: absolute;right: 11px;top: -28px;z-index: 1000;cursor: pointer; height: 16px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye"
                                  viewBox="0 0 16 16">
                                  <path
                                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                  <path
                                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                  class="bi bi-eye-slash" viewBox="0 0 16 16">
                                  <path
                                    d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                  <path
                                    d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                  <path
                                    d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z" />
                                </svg>
                              </div>
                            </div>
                            <div id="login-pwd-err-1" class="invalid-feedback">
                                Please enter a password</div>
                            <div id="login-pwd-err-2" class="invalid-feedback">
                                Please enter at least 5
                                characters
                            </div>
                            <a id="forgot-password-navigation" href="/forgot-password"
                                class="mt-1 font-sanspro">Forgot
                                password?</a>
                            <br />


                            <div id="login-submit-wrapper" class="text-center mb-5">
                                <button id="login" type="button" class="btn user-access-bnt-submit font-sanspro">
                                    Log in
                                </button>
                                <a href="/register" class="font-sanspro d-flex justify-content-center w-100"
                                    style="color: #6ba2bb; position:relative;top:10px">
                                    Create account
                                </a>
                            </div>
                            <div class="row social-media-split-wrapper">
                                <div class="col-5">
                                    <hr class="social-media-horizontal-line" style="height:2px" />
                                </div>
                                <div class="col-2 social-media-or-word">
                                    Or</div>
                                <div class="col-5">
                                    <hr class="social-media-horizontal-line" style="height:2px" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4 text-center">
                                    <svg id="google-login" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer"
                                        viewBox="0 0 40 40" width="50" height="50">
                                        <path fill="#8bb7f0"
                                            d="M28.229,29.396c1.528-1.345,2.711-3.051,3.438-4.968c0.187-0.491,0.321-0.905,0.423-1.303 l0.16-0.625H20.5v-6h17.662c0.225,1.167,0.338,2.343,0.338,3.5c0,5.005-2.069,9.834-5.692,13.32L28.229,29.396z" />
                                        <path fill="#4e7ab5"
                                            d="M37.744,17C37.914,18.002,38,19.008,38,20c0,4.719-1.891,9.277-5.216,12.641l-3.802-3.259 c1.385-1.333,2.465-2.964,3.153-4.777c0.192-0.506,0.332-0.937,0.44-1.355L32.897,22h-1.291H21v-5H37.744 M38.57,16H20v7h11.607 c-0.11,0.428-0.252,0.842-0.406,1.25c-0.772,2.034-2.073,3.808-3.744,5.141l5.367,4.6C36.611,30.518,39,25.544,39,20 C39,18.627,38.847,17.291,38.57,16L38.57,16z" />
                                        <path fill="#8bb7f0"
                                            d="M32.828,22c-0.501,3.231-2.175,6.075-4.594,8.058l3.825,3.278c3.175-2.873,5.329-6.852,5.828-11.336 H32.828z" />
                                        <path fill="#bae0bd"
                                            d="M20,38.5c-6.903,0-13.128-3.773-16.349-9.877l4.957-3.499C10.625,29.626,15.031,32.5,20,32.5 c2.713,0,5.277-0.851,7.439-2.465l4.624,3.963C28.695,36.906,24.434,38.5,20,38.5z" />
                                        <path fill="#5e9c76"
                                            d="M8.411,25.875C10.612,30.242,15.035,33,20,33c2.688,0,5.234-0.803,7.413-2.329l3.876,3.322 C28.086,36.585,24.12,38,20,38c-6.57,0-12.509-3.513-15.697-9.225L8.411,25.875 M8.828,24.357l-5.82,4.108 C6.123,34.704,12.552,39,20,39c4.949,0,9.442-1.908,12.823-5.009l-5.367-4.6C25.411,31.023,22.822,32,20,32 C14.911,32,10.573,28.827,8.828,24.357L8.828,24.357z" />
                                        <path fill="#bae0bd"
                                            d="M28.234,30.058C25.992,31.896,23.125,33,20,33c-5.407,0-10.041-3.303-12-8l-4.13,2.95 C6.807,33.899,12.917,38,20,38c4.645,0,8.866-1.775,12.059-4.664L28.234,30.058z" />
                                        <path fill="#f78f8f"
                                            d="M3.891,10.907C7.177,5.094,13.31,1.5,20,1.5c4.493,0,8.8,1.632,12.186,4.607l-4.212,4.212 C25.757,8.498,22.944,7.5,20,7.5c-4.84,0-9.196,2.763-11.271,7.093L3.891,10.907z" />
                                        <path fill="#c74343"
                                            d="M20,2c4.193,0,8.22,1.462,11.449,4.136l-3.515,3.515C25.688,7.935,22.905,7,20,7 c-4.828,0-9.192,2.643-11.445,6.832l-4.01-3.055C7.791,5.342,13.637,2,20,2 M20,1C12.746,1,6.446,5.068,3.245,11.044l5.682,4.329 C10.738,11.043,15.013,8,20,8c3.059,0,5.881,1.116,8,3l4.911-4.911C29.52,2.94,24.992,1,20,1L20,1z" />
                                        <g>
                                            <path fill="#f78f8f"
                                                d="M20,7V2C13.07,2,7.064,5.922,4.056,11.662l4.056,3.09C10.13,10.189,14.689,7,20,7z" />
                                        </g>
                                        <g>
                                            <path fill="#ffeea3"
                                                d="M3.235,27.789C2.083,25.324,1.5,22.707,1.5,20c0-2.838,0.661-5.66,1.917-8.197l4.905,3.737 C7.776,16.965,7.5,18.463,7.5,20c0,1.435,0.249,2.851,0.74,4.214L3.235,27.789z" />
                                            <path fill="#ba9b48"
                                                d="M3.604,12.574l4.121,3.14C7.244,17.09,7,18.528,7,20c0,1.367,0.217,2.717,0.646,4.024l-4.204,3.003 C2.484,24.791,2,22.432,2,20C2,17.441,2.552,14.897,3.604,12.574 M3.245,11.044C1.815,13.713,1,16.76,1,20 c0,3.075,0.747,5.97,2.044,8.54l5.799-4.142C8.305,23.035,8,21.554,8,20c0-1.64,0.331-3.203,0.927-4.627L3.245,11.044L3.245,11.044 z" />
                                        </g>
                                        <g>
                                            <path fill="#ffeea3"
                                                d="M7,20c0-1.869,0.402-3.642,1.112-5.248l-4.056-3.09C2.749,14.156,2,16.989,2,20 c0,2.858,0.684,5.55,1.869,7.951L8,25C7.357,23.461,7,21.772,7,20z" />
                                        </g>
                                    </svg>
                                </div>
                                <div class="col-4"></div>
                                <div class="col-4 text-center">
                                    <svg id="facebook-login" width="50" height="50" class="cursor-pointer"
                                        viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22.9999 0C35.7032 0 46 10.2982 46 23.0001C46 35.7033 35.7032 46 22.9999 46C10.2967 46 0 35.7032 0 23.0001C0 10.2982 10.2968 0 22.9999 0Z"
                                            fill="#3B5998" />
                                        <path
                                            d="M25.8001 15.834H28.7643V11.4553H25.2799V11.4711C21.0579 11.6206 20.1925 13.9939 20.1163 16.4866H20.1076V18.673H17.2327V22.961H20.1076V34.4552H24.4403V22.961H27.9895L28.6751 18.673H24.4417V17.352C24.4417 16.5096 25.0023 15.834 25.8001 15.834Z"
                                            fill="white" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
  }

  insertLoginSignOut() {
    document.getElementById('login-signout').innerHTML = `
    <!-- Login signout -->
    <div id="open-login" class="cursor-pointer font-sanspro"
        style="border: 1px solid rgba(1,72,42,0.8);margin-right: 5px;" data-toggle="modal"
        data-target="#login-modal-fade-in">
        Login
    </div>
    <div id="open-sign-up" class="cursor-pointer font-sanspro" style="margin-right:10px;!important"
        onclick="function register(){window.location.href='/register'};register()">Sign
        up
    </div>
    <!-- Login signout -->
    `;
  }

  ngOnDestroy() {
    document.querySelector('#angularNavbarNavDropdown ul').addEventListener('click', this.removeDropdown);
  }
}
