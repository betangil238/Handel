const links=document.querySelector(".linksNavBar ul");
const ul=links.querySelectorAll("ul");
const list=document.querySelector("#menuBurger")
const burgerMenu=document.querySelector(".burgerMenu")
const profileList=document.querySelector(".profileList");
const profileImg=document.querySelector(".profileImg");


burgerMenu.addEventListener("click",()=>{
    
    const estilo=window.getComputedStyle(links);
    if(estilo.display==="none"){
        links.style.display="flex";
    }else{
        links.style.display="none";
    }
    console.log("ola");
    /*links.classList.toggle("linksNavBar_visible");*/
    
    
})

/*function menuburger(){
    console.log("ke ase");
    links.classList.toggle("linksNavBar_visible");
}*/

profileImg.addEventListener("click",()=>{
    console.log("ke ase");
    profileList.classList.toggle("profileConfig_visible");
})