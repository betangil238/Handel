//Inicializamos una variable que recibirá los datos del formulario
const loginForm = document.querySelector('#loginForm')

// Inicializamos la función que nos permitirá loguerse
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    // Inicializamos una variable que nos permita ingresar al sistema
    const Users = JSON.parse(localStorage.getItem('users')) || []
    // Aquí validamos si los datos son iguales a los que se registraron
    const validUser = Users.find(user => user.email === email && user.password === password)
    // Inicializamos un condicional, especificando de que si los datos son diferentes, no nos permita iniciar sesión
    if(!validUser) {
        return alert ('Usuario y/o contraseña son incorrectos o no existen')
    }
    // Pero si los datos son correctos, nos mostrará una alerta de bienvenida
    alert(`Bienvenido ${validUser.name}`)
    // Aquí almacenamos los datos String a JSON para que se guarden en la lista de objetos
    localStorage.setItem('login_success', JSON.stringify(validUser))
    // Si los datos son correctos, que nos redirija al home del sistema
    window.location.href = 'pgppal.html'
})