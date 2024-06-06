//--------------------------------------MODULOS------------------------------
/*const conecctionMongoDB = require('./libs/connection.js')
console.log(conecctionMongoDB(true));*/

/*exportacion nombrada 
const {conecctionMongoDB,LIKES} = require('./libs/connection.js')
console.log(conecctionMongoDB(true));
console.log("la api tiene", LIKES,"Likes");*/

//-----------------------------------------------------------------------

//Expportacion - default 
//import moduleName from "./libs/connection.js"
//eportacion nombrada
import {conecctionMongoDB, LIKES} from "./libs/connection.js";
console.log(conecctionMongoDB(true));
console.log("la api tiene", LIKES,"Likes");
