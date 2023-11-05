const linkSubastas="https://handelrailway-production.up.railway.app/objsubasta";

async function obtenerSubastas(link){
    const res = await fetch(link);
    const data = await res.json();
    await producirSubastas(data)
    navegacionTablas()
    clickSubastas()
}

obtenerSubastas(linkSubastas);


function sumarDiasAFecha(fechaStr, dias) {
    // Convierte la cadena en un objeto Date
    var fecha = new Date(fechaStr);
    
    // Verifica que la conversión haya sido exitosa
    if (isNaN(fecha)) {
      return "Fecha inválida";
    }
    // Agrega los días
    fecha.setDate(fecha.getDate() + dias);
    
    // Convierte la nueva fecha en una cadena
    var nuevaFechaStr = fecha.toISOString().split('T')[0];
    
    return nuevaFechaStr;
}


const cuerpoTabla = document.querySelector(".cuerpoTabla")
async function producirSubastas(productos){
    productos.forEach(e => {

        if(e.visibilidad == "Todos"){
            let fechaSola = e.fechadecreacion
            let fecha = fechaSola.slice(0,10);
            let fechaCierre = sumarDiasAFecha(fecha,3)
            
            let idGanador
            if(e.idGanador == null){
                idGanador = "Sin ofertas"
            }else{
                idGanador = e.idGanador
            }
            cuerpoTabla.innerHTML += `<tr class="tableItems">
            <td class="itemImg"><img src="${e.imagen}" alt=""></td>
            <td class="itemObjeto">${e.titulo}</td>
            <td class="itemEstado">${e.visibilidad}</td>
            <td class="itemCategoria">${e.categoria}</td>
            <td class="itemPujas">${idGanador}</td>
            <td class="itemValor">${e.valor}</td>
            <td class="itemFecha">${fechaCierre}</td>
            <td class="itemParticipar"><button class="participarButton ${e.idsubastas}" id="${e.idsubastas}">Participar</button></td>
            </tr>`
        }
    }); 
}



async function clickSubastas(){
    const todosBotones = document.querySelectorAll(".participarButton")
    todosBotones.forEach(e =>{
        e.addEventListener("click",function(){
            localStorage.setItem("idSubasta", JSON.stringify({"idSubasta": e.id}))
            window.location.href='objetoSubastas.html';
        })
    })
}








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

async function navegacionTablas(){
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

}

