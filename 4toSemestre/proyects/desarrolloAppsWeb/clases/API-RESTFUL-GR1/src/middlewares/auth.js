import jwt from "jsonwebtoken";

const createToken = (userInfo) => {
  return jwt.sign(userInfo, 'secret_key', { expiresIn: '1h' }); //TODO (info de usuario, establecer la clave, cuando expira)
};
const verifyToken = (req, res, next) => {
    //req.body req.params req.query req.headers 
    const authHeader = req.headers.authorization
    // validar si se envia el token
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: "Token no proporcionado."})
    }
    //dividir token Bearer 3543213246541321
    //token ['Bearer','3543213246541321']
    const token = authHeader.split(' ')[1]

    jwt.verify(token,'secret_key',(err,decoded )=>{
        //Verificación
        if(err){
            return res.status(403).json({message: 'Falló al autentificar el token.'})
        }
        //Usuario decodificado
        req.user = decoded
        next()
    })
};

export { createToken, verifyToken };
