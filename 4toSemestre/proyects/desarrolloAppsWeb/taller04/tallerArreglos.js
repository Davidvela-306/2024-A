// Creación del arreglo
const product = [
  {
    name: "Kolog_silicon_case",
    brand: "Generic",
    color: "Korok1",
    information: {
      dimension: "3.27 inches",
      weight: "1.06 ounces",
      serials: {
        asin: "B0CLCDR33Z",
        model: "3C-AC-0730018-APPro-Korok",
      },
    },
  },
  24.84,
  "Funda para AirPods: específicamente animé de dibujos animados Korok diseñado para tu funda de carga Airpods Pro/Pro 2. ",
];

// Accediendo a los elementeos
console.log("Nombre del producto: " + product[0].brand);
console.log("Descripción: " + product[2]);
console.log("Modelo: " + product[0].information.serials.model);

//Destructuración
const [ObjInformacion, price, description] = product;
console.log(
  `DESTRUCTURACIÓN:\nbrand:${ObjInformacion}\nPrice:${price}\nInformation:${description}`
);

product.length < 5
  ? console.log("El array es corto")
  : console.log("El array es largo");

//Primera forma de iterar un arreglo
for (let index = 0; index < product.length; index++) {
  const element = product[index];
  console.log("\n" + element + "\n");
}
//Segunda forma de iterar con el
//método forEach
product.forEach((i) => console.log(i));

//Tercera forma de iterar
//Método map (No modifica el arr) los valores se pueden guardar
const newArr = product.map(i=>i+"map")
console.log('\nArr con map: '+newArr);

//Métodos para arrays
//push() agrega elemento al final del arr
product.push(14)
//unshift() agrega elemento al inicio del arr
product.unshift("inicio")

//pop() elimina un elemento del final del arr
product.pop()

//shift() elimina un elemento al inicio del arr
product.shift()

//slice()  es una copia sombra del arr
const copyArr = product.slice()
console.log("CopyArr\n"+copyArr);

//Array.isArray() Determina si es un array
Array.isArray(copyArr)
//.length Tamaño del array
console.log('Arr product: \n');
product.forEach((i) => console.log(i));

//Rest operator
const [objeto,...rest] = product
console.log('***********************');

console.log(objeto)
console.log(rest)

//Spread operator
const ArrProduct_newArr = [...product, ...newArr];
console.log("\nArrProduct_newArr:\n"+ArrProduct_newArr)



