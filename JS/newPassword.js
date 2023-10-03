const verificacionPrevia= JSON.parse(localStorage.getItem('USUARIO')) || false
if (!verificacionPrevia) {
    window.location.href="forgotPassword.html"  
}