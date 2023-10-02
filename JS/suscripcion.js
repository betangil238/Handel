import KEYS from "../JS/keys.js"
/* inicio encabezado------------------------------------------------------------*/ 
let arreglo=[];
let carritoVisible = false;

function openCar() {
    let total_global = 0;
    
    const tabla = document.getElementById("tabla");
    const tablaBody = document.querySelector("#tabla tbody");
    if (!carritoVisible) {
        tablaBody.innerHTML = "";
        for (let i = 0; i < arreglo.length; i++) {
            const precioProducto =   arreglo[i].precio;
            const cantidadProducto = arreglo[i].cantidad;
            const nombreProductor =  arreglo[i].Producto;
            const total = parseFloat(precioProducto) * parseFloat(cantidadProducto);
            total_global = total_global + total;
            const row = document.createElement("tr");
            const imgCell = document.createElement("td");
            const nombreCell = document.createElement("td");
            const precioCell = document.createElement("td");
            const cantidadCell = document.createElement("td");
            const totalCell = document.createElement("td");
            nombreCell.textContent = nombreProductor;
            precioCell.textContent = "$ "+precioProducto;
            cantidadCell.textContent = cantidadProducto;
            totalCell.textContent = "$ "+total;
            row.appendChild(nombreCell);
            row.appendChild(precioCell);
            row.appendChild(cantidadCell);
            row.appendChild(totalCell);
            tablaBody.appendChild(row);
            tabla.style.display = 'table';
            carritoVisible = true;

        }
        const row=document.createElement("tr");
        const nombreTotal =document.createElement("td");
        const totalCell =document.createElement("td");
        nombreTotal.setAttribute("colspan", "3");
        nombreTotal.textContent="TOTAL";
        totalCell.textContent="$"+total_global;
        row.appendChild(nombreTotal);
        row.appendChild(totalCell);
        tablaBody.appendChild(row);
    } else {
        tabla.style.display = 'none';
        carritoVisible = false;
    }
    
}


// <!------------------------------------------------------ INICIO SECCION MAIN ------------------------------------------->

function agregarProducto(producto){
    const cantidadProduct=document.getElementById("cantidad");
    const tabla = document.getElementById("tabla");
    tabla.style.display = 'none';
    carritoVisible = false
    if(esta(producto.Producto)){
        switch (producto.Producto) {
            case 'Guillotina':
                producto.cantidad=parseInt(document.getElementById("quantityGuillotina").value);
                arreglo.push(producto);
                break;
            case 'Papiros':
                producto.cantidad=parseInt(document.getElementById("quantityPapiros").value);
                arreglo.push(producto);    
            break;
            case 'Resma':
                producto.cantidad=parseInt(document.getElementById("quantityResma").value);
                arreglo.push(producto);       
            break;
            case 'Origami':
                producto.cantidad=parseInt(document.getElementById("quantityOrigami").value);
                arreglo.push(producto);     
            break;
            case 'Tinta':
                producto.cantidad=parseInt(document.getElementById("quantityTinta").value);
                arreglo.push(producto);     
            break;
            case 'Caballete':
                producto.cantidad=parseInt(document.getElementById("quantityCaballete").value);
                arreglo.push(producto);    
            break;
            case 'Acuarela':
                producto.cantidad=parseInt(document.getElementById("quantityAcuarela").value);
                arreglo.push(producto);      
            break;
            case 'Clip':
                producto.cantidad=parseInt(document.getElementById("quantityClip").value);
                arreglo.push(producto);     
            break;
            case 'Sello':
                producto.cantidad=parseInt(document.getElementById("quantitySello").value);
                arreglo.push(producto);      
            break;
            default:
                break;
        }
    }else{
        let p=indice(producto.Producto);
        switch (producto.Producto) {
            case 'Guillotina':
                arreglo[p].cantidad+=parseInt(document.getElementById("quantityGuillotina").value);
                break;
            case 'Papiros':
                arreglo[p].cantidad+=parseInt(document.getElementById("quantityPapiros").value);    
            break;
            case 'Resma':
                arreglo[p].cantidad+=parseInt(document.getElementById("quantityResma").value);       
            break;
            case 'Origami':
                arreglo[p].cantidad+=parseInt(document.getElementById("quantityOrigami").value);     
            break;
            case 'Tinta':
                arreglo[p].cantidad+=parseInt(document.getElementById("quantityTinta").value);     
            break;
            case 'Caballete':
                arreglo[p].cantidad+=parseInt(document.getElementById("quantityCaballete").value);    
            break;
            case 'Acuarela':
                arreglo[p].cantidad+=parseInt(document.getElementById("quantityAcuarela").value);      
            break;
            case 'Clip':
                arreglo[p].cantidad+=parseInt(document.getElementById("quantityClip").value);     
            break;
            case 'Sello':
                arreglo[p].cantidad+=parseInt(document.getElementById("quantitySello").value);   
            break;
            default:
                break;
        }
    }
    cantidadProduct.textContent=arreglo.length;
}

function esta(producto){
    for (let index = 0; index < arreglo.length; index++) {
        if (String(arreglo[index].Producto)==producto){
            return false;
        }
    }
    return true;
}

function indice(producto){
    for (let index = 0; index < arreglo.length; index++) {
        if (String(arreglo[index].Producto)==producto){
            return index;
        }
    }
}

// ******* CONEXION CON EL MARKET PLACE *****************************************

const d =document;
const ecomerce=d.getElementById("E-comerce");
const tarjeta = d.getElementById("tarjeta").content;
const fragment=d.createDocumentFragment();
const options = { headers : {Authorization: `Bearer ${KEYS.secret}`}}
const FormatoMoneda = num => `${num.slice(0,-5)}`


let products, price;
Promise.all([
    fetch("https://api.stripe.com/v1/products",options),
    fetch("https://api.stripe.com/v1/prices",options)
])
.then(responses =>Promise.all(responses.map(res => res.json())))
.then(json => {
    products = json[0].data;
    price=json[1].data;
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
    let message = error.statuText || "ocurrio un error en la peticion";
    ecomerce.innerHTML = `Error: ${error.status}: ${message}`
})



d.addEventListener("click", e=>{
    if (e.target.matches(".E-comerce *") ) {
        let priceId = e.target.parentElement.getAttribute("data-price");
        Stripe(KEYS.public).redirectToCheckout({
            lineItems: [{
                price: priceId,
                quantity: 1
            }],
            mode:"payment",
            successUrl:"http://127.0.01:5501/success.html",
            cancelUrl:"http://127.0.01:5501/cancel.html"
        })
        .then(res => {
            if (res.error){
                ecomerce.insertAdjacentElement("afterend", res.error.message)
            }
        })
    }
})

// funcion que cambia de color el corazon al darle click
$(document).ready(function() {
    $(".bx").click(function() {
        alert("click")
        // Obtener la clase actual del icono
        var claseActual = $(this).attr("class");

        // Verificar la clase actual y cambiarla
        if (claseActual === 'bx bx-heart') {
            $(this).removeClass('bx bx-heart').addClass('bx bxs-heart');
            this.style.color="red";
        } else {
            $(this).removeClass('bx bxs-heart').addClass('bx bx-heart');
            this.style.color="white";
        }
    });
});


