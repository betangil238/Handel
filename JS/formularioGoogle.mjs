// formularioGoogle.js

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJUdv73xLzmKyGiROjcZRcBVyfLbKWQys",
  authDomain: "handel-400300.firebaseapp.com",
  projectId: "handel-400300",
  storageBucket: "handel-400300.appspot.com",
  messagingSenderId: "53580596921",
  appId: "1:53580596921:web:ca6f90cb52a163e09fbd68",
  measurementId: "G-7FKF6H9B1C"
};

const app = initializeApp(firebaseConfig);

export { app };
