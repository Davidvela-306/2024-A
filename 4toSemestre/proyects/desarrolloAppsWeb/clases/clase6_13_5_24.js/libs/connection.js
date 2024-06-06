const conecctionMongoDB = (data)=>{
    return data ? "OK" : "Error"
}

/*Expportacion - default primera manera - no permite exportar mas de una cosa a la vez
module.exports = conecctionMongoDB*/

/*exportancion nombrada 
module.exports = {
    conecctionMongoDB,
    LIKES
}*/

//-----------------------------------------------------------------------
//Expportacion - default
//export default conecctionMongoDB

//exportancion nombrada 
export {
    conecctionMongoDB,
    LIKES
}