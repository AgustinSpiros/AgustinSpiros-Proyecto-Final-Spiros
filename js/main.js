
const stockProductos =[{

    id: 1, 
    nombre: "Shivak Simple",
    cantidad: 1,
    precio: 1410,
    desc: "Medallon de 140 gr, cheddar x2, bacon x2", 
    img: "images/1x/simple.png"

},

{
    id: 2, 
    nombre: "Shivak Doble",
    cantidad: 1,
    precio: 1710,
    desc: "Doble Medallon de 140 gr, cheddar x4, bacon x2", 
    img: "images/1x/doble.png"

},

{
    id: 3, 
    nombre: "Shivak Triple",
    cantidad: 1,
    precio: 1890,
    desc: "triple Medallon de 140 gr, cheddar x6, bacon x2", 
    img: "images/1x/triple.png"
},

{
    id: 4, 
    nombre: "Joker",
    cantidad: 1,
    precio: 1710,
    desc: "Doble Medallon de 140 gr, cheddar x4, jetchup, mostaza, cebolla en cubitos", 
    img: "images/1x/joker.png"
},

{
    id: 5, 
    nombre: "Crispy",
    cantidad: 1,
    precio: 1710,
    desc: "Doble Medallon de 140 gr, Cheddar, Bacon, Cebolla crispy, Alioli", 
    img: "images/1x/crispy.png"
},

{
    id: 6, 
    nombre: "Onion",
    cantidad: 1,
    precio: 1710,
    desc: "Doble Medallon de 140 gr, Cheddar, Bacon, Cebolla Caramelizada, Barbacoa ", 
    img: "images/1x/onion.png"
}, 

{
    id: 7,  
    nombre: "Smith",
    cantidad: 1,
    precio: 1690,
    desc: "Doble Medallon de 140 gr, Lechuga, Tomate, Pepinillos, Salsa Blends", 
    img: "images/1x/smith.png"
},

{
    id: 8, 
    nombre: "Smoked Bacon",
    cantidad: 1,
    precio: 1820,
    desc: "doble medallonn, cheddar, Bacon glaseado, Huevo, Mostaza de Dijon, Barbacoa ", 
    img: "images/1x/smoked.png"
},


{
    id: 9, 
    nombre: "Papas Fritas",
    cantidad: 1,
    precio: 900,
    desc: "Porcion de papas Fritas ", 
    img: "images/papasfritas.png"
},

{
    id: 10, 
    nombre: "Papas Fritas Cheddar y Bacon ",
    cantidad: 1,
    precio: 1100,
    desc: "Porcion de papas Fritas con Cheddar y Bacon  ", 
    img: "images/papasfcyb.png"
},

{
    id: 11, 
    nombre: "Nuggets de Pollo x10 ",
    cantidad: 1,
    precio: 1200,
    desc: "10 Unidades de nuggets de pollo ", 
    img: "images/nugg.png"
},

{
    id: 12, 
    nombre: "Aros de cebolla",
    cantidad: 1,
    precio: 1200,
    desc: "12 unidades de Aros de Cebolla ", 
    img: "images/arosdecebo.png"
},

]




let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
    formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
        carrito.length = [];
        mostrarCarrito();
    });
}

if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "¡Tu carrito está vacio!",
                text: "Compra algo para continuar con la compra",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } else {
            location.href = "compra.html";
        }
    });
}

stockProductos.forEach((prod) => {
    const {
        id,
        nombre,
        precio,
        desc,
        img,
        cantidad
    } = prod;
    if (contenedor) {
        contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Precio: ${precio}</p>
    <p class="card-text">Descripcion: ${desc}</p>
    <p class="card-text">Cantidad: ${cantidad}</p>
    <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
    </div>
    `;
    }
});

const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === id)
        carrito.push(item)
    }
    mostrarCarrito()

};

const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
        modalBody.innerHTML = "";
        carrito.forEach((prod) => {
            const {
                id,
                nombre,
                precio,
                desc,
                img,
                cantidad
            } = prod;
            console.log(modalBody);
            modalBody.innerHTML += `
    <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
    <p>Precio: ${precio}</p>
    <p>Cantidad :${cantidad}</p>
    <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
    </div>
    

    `;
        });
    }

    if (carrito.length === 0) {
        console.log("Nada");
        modalBody.innerHTML = ` 
        <p class="text-center text-primary parrafo"> ¡Aun no agregaste nada!</p>
        `;
    } else {
        console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;

    if (precioTotal) {
        precioTotal.innerText = carrito.reduce(
            (acc, prod) => acc + prod.cantidad * prod.precio,
            0
        );
    }

    guardarStorage();
};

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
}

function procesarPedido() {
    carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody");
        const {
            id,
            nombre,
            precio,
            img,
            cantidad
        } = prod;
        if (listaCompra) {
            const row = document.createElement("tr");
            row.innerHTML += `
            <td>
            <img class="img-fluid img-carrito" src="${img}"/>
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
            listaCompra.appendChild(row);
        }
    });
    totalProceso.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
    );
}

function enviarCompra(e) {
    e.preventDefault()
    const cliente = document.querySelector('#cliente').value
    const email = document.querySelector('#correo').value

    if (email === '' || cliente == '') {
        Swal.fire({
            title: "¡Completa tu nombre y telefono!",
            text: "Rellena el formulario",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
    } else {

        const btn = document.getElementById('button');



        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_qxwi0jn';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Finalizar compra';
                
            }, (err) => {
                btn.value = 'Finalizar compra';
                alert(JSON.stringify(err));
            });

        const spinner = document.querySelector('#spinner')
        spinner.classList.add('d-flex')
        spinner.classList.remove('d-none')

        setTimeout(() => {
            spinner.classList.remove('d-flex')
            spinner.classList.add('d-none')
            formulario.reset()

            const alertExito = document.createElement('p')
            alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
            alertExito.textContent = 'Compra realizada correctamente'
            formulario.appendChild(alertExito)

            setTimeout(() => {
                alertExito.remove()
            }, 3000)


        }, 3000)
    }
    localStorage.clear()

}