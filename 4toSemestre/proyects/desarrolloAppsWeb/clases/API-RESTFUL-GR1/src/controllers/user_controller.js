import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import userModel from "../models/user.js";
import { createToken } from "../middlewares/auth.js";

//! Método del controlador, hace 3 cosas
//?1 Tomar el req de la ruta
//?2 Invocar el métdodo del model
//?3 Mandar la respuesta al frontend

const registerUserController = async (req, res) => {
  //TODOPUNTO  1
  // Desestructuración- rest
  const { password, ...otherDataUser } = req.body;
  // encriptar el password
  const hashedPassword = await bcrypt.hash(password, 10);
  // creación del objeto - spread
  const newUserData = {
    id: uuidv4(),
    password: hashedPassword,
    ...otherDataUser,
  };
  //TODO PUNTO 2
  const user = await userModel.registerUserModel(newUserData);
  //TODO PUNTO 3
  res.status(201).json({ user }); //le enviamos al frontend info y token
};


//! Método del controlador, hace 3 cosas
//?1 Tomar el req de la ruta
//?2 Invocar el métdodo del model
//?3 Mandar la respuesta al frontend

const loginUserController = async (req, res) => {
  //TODO 1
  const { username, password } = req.body;
  try {
    // TODO 2
    const user = await userModel.loginUserModel(username, password);
    // TODO 3
    const token = createToken(user); //enviamos info del user
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export { registerUserController, loginUserController };
