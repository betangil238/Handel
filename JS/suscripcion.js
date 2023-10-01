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



$(document).ready(function() {
    $(".bx").click(function() {
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
