const contenedorProductos = document.querySelector("#contenedorProductos");
const verCarrito = document.querySelector("#carritoProducto");
const modalContainer = document.querySelector("#modal-container");
const cantadorCarrito = document.querySelector("#cantadorCarrito");


//carrito
let carrito = JSON.parse(localStorage.getItem("productoCarrito")) || [];

// Funcion para aprecer las tarjetas (productos) y tambien con la funcion de fetch y usando el async, await

const InfoProductos = async () => {
    const response = await fetch("productos.json");
    const data = await response.json();
    
        data.forEach(tarjeta => {
            //tarjeta de los productos
            const div = document.createElement("div");
            div.classList.add("producto")
            div.innerHTML = `
                <img class="producto-img img-fluid" src="${tarjeta.imagen}" >
                <div class="productos-datos">
                    <h3 class="producto-titulo">${tarjeta.titulo}</h3>
                    <p class ="descripcionTarjetas">${tarjeta.descripcion} </p>
                    <p class="producto-precio">$${tarjeta.precio}</p>
                    
                </div>
            `
            contenedorProductos.append(div);
            //boton de compra de la tarjeta 
            let comprar = document.createElement("button");
            comprar.innerText = "Comprar";
            comprar.classList.add("producto-agregar");
    
            div.append(comprar);
    
            //agregar producto al carrito apretando el boton de compra de la tarjeta y puede aumentar el producto en el modal de compras  
            comprar.addEventListener("click", () => {
    
                Toastify({
                    text: "Se agreado el producto al carrito",
                    className: "info",
                    position: "right",
                    style: {
                        background: "red",
                        color: "white"
                    }
                }).showToast();
    
                const repeat = carrito.some((repeatProducto) => repeatProducto.id === tarjeta.id);
    
                if (repeat) {
                    carrito.map((product) => {
                        if (product.id === tarjeta.id) {
                            product.cantidad++;
                        }
                    });
    
                } else {
                    carrito.push({
                        id: tarjeta.id,
                        titulo: tarjeta.titulo,
                        imagen: tarjeta.imagen,
                        precio: tarjeta.precio,
                        cantidad: tarjeta.cantidad,
                    });
                }
                console.log(carrito);
                sumaDeCarritoLogo();
                saveStorage();
            }) 
        });
};

InfoProductos()


//local srtorage

let storageSave = () =>{
    localStorage.setItem("productoCarrito", JSON.stringify(carrito));
}




//modal   
const pintarCarrito = () => {
     //para que NO se multiplique el modal
     modalContainer.innerHTML = ""

     //para poder ver el modal sin interupcion del display none
     modalContainer.style.display = "flex"
 
     //modal header
     const modalHeader = document.createElement("div");
     modalHeader.className = "modal-header";
     modalHeader.innerHTML = `
         <h1 class="modal-header-title"> Snikers por comprar </h1>
     
     `
 
     modalContainer.append(modalHeader);
 
 
     //boton de Modalheader para salir del carrito
 
     const modalButton = document.createElement("h2");
     modalButton.innerText = "Salir del carrito";
     modalButton.className = "modal-button";
 
     //funcion para poder cerrar el modal
     modalButton.addEventListener("click", () => {
         modalContainer.style.display = "none";
     })
 
     modalHeader.append(modalButton);
 
     //cuerpo del modal 
     carrito.forEach((tarjeta) => {
         let modalCuerpo = document.createElement("div");
         modalCuerpo.className = "modal-contenido";
         modalCuerpo.innerHTML = `
             <img src="${tarjeta.imagen}">
             <h3> ${tarjeta.titulo} </h3>
             <p> ${tarjeta.precio} $</p>

            
         `
         modalContainer.append(modalCuerpo);

        

        // para eliminar los productos
         let eliminar = document.createElement("span");
         eliminar.innerHTML = `<i class="bi bi-trash"></i>`
         eliminar.className = "eliminar-btn"

         modalCuerpo.append(eliminar);

         eliminar.addEventListener("click", eliminarProducto);
     });
     
 
     // Para sumar los productos 
     const total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento , 0);
 
     //modal footer
     const modalFooter = document.createElement("div");
     modalFooter.className = "modal-footer"; 
     modalFooter.innerHTML = `Total a Pagar: ${total}`;
 
     modalContainer.append(modalFooter);
};
   

verCarrito.addEventListener("click", pintarCarrito)


//fuction para eliminar los productos del modal

const eliminarProducto = () =>{
     const foundId = carrito.find((tarjeta) => tarjeta.id);

     carrito = carrito.filter((carritoId) =>{
        return carritoId !== foundId
     });
     contadorDeCarrito()
     pintarCarrito()
     storageSave()
};


//fuction para aparecer el contador del carrito con el length
const contadorDeCarrito = () =>{
    cantadorCarrito.style.display = "block";

   const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    
    cantadorCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};


contadorDeCarrito();