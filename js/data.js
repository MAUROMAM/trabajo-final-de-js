// MODELO DE CARDS
let array = []

class item {
    constructor({id, nombre, imgSrc,detalle, precio}) {
        this.id = id
        this.nombre = nombre
        this.imgSrc = imgSrc 
        this.detalle = detalle
        this.precio = precio
    }
}


// traer datos
fetch("./js/data/data.json")
    .then(response => response.json())
    .then(data => {
        getData(data)
    })

function getData(data) {
    data.forEach(elm => {
        array.push(new item(elm))
        // esto se ejecuta 3 veces
        })
        // aca una sola vez
        render(array)
        searchBarProductos(array)
}




