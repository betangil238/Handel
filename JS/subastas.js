const productos=[{imagen:"Img/subastas/1.png",id:"965458",likes:"320",vistas:"4220",categoria:"Autos",visibilidad:"Público",etiquetas:"autos,mecanica,taller"},
// {imagen:"Img/subastas/2.png",id:"961581",likes:"824",vistas:"1220",categoria:"Mascotas",visibilidad:"privado",etiquetas:"cachorros,comida,juguetes"},
// {imagen:"Img/subastas/3.png",id:"845214",likes:"201",vistas:"5842",categoria:"Sonido",visibilidad:"publico",etiquetas:"musica,reggaeton,Dj"},
// {imagen:"Img/subastas/4.png",id:"957521",likes:"112",vistas:"8542",categoria:"Ropa",visibilidad:"publico",etiquetas:"segunda,roto,trapos"},
// {imagen:"Img/subastas/5.png",id:"965458",likes:"845",vistas:"1245",categoria:"Tecnologia",visibilidad:"privado",etiquetas:"pc,gamer,teclado"},
// {imagen:"Img/subastas/6.png",id:"123",likes:"2",vistas:"678",categoria:"Belleza",visibilidad:"privado",etiquetas:"usado, antiguo"},
// {imagen:"Img/subastas/7.png",id:"124",likes:"23",vistas:"546",categoria:"Juguetes",visibilidad:"publico",etiquetas:"nuevo, personalizado"},
// {imagen:"Img/subastas/8.png",id:"125",likes:"77",vistas:"323",categoria:"Ropa",visibilidad:"publico",etiquetas:""},
// {imagen:"Img/subastas/9.png",id:"126",likes:"88",vistas:"325",categoria:"Bebes",visibilidad:"publico",etiquetas:"usado"},
// {imagen:"Img/subastas/10.png",id:"126",likes:"88",vistas:"325",categoria:"Bebes",visibilidad:"publico",etiquetas:"usado"}
]
const categoria=["Ropa","Utensilios","Juguetes","Tecnología","Vehículos","Deportes","Electrodomésticos","Belleza","Papelería","Bebes","Moda","Videojuegos","Hogar","Otros"]
const empaquetador=document.querySelector(".ContenidoSubastas");

function epocaIndustrial(){
    for(let i=0;i<0;i++){
    const producto= {};
    const posicion=Math.floor((Math.random()*categoria.length));
    const categoria1= `${categoria[posicion]}`;
    producto.imagen=`Img/subastas/${Math.floor((Math.random()*11)+1)}.png`
    producto.id=`${Math.floor((Math.random()*9000))}`;
    producto.likes=Math.floor((Math.random()*999)+1);
    producto.vistas=Math.floor((Math.random()*9999)+1);
    producto.categoria=categoria1;
    producto.visibilidad="Público";
    producto.etiquetas="musica,reggaeton,Dj";
    productos.push(producto); 
    }
}

function producirProductos(){
    epocaIndustrial()
    productos.forEach(e => {
        empaquetador.innerHTML+=`<article class="contenedor">
        <div class="imagenContainer">
            <img src="${e.imagen}" class="imagenPublicacion">
        </div>
        <div class="infoProducto">
            <div class="infoPublicacion">
                <p class="NombreUsuario">Sub<span class="idPublicacion">#${e.id}</span></p>
                <p class="parrafoLikes"><i class='bx bx-heart' style='color:#f9f9f9'  ></i><span class="CantidadLikes">${e.likes}</span><span>Likes</span></p>
                <p class="parrafoVistas"> <span class="material-symbols-outlined">visibility</span><span class="CantidadVistas">${e.vistas}</span><span>Vistas</span></p>
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
                    <button class="participar">Participar</button>
                </div>
            </div>
        </div>
    </article>`
    }); 
}
producirProductos();


const enviar= document.querySelector(".buttonNat");
enviar.addEventListener("click",function(){
    const nuevoproducto=[];
    const tytle = document.querySelector(".tytleNat").value;
    const categoria = document.getElementById("cate").value;
    const visibilidad = document.querySelector("#cate1").value;
    if(tytle==""){
        mostrarAlertaRechazo("Llene el campo de titulo");
    }else{
        const producto= {};
        producto.imagen=`Img/subastas/${Math.floor((Math.random()*11)+1)}.png`
        producto.id=tytle;
        producto.likes=Math.floor((Math.random()*999)+1);
        producto.vistas=Math.floor((Math.random()*9999)+1);
        producto.categoria=categoria;
        producto.visibilidad=visibilidad;
        producto.etiquetas="musica,reggaeton,Dj";
        nuevoproducto.push(producto);
        nuevoproducto.forEach(e => {
            empaquetador.innerHTML+=`<article class="contenedor">
            <div class="imagenContainer">
                <img src="${e.imagen}" class="imagenPublicacion">
            </div>
            <div class="infoProducto">
                <div class="infoPublicacion">
                    <p class="NombreUsuario"><span class="idPublicacion">${e.id}</span></p>
                    <p class="parrafoLikes"><i class='bx bx-heart' style='color:#f9f9f9'  ></i><span class="CantidadLikes">${e.likes}</span><span>Likes</span></p>
                    <p class="parrafoVistas"> <span class="material-symbols-outlined">visibility</span><span class="CantidadVistas">${e.vistas}</span><span>Vistas</span></p>
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
                        <button class="participar">Participar</button>
                    </div>
                </div>
            </div>
        </article>`
        });
        document.querySelector(".tytleNat").value=""
    }
}) 

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
