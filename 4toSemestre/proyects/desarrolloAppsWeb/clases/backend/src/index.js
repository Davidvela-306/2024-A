//Creación de un web server en express
const express = require('express')
const {engine} = require('express-handlebars')
//instancia
const app = express()

//! Routes
//creación de rutas en express
app.get('/', (req, res) => res.send('hola') )

app.get('/dashboard', (req, res) => res.send('Bienvenido al dashboard') )
//método use es un middleware en express

//! Request 
app.use(express.json()) //Todas las peticiones se manejan en formato json

//*body
app.post('/register',(req, res)=>{
    const {email, password} = req.body //por medio de body el usuario ingresa datos
    res.send(`Los datos enviados son ${email}, ${password}`)
})

//*params
app.get('/comunidad/:convenios', (req, res)=>{
    console.log('req.params: ',req.params);
    res.send(`Listado de convenios ${req.params.convenios}`)
})

app.get('/comunidad/:convenios/:id', (req, res)=>{
    const {convenios, id} = req.params
    res.send(`req.params.id: ${id}`)
    res.send(`req.params.convenios: ${convenios}`)
})

//* Query params
app.get('/search', (req, res)=>{
    console.log('req.query',req.query); 
    req.query.searchWord==="pasantias"?res.send(req.query.searchWord):res.send("NO existen registros")
    
})


//!Response
app.get('/hamburguesa/simple', (req,res)=>{
    res.send('Haburguesa simple enviada') //TODO Texto
})

const path = require('path');

app.get('/hamburguesa/doble', (req, res) => {
    console.log(__dirname); // Para verificar la ruta
    res.sendFile(path.join(__dirname, '..', 'images', 'h2.jpeg')); //TODO Archivo Img
    // res.sendFile("C:\\Users\\ASUS\\Documents\\4toSemestre\\proyects\\desarrolloAppsWeb\\clases\\backend\\images\\h2.jpeg");
});

app.get('/hamburguesa/triple', (req, res) => {
    console.log(__dirname); // Para verificar la ruta
    res.sendFile('./triple.docx',{ //en root, el doc triple.docx
        root:__dirname //dir actual
    }); //TODO Archivo word 
});

app.get('/hamburguesa/mixta', (req, res) =>{
    res.status(200).json({
        "tipo": "mixta",
        "entregada": "Joe"
    }) //TODO Archivo formato json
})

//!Uso de handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/hamburguesa/vegana', (req,res)=>{
    res.render('home') //qué pág quiero renderizar usando el motor de plantilla handlebars
})
app.get('/hamburguesa/vegana-price', (req,res)=>{
    res.render('price') //qué pág quiero renderizar usando el motor de plantilla handlebars
})


app.use((req, res)=> res.status(404).send('404, página no encontrada'))
app.listen(3100)

console.log('El server se ejecuta en el puerto 3100');
