/*codigo para ocultar el menu filtros*/
const filterButton = document.querySelector(".filterButton");
const menuFiltros = document.querySelector(".menuFiltros");

const user= JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href="login.html"  
}

function mostrarFiltros() {
    if (menuFiltros.style.display === "flex" || menuFiltros.style.display === "") {
        menuFiltros.style.display = "none";
    } else {
        menuFiltros.style.display = "flex";
    }
    
};
filterButton.addEventListener("click", mostrarFiltros());




/*codigo para ocultar filtros*/


const titulosFiltro = document.querySelectorAll(".tituloFiltro h3");

titulosFiltro.forEach(titulo => {
    titulo.addEventListener("click", function() {
        // Busca la lista de filtro asociada
        const listaFiltro = titulo.parentElement.nextElementSibling;
        const flechaAbajo = titulo.nextElementSibling;
        const flechaArriba = titulo.nextElementSibling.nextElementSibling;

        
        if (listaFiltro) {
            
            if (getComputedStyle(listaFiltro).display === "none" || getComputedStyle(listaFiltro).display === "") {
                listaFiltro.style.display = "flex";
                flechaAbajo.style.display = "none";
                flechaArriba.style.display = "inline";
            } else {
                listaFiltro.style.display = "none";
                flechaAbajo.style.display = "inline";
                flechaArriba.style.display = "none";
            }
        }
    });
});




/*codigo para navegar entre tablas*/
const elementosPorPagina = 6;
let paginaActual = 1;


const filas = document.querySelectorAll("table tbody tr");
const datosMostradosSpan = document.getElementById("datosMostrados");
const datosTotalesSpan = document.getElementById("datosTotales");
const botonAnterior = document.querySelector(".botonAnterior");
const botonSiguiente = document.querySelector(".botonSiguiente");


function actualizarCantidadDatos() {
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;

    datosMostradosSpan.textContent = Math.min(fin, filas.length);
    datosTotalesSpan.textContent = filas.length;
}


function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;

    filas.forEach(fila => fila.style.display = "none");

    for (let i = inicio; i < fin && i < filas.length; i++) {
        filas[i].style.display = "table-row";
    }

    actualizarCantidadDatos();
}

botonAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarPagina(paginaActual);
    }
});

botonSiguiente.addEventListener("click", () => {
    const totalPages = Math.ceil(filas.length / elementosPorPagina);
    if (paginaActual < totalPages) {
        paginaActual++;
        mostrarPagina(paginaActual);
    }
});

mostrarPagina(paginaActual);
