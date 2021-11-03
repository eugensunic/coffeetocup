function toggleEyeSvgIcons(flag) {
    const eyeSvgOpen = document.querySelector('.bi-eye');
    const eyeSvgClosed = document.querySelector('.bi-eye-slash');
    if (flag) {
        eyeSvgOpen.style.display = '';
        eyeSvgClosed.style.display = 'none';
    }
    else {
        eyeSvgOpen.style.display = 'none';
        eyeSvgClosed.style.display = '';
    }
}

function handleOnPasswordToggle() {
    let passwordShow = false;
    const eyeIcon = document.getElementById('password-eye-icon');

    eyeIcon.addEventListener('click', () => {
        passwordShow = !passwordShow;
        if (passwordShow) {
            document.getElementById('login-password').type = 'text';
            toggleEyeSvgIcons(passwordShow);
        }
        else {
            document.getElementById('login-password').type = 'password';
            toggleEyeSvgIcons(passwordShow);
        }
    });
}
// function call
const eyeSvgIcon = document.querySelector('.bi-eye');
if (eyeSvgIcon) eyeSvgIcon.style.display = 'none';
handleOnPasswordToggle();