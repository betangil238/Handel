const categoria=["Ropa","Utensilios","Juguetes","Tecnología","Vehículos","Deportes","Electrodomésticos","Belleza","Papelería","Bebes","Moda","Videojuegos","Hogar","Otros"]
const empaquetador=document.querySelector(".ContenidoSubastas");


const linkTrueques="https://handelrailway-production.up.railway.app/objtrueque";

async function obtenerTrueques(link){
    const res = await fetch(link);
    const data = await res.json();
    producirProductos(data)
    clickTrueques()
}

obtenerTrueques(linkTrueques);


function producirProductos(productos){
    productos.forEach(e => {
        if(e.visibilidad== "Todos"){
            empaquetador.innerHTML+=`<article class="contenedor  ${e.idTrueques}" id="contenedor">
            <div class="imagenContainer">
                <img src="${e.imagen}" class="imagenPublicacion">
            </div>
            <div class="infoProducto">
                <div class="infoPublicacion">
                    <p class="NombreUsuario"><span class="idPublicacion">${e.titulo}</span></p>
                    <div class="likes_Vistas">
                        <p class="parrafoLikes"><i class='bx bx-heart' style='color:#f9f9f9'  ></i><span class="CantidadLikes">${e.likes}</span><span>Likes</span></p>
                        <p class="parrafoVistas"> <span class="material-symbols-outlined">visibility</span><span class="CantidadVistas">${e.vistas}</span><span>Vistas</span></p>
                    </div>
                </div>
                <div class="infoGral">
                    <div class="statusPublicacion">
                        <div class="texto">
                            <label class="titulo">Categoria</label>
                            <p class="contenido">${e.categoria}</p>
                        </div>
                        <div class="texto">
                            <label class="titulo">Visibilidad</label>
                            <p class="contenido">${e.visibilidad}</p>
                        </div>
                        <div class="texto">
                            <label class="titulo">Etiquetas</label>
                            <p class="contenido">${e.etiquetas}</p>
                        </div>
                    </div>
                    <div class="btnParticipar">
                        <button class="participar" id="${e.idTrueques}">Ofrecer</button>
                    </div>
                </div>
            </div>
            </article>`
        }
    
    }); 
}

function clickTrueques(){
    const containerTrueques = document.querySelectorAll(".participar")
    containerTrueques.forEach(e => {
        e.addEventListener("click", function(){
            const idTrueque = e.id;
            localStorage.setItem("idTrueque", JSON.stringify({"idTrueque":idTrueque}))
            window.location.href='objetoTrueques.html';
        })
    })
}



function mostrarAlertaRechazo(text) {
    Swal.fire({
        title: 'Error',
        text: `${text}`,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        customClass: {
            container: 'mi-alerta-error',
            title: 'mi-titulo-error',
            content: 'mi-contenido-error',
            confirmButton: 'mi-boton-error'
        }
    });
}


const boton_Grilla = document.querySelector("#grid")
const boton_Lista = document.querySelector("#lista")
const tarjeta = document.querySelectorAll('.contenedor')
const info_Publi = document.querySelectorAll(".infoPublicacion")
const infoGeneral = document.querySelectorAll(".infoGral");
const titulo = document.querySelectorAll(".NombreUsuario")
const likes_Vistas = document.querySelectorAll(".likes_Vistas")
const texto = document.querySelectorAll(".texto")
const texto_Tarjeta = document.querySelectorAll(".contenido");
const textos = document.querySelectorAll(".statusPublicacion");
const imagen = document.querySelectorAll(".imagenPublicacion");
const botones = document.querySelectorAll(".btnParticipar");
const infoProducto = document.querySelectorAll(".infoProducto");

boton_Grilla.addEventListener("click", function(){
    const estilo = window.getComputedStyle(empaquetador);
    if (estilo.display == "block"){
        css_Grilla();
    } else{
        css_Original();
    }
});

boton_Lista.addEventListener("click", function(){
    const estilo = window.getComputedStyle(empaquetador);
    if (estilo.display == "flex"){
        css_Original();
    } else{
        css_Grilla();
    }
});





function css_Original(){
    empaquetador.removeAttribute("style");
        boton_Grilla.removeAttribute("style");
        boton_Lista.removeAttribute("style");
        tarjeta.forEach((tar)=>{
            tar.removeAttribute("style");
        })
        info_Publi.forEach((info)=>{
            info.removeAttribute("style");
        })
        infoGeneral.forEach((infoGene) =>{
            infoGene.removeAttribute("style");
        })
        titulo.forEach((tit) =>{
            tit.removeAttribute("style");
        })
    
        likes_Vistas.forEach((lik) =>{
            lik.removeAttribute("style");
        })
    
        texto.forEach((tex) =>{
            tex.removeAttribute("style");
        })
    
        texto_Tarjeta.forEach((texto) =>{
            texto.removeAttribute("style");
    
        })
    
        textos.forEach((te) =>{
            te.removeAttribute("style");
        })
    
        imagen.forEach((img) =>{
            img.removeAttribute("style");
        })
    
        botones.forEach((boton) =>{
            boton.removeAttribute("style");
        })
    
        infoProducto.forEach((infoPro) =>{
            infoPro.removeAttribute("style");
        })
}

function css_Grilla(){
    empaquetador.style.display = "flex";
        empaquetador.style.flexDirection = "row";
        empaquetador.style.flexWrap = "wrap";
        empaquetador.style.alignItems = "center";
        empaquetador.style.justifyContent = "center";
        empaquetador.style.gap = "30px";
        empaquetador.style.width = "90%";
        boton_Lista.style.backgroundColor = "white"
        boton_Grilla.style.backgroundColor = "#D7AE00";

        tarjeta.forEach((tar)=>{
            tar.style.flexDirection = "column";
            tar.style.alignItems = "center";
            tar.style.width = "350px"
            tar.style.height = "350px"
            tar.style.justifyContent = "center";
            tar.style.marginBottom = "0px";
        })
        info_Publi.forEach((info)=>{
            info.style.flexDirection = "column";
        })
        infoGeneral.forEach((infoGene) =>{
            infoGene.style.flexDirection = "column";
            infoGene.style.alignItems = "center";
        })
        titulo.forEach((tit) =>{
            tit.style.textAlign = "center";
            tit.style.marginTop = "10px";
        })
    
        likes_Vistas.forEach((lik) =>{
            lik.style.flexDirection = "row";
            lik.style.alignItems = "center";
            lik.style.justifyContent = "end";
        })
    
        texto.forEach((tex) =>{
            tex.style.display = "flex";
            tex.style.flexDirection = "row";
        })
    
        texto_Tarjeta.forEach((texto) =>{
            texto.style.marginLeft = "10px";
    
        })
    
        textos.forEach((te) =>{
            te.style.width = "100%"
        })
    
        imagen.forEach((img) =>{
            img.style.marginTop = "25px";
            img.style.marginBottom = "15px";
            img.style.marginLeft = "0px";
        })
    
        botones.forEach((boton) =>{
            boton.style.width = "70%"
            boton.style.marginTop = "15px";
        })
    
        infoProducto.forEach((infoPro) =>{
            infoPro.style.marginLeft = "0px";
            infoPro.style.alignItems = "center";
        })
}
