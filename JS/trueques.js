//const productos=[{imagen:"Img/subastas/1.png",id:"965458",likes:"320",vistas:"4220",categoria:"Autos",visibilidad:"Público",etiquetas:"autos,mecanica,taller"},
//  {imagen:"Img/subastas/2.png",id:"961581",likes:"824",vistas:"1220",categoria:"Mascotas",visibilidad:"privado",etiquetas:"cachorros,comida,juguetes"},
//  {imagen:"Img/subastas/3.png",id:"845214",likes:"201",vistas:"5842",categoria:"Sonido",visibilidad:"publico",etiquetas:"musica,reggaeton,Dj"},
//  {imagen:"Img/subastas/4.png",id:"957521",likes:"112",vistas:"8542",categoria:"Ropa",visibilidad:"publico",etiquetas:"segunda,roto,trapos"},
//  {imagen:"Img/subastas/5.png",id:"965458",likes:"845",vistas:"1245",categoria:"Tecnologia",visibilidad:"privado",etiquetas:"pc,gamer,teclado"},
// {imagen:"Img/subastas/6.png",id:"123",likes:"2",vistas:"678",categoria:"Belleza",visibilidad:"privado",etiquetas:"usado, antiguo"},
//  {imagen:"Img/subastas/7.png",id:"124",likes:"23",vistas:"546",categoria:"Juguetes",visibilidad:"publico",etiquetas:"nuevo, personalizado"},
//  {imagen:"Img/subastas/8.png",id:"125",likes:"77",vistas:"323",categoria:"Ropa",visibilidad:"publico",etiquetas:""},
// {imagen:"Img/subastas/9.png",id:"126",likes:"88",vistas:"325",categoria:"Bebes",visibilidad:"publico",etiquetas:"usado"},
//  {imagen:"Img/subastas/10.png",id:"126",likes:"88",vistas:"325",categoria:"Bebes",visibilidad:"publico",etiquetas:"usado"}
//]
const categoria=["Ropa","Utensilios","Juguetes","Tecnología","Vehículos","Deportes","Electrodomésticos","Belleza","Papelería","Bebes","Moda","Videojuegos","Hogar","Otros"]
const empaquetador=document.querySelector(".ContenidoSubastas");


const linkTrueques="https://handelrailway-production.up.railway.app/objtrueque";

async function obtenerTrueques(link){
    const res = await fetch(link);
    const data = await res.json();
    console.log(data);
    producirProductos(data)
    //return data;
}

obtenerTrueques(linkTrueques);


//function epocaIndustrial(){
    //for(let i=0;i<0;i++){
    //const producto= {};
    //const posicion=Math.floor((Math.random()*categoria.length));
    //const categoria1= `${categoria[posicion]}`;
    //producto.imagen=`Img/subastas/${Math.floor((Math.random()*11)+1)}.png`
    //producto.id=`${Math.floor((Math.random()*9000))}`;
    //producto.likes=Math.floor((Math.random()*999)+1);
    //producto.vistas=Math.floor((Math.random()*9999)+1);
    //producto.categoria=categoria1;
    //producto.visibilidad="Público";
    //producto.etiquetas="musica,reggaeton,Dj";
    //productos.push(producto); 
    //}
//}

function base64ToBlob(base64, contentType) {
    const binaryStr = window.atob(base64);
    const binaryArray = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        binaryArray[i] = binaryStr.charCodeAt(i);
    }
    return new Blob([binaryArray], { type: contentType });
}

function base64ToBlob1(base64String) {
    const binaryString = window.atob(base64String);
    const length = binaryString.length;
    const uint8Array = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    const contentType = "application/octet-stream"; // Asegúrate de especificar el tipo de contenido correcto
    const blob = new Blob([uint8Array], { type: contentType });
    return(blob)
    //img.src = URL.createObjectURL(blob);
}


function producirProductos(productos){
    productos.forEach(e => {
        const blob = base64ToBlob(e.imagen, "image/jpeg");
        const url = URL.createObjectURL(blob);
        empaquetador.innerHTML+=`<article class="contenedor" id="contenedor">
        <div class="imagenContainer">
            <img src="${url}" class="imagenPublicacion">
        </div>
        <div class="infoProducto">
            <div class="infoPublicacion">
                <p class="NombreUsuario">Trueque <span class="idPublicacion">${e.titulo}</span></p>
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
                    <button class="participar">Ofrecer</button>
                </div>
            </div>
        </div>
        </article>`

    }); 
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
