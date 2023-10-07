const links=document.querySelector(".linksNavBar");
const burger=document.querySelector(".burgerMenu")
const profileList=document.querySelector(".profileList");
const profileImg=document.querySelector(".profileImg");


burger.addEventListener("click",()=>{
    console.log("ola");
    links.classList.toggle("linksNavBar_visible");
})
profileImg.addEventListener("click",()=>{
    console.log("ke ase");
    profileList.classList.toggle("profileConfig_visible");
})