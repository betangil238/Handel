const links=document.querySelector(".linksNavBar ul");
const ul=links.querySelectorAll("ul");
const list=document.querySelector("#menuBurger")
const burgerMenu=document.querySelector(".burgerMenu")
const profileList=document.querySelector(".profileList");
const profileImg=document.querySelector(".profileImg");
let anchoPantalla = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
console.log(anchoPantalla);

burgerMenu.addEventListener("click",()=>{
    const estilo=window.getComputedStyle(links);
    const estilo1=window.getComputedStyle(profileList);
    if(estilo.display==="none"){
        links.style.display="flex";
        if(estilo1.display==="flex"){
            profileList.style.display="none";
        }
    }else{
        links.style.display="none";
    }
})

profileImg.addEventListener("click",()=>{
    const estilo=window.getComputedStyle(links);
    const estilo1=window.getComputedStyle(profileList);
    if(anchoPantalla > 1255){
        if(estilo1.display==="none"){
            profileList.style.display="flex";
        }else{
            profileList.style.display="none";
        }
    }else{
        if(estilo1.display==="none"){
            profileList.style.display="flex";
            if(estilo.display=="flex"){
                links.style.display="none";
            }
        }else{
            profileList.style.display="none";
        }
    }
    
})

const notificaciones = document.querySelector(".notifications");
const icono = document.querySelector(".notificationIcon");
icono.addEventListener("click",function(){
    const estilo=window.getComputedStyle(notificaciones);
    if(estilo.display==="none"){
        notificaciones.style.display="flex";
    }else{
        notificaciones.style.display="none";
    }
})
