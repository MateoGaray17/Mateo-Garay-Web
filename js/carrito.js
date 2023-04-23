let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

/*ELEMENTOS LLAMADOS DEL DOM*/

const main = document.querySelector("#main");
const contendorCarrito = document.querySelector("#contenedor-carrito");
const tituloCarrito = document.querySelector("#titulo-carrito");
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const header = document.querySelector("#header");

// WIZARD

const wizard = document.querySelector("#wizard");
const grande = document.querySelector(".grande");
const punto = document.querySelectorAll(".punto");
const botonCancelar = document.querySelector("#boton-cancelar");
const botonCancelar2 = document.querySelector("#boton-cancelar-2");
const botonSiguiente = document.querySelector("#boton-siguiente");
const botonAtras = document.querySelector("#boton-atras");

function cargarproductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0){
    
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");   
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
    
                `;
    
            contenedorCarritoProductos.append(div);
    
        })
    
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");   
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");   
    }
    
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarproductosCarrito();

function actualizarBotonesEliminar() {
    let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
     
    productosEnCarrito.splice(index, 1);
    cargarproductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarproductosCarrito();
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}



//-------------------------------------------------------------Wizard ------------------------------------------




botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    tituloCarrito.classList.add("disabled");
    
    contendorCarrito.classList.add("disabled");
    
    main.classList.add("padding0");
    wizard.classList.remove("disabled");
    
    header.classList.add("blur");
    header.classList.add("index");
    header.classList.add("fixed");
    contenedorCarritoAcciones.classList.add("disabled");
}


function cancelar() {
    wizard.classList.add("disabled");
    contendorCarrito.classList.remove("disabled");
    tituloCarrito.classList.remove("disabled");
    
    header.classList.remove("blur");
    header.classList.remove("index");
    header.classList.remove("fixed");
    main.classList.remove("padding0");
}

botonCancelar.addEventListener("click", cancelar);
botonCancelar2.addEventListener("click", cancelar);



botonSiguiente.addEventListener("click", ()=>{
    
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const celular = document.querySelector("#celular").value;
    const email = document.querySelector("#email").value;

    if (nombre === "" || apellido === "" || celular === "" || email === "") {
        
        const alertaFormulario = document.querySelector("#alerta-formulario");
        alertaFormulario.classList.remove("disabled");

        setTimeout(() => {
            alertaFormulario.classList.add("disabled");   
        }, 3000);

    } else {
        grande.style.transform = `translateX(-50%)`;
        botonAtras.classList.remove("activo");
        botonSiguiente.classList.add("activo");
    }
});

botonAtras.addEventListener("click", ()=>{
    grande.style.transform = `translateX(0%)`;
    botonAtras.classList.add("activo");
    botonSiguiente.classList.remove("activo");

});



const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
   event.preventDefault();

   const textoCompra = document.querySelector("#texto-compra");
   const spinner = document.querySelector("#spinner");
   const serviceID = 'default_service';
   const templateID = 'template_qpml0ck';

   botonCancelar2.classList.add("disabled");
   botonAtras.classList.add("disabled");
   botonSiguiente.classList.add("disabled");
   btn.value = 'COMPRANDO';
    textoCompra.classList.add("disabled");
    spinner.classList.remove("disabled");

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => { 

        setTimeout(() => {
            spinner.classList.remove("disabled");
            wizard.classList.add("disabled");
            header.classList.remove("blur");
            header.classList.remove("index");
            header.classList.remove("fixed");
            main.classList.remove("padding0");
            contendorCarrito.classList.remove("disabled");
            vaciarCarrito();
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");
        }, 2000);
        
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});