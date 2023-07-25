const productos = [
    /*NIKE */
    {
        id: "Nike-01",
        titulo: "Nike 01",
        imagen: "./imgs/Nike1.jpg",
        categoria: {
            nombre: "Nikes",
            id: "todos"
        },
        precio: 45000
    },
    {
        id: "Nike-02",
        titulo: "Nike 02",
        imagen: "./imgs/Nike2.jpg",
        categoria: {
            nombre: "Nikes",
            id: "Nikes"
        },
        precio: 45000
    },
    {
        id: "Nike-03",
        titulo: "Nike 03",
        imagen: "./imgs/Nike3.jpg",
        categoria: {
            nombre: "Nikes",
            id: "Nikes"
        },
        precio: 34000
    },
    {
        id: "Nike-04",
        titulo: "Nike 04",
        imagen: "./imgs/Nike4.jpg",
        categoria: {
            nombre: "Nikes",
            id: "Nikes"
        },
        precio: 37000
    },

    // ADIDAS
    {
        id: "Adidas-01",
        titulo: "Adidas 01",
        imagen: "./imgs/Adidas1.jpg",
        categoria: {
            nombre: "Adidas",
            id: "Adidas"
        },
        precio: 42000
    },
    {
        id: "Adidas-02",
        titulo: "Adidas 02",
        imagen: "./imgs/Adidas2.jpg",
        categoria: {
            nombre: "Adidas",
            id: "Adidas"
        },
        precio: 46000
    },
    {
        id: "Adidas-03",
        titulo: "Adidas 03",
        imagen: "./imgs/Adidas3.jpg",
        categoria: {
            nombre: "Adidas",
            id: "Adidas"
        },
        precio: 34000
    },
    {
        id: "Adidas-04",
        titulo: "Adidas 04",
        imagen: "./imgs/Adidas4.jpg",
        categoria: {
            nombre: "Adidas",
            id: "Adidas"
        },
        precio: 43000
    },
    // Puma
    {
        id: "Puma-01",
        titulo: "Puma 01",
        imagen: "./imgs/Puma1.jpg",
        categoria: {
            nombre: "Pumas",
            id: "Pumas"
        },
        precio: 54000
    },
    {
        id: "Puma-02",
        titulo: "Puma 02",
        imagen: "./imgs/Puma2.jpg",
        categoria: {
            nombre: "Pumas",
            id: "Pumas"
        },
        precio: 34000
    },{
        id: "Puma-03",
        titulo: "Puma 03",
        imagen: "./imgs/Puma3.jpg",
        categoria: {
            nombre: "Pumas",
            id: "Pumas"
        },
        precio: 67000
    },{
        id: "Puma-04",
        titulo: "Puma 04",
        imagen: "./imgs/Puma4.jpg",
        categoria: {
            nombre: "Pumas",
            id: "Pumas"
        },
        precio: 34000
    },
    //Converse
    {
        id: "Converse-01",
        titulo: "Converse 01",
        imagen: "./imgs/Converse1.jpg",
        categoria: {
            nombre: "Converse",
            id: "Converse"
        },
        precio: 33000
    },
    {
        id: "Converse-02",
        titulo: "Converse 02",
        imagen: "./imgs/Converse2.jpg",
        categoria: {
            nombre: "Converse",
            id: "Converse"
        },
        precio: 55000
    },
    {
        id: "Converse-03",
        titulo: "Converse 03",
        imagen: "./imgs/Converse3.jpg",
        categoria: {
            nombre: "Converse",
            id: "Converse"
        },
        precio: 34000
    },
    {
        id: "Converse-04",
        titulo: "Converse 04",
        imagen: "./imgs/Converse4.jpg",
        categoria: {
            nombre: "Converse",
            id: "Converse"
        },
        precio: 36000
    }
    
];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem' 
          },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

