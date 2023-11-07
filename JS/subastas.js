const user= JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href="login.html"  
}
window.location.href="underConstruction.html"  