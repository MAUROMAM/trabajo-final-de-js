let carrito = []
let total = []

let obj = {
    tipo: ""
}
const cardContainer = document.querySelector('#cardContainer')
const render = (productos) => {
    cardContainer.innerHTML = ""
    productos.forEach((producto) => {
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `
        <h3 class="cardTitle">  ${producto.nombre} </h3>
        <img src="${producto.imgSrc}" class="cardImg">
        <p class="cardDesc"> ${producto.detalle} </p>
        <div class="line"> 
        <span class="cardPrice"> $${producto.precio} </span>
        <button id="${producto.id}" class="buttonCTA"> Agregar al Carrito </button>
        `
        cardContainer.append(card)
    })
    const buttonCTA = document.querySelectorAll('.buttonCTA')

    buttonCTA.forEach(elm => {
        elm.addEventListener('click', (e) => {
            let id = e.target.id
            buscarProducto(id, productos)
        })
    })
}
const cartContainer = document.querySelector('#containerCarrito')
const buscarProducto = (id, productos) => {
    let busqueda = productos.find(producto => producto.id == id)
    obj.tipo = "suma"
    crearCarro(busqueda)
    carritoTotal(busqueda)
}

const crearCarro = (busqueda) => {
    carrito.push(busqueda)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Agregaste un producto a tu carrito'
    })
    localStorage.setItem('carrito', JSON.stringify(carrito))
    plantilla(carrito)
}

const plantilla = (carrito) => {
    cartContainer.innerHTML = ""
    carrito.forEach(elm => {
        cartContainer.innerHTML += `
        <tr>
            <th>${elm.nombre}</th>
            <th>${elm.precio}</th>
            <th id="${elm.id}" class="deleted">X</th>
        </tr>
        `
    })
}
const modal = document.getElementById("myModal")
const btn = document.getElementById("myBtn")
const span = document.getElementsByClassName("cerrar")[0]


const vaciarCarrito = document.querySelector('#vaciarCarrito')
const totalPantalla = document.querySelector('#total')
vaciarCarrito.addEventListener('click', () => {
    cartContainer.innerHTML = ""
    totalPantalla.innerHTML = ""
    carrito = []
    total = []
    localStorage.removeItem('carrito')
})

const carritoTotal = (busqueda) => {
    if (obj.tipo == "suma") {
        total.push(parseInt(busqueda.precio))
        let resultadoTotal = total.reduce((a, b) => a + b, 0)
        totalPantalla.innerHTML = `
        <p>Total:$  ${resultadoTotal}</p>
        `
    } else {
        total.push(parseInt(-busqueda.precio))
        let resultadoTotal = total.reduce((a, b) => a + b, 0)
        totalPantalla.innerHTML = `
        <p>Total:$  ${resultadoTotal}</p>
        `
    }
}
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    plantilla(carrito)
}
//BARRA DE BUSQUEDA

const searchBar = document.querySelector('#searchBar')
const searchButton = document.querySelector('#searchButton')

let arrayBusqueda = []
const searchBarProductos = (productos) => {
    searchButton.addEventListener('click', (e) => {
        const searchQuery = searchBar.value.toLowerCase()
        productos.map((elm) => {
            let nombres = elm.nombre.toLowerCase()

            let busquedaFiltro = nombres.indexOf(searchQuery)
            // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
            if (busquedaFiltro !== -1) {
                arrayBusqueda.push(elm)
                render(arrayBusqueda)
            }
        })
    })

}
searchButton.addEventListener('click', searchBarProductos)


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleted')) {
        let id = e.target.id
        let item = carrito.find((prod) => prod.id == id)
        let indice = carrito.indexOf(item)
        carrito.splice(indice, 1)
        obj.tipo = ""
        console.log(item)
        e.composedPath()[1].remove()
        carritoTotal(item)

    }
})