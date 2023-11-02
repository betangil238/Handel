import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { app } from "./formularioGoogle.mjs";


const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(app.auth(), provider)
        .then(() => {
            // La redirección se ha completado, el usuario será dirigido a la página de autenticación de Google.
        })
        .catch((error) => {
            console.error(error);
        });
});
