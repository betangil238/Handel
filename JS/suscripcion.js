import KEYS from "../JS/keys.js"

// <!------------------------------------------------------ INICIO SECCION MAIN ------------------------------------------->
const user= JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href="login.html"  
}
// ******* CONEXION CON EL MARKET PLACE *****************************************

const d =document;
const ecomerce=d.getElementById("E-comerce");
const tarjeta = d.getElementById("tarjeta").content;
const fragment=d.createDocumentFragment();
const options = { headers : {Authorization: `Bearer ${KEYS.secret}`}}
const FormatoMoneda = num => `${num.slice(0,-5)}`


let products, price;
// Realiza dos solicitudes de API en paralelo y procesa los resultados
Promise.all([
    fetch("https://api.stripe.com/v1/products",options),
    fetch("https://api.stripe.com/v1/prices",options)
])
.then(responses =>Promise.all(responses.map(res => res.json())))
.then(json => {
    // Almacena los datos de productos y precios en las variables 'products' y 'price'
    products = json[0].data;
    price=json[1].data;
     // Itera sobre los precios y crea tarjetas de producto para mostrar en la página
    price.forEach(el => {
        let productDta = products.filter(product => product.id === el.product);
        tarjeta.querySelector(".buy").setAttribute("data-price",el.id);
        tarjeta.querySelector("img").src=productDta[0].images[0];
        tarjeta.querySelector("img").alt=productDta[0].name;
        tarjeta.querySelector(".descriptionecomerce").innerHTML=`${productDta[0].name}`;
        tarjeta.querySelector(".priceecomerce").innerHTML=`${FormatoMoneda(el.unit_amount_decimal)}${"K"}`;
        let clone =d.importNode(tarjeta,true);
        fragment.appendChild(clone);
    });
    ecomerce.appendChild(fragment)
})
.catch(error => {
      // Manejo de errores en caso de fallas en las solicitudes
    let message = error.statuText || "ocurrio un error en la peticion";
    ecomerce.innerHTML = `Error: ${error.status}: ${message}`
})

// Agrega un manejador de eventos click al documento
d.addEventListener("click", e=>{
    if (e.target.matches(".incrementShop, .incrementIcon")) {
        if (e.target.classList.contains('bx') || e.target.classList.contains('bxs')) {
            color(e.target); // Llama a la función color() y pasa el ícono como argumento
        }
    } else if (e.target.matches(".E-comerce *") ) {
         // Realiza una acción relacionada con la compra del producto
        let priceId = e.target.parentElement.getAttribute("data-price");
        Stripe(KEYS.public).redirectToCheckout({
            lineItems: [{
                price: priceId,
                quantity: 1
            }],
            mode:"payment",
            successUrl:"https://betangil238.github.io/Handel/success.html",
            cancelUrl:"https://betangil238.github.io/Handel/cancel.html"
        })
        .then(res => {
            if (res.error){
                ecomerce.insertAdjacentElement("afterend", res.error.message)
            }
        })
    }
})

// funcion que cambia de color el corazon al darle click
function color(icon) {
    // Obtener la clase actual del icono
    var claseActual = icon.classList;

    // Verificar la clase actual y cambiarla
    if (claseActual.contains('bx-heart')) {
        icon.classList.remove('bx-heart');
        icon.classList.add('bxs-heart');
        icon.style.color = "red";
    } else if (claseActual.contains('bxs-heart')) {
        icon.classList.remove('bxs-heart');
        icon.classList.add('bx-heart');
        icon.style.color = "white";
    }
}


