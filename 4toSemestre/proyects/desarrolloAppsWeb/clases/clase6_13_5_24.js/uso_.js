/*fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(request=>request.json())
    .then(data=>{
        let user = {
            name:data.name,
            email:data.email
        }
        guardarLocalStorage(user)
    })

const guardarLocalStorage = (data)=> {
    localStorage.setItem('user',JSON.stringify(data))
} 
//permite guardar en localStorage, donde se especifica una clave, 
luego se realiza un proceso de conversion
ya q se le pasa un objeto y tiene que ser pasado a string.//

const obtenerLocalStorage =()=>{
    const response = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : "no hay data" 
    console.log(response)
}

obtenerLocalStorage()*/
//--------------------------------------MODULOS------------------------------
const conecctionMongoDB = require('./libs/connection.js')
console.log(conecctionMongoDB(true));
