//Creacion del objeto
const product = {
    name: "Kolog_silicon_case",
    brand: "Generic",
    color: "Korok1",
    information: {
        dimension: "3.27 inches",
        weight: "1.06 ounces",
        serials: {
            asin: "B0CLCDR33Z",
            model: "3C-AC-0730018-APPro-Korok"
        }
    }
}

//Acceso y destructuracion de objetos
const { name, brand, color, information: { serials } } = product;
console.log(name, brand, color, serials);

//impresion del objeto completo
console.log(product)

//eliminar un par de clave y valor
delete product.color
console.log(product)

//congelar el objeto, me da un valor booleano true al aplicar los cambios
/*Object.freeze(product)
console.log(Object.isFrozen(product))
product.image="https://m.media-amazon.com/images/I/61U1gp-BV7L._AC_SL1500_.jpg"*/


//Usando seal, no agrega ni elimina pero realzia cambios dentro del objeto
Object.seal(product)
console.log(Object.isSealed(product))
product.brand="Apple"
console.log(product)

//copiar objetos
const producto = {
    nombre:"Zelda case",
    color1:"Kolog2"
}

const informacion = {
    dimensiones:"2.75 inch",
    peso:'0.05 pounds'
}

const todo = {...producto,...informacion}
console.log(todo)

//Usando this, para hacer referencia al contexto del objeto
const amazon = {
    nombre:"Zelda case",
    color1:"Kolog2",
    colors:["k2","k3","k4"],
    colorListo: ()=>{
        return `color listo ${this.colors[2]}`
    }
}

console.log(amazon.colorListo)

//obteniendo claves
console.log("Obtener las claves: ", Object.keys(amazon))
//obteniendo valores
console.log("Obtener los valores: ", Object.values(amazon))
//obteniendo claves y valores en un arreglo
console.log("Obtener las claves y valores en un arreglo: ", Object.entries(amazon))

//abreviando nombres para la creacion del objeto
const nom="case"
const price="11.99"

const newProduct = {
    nom,
    price
}

console.log(newProduct)

/****************************************** 
    ARREGLOS
*/