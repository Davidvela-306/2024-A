import bcrypt from "bcrypt";
const userModel = {
  //! Método del Modelo
  //? 1.- Interacturar con la BDD
  //? 2.- Obtener respuesta de la BDD para enviar al controlador
  async registerUserModel(newUserData) {
    //TODO Punto 1
    const url = "http://localhost:4000/users";
    const peticion = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: { "Content-Type": "application/json" },
    });
    //TODO Punto 2
    const data = await peticion.json();
    return data;
  },
  async loginUserModel(userName, password) {
    //TODO Punto 1
    const url = "http://localhost:4000/users";
    const peticion = await fetch(url);
    const users = await peticion.json();
    //TODO Punto 2
    const user = users.find((user) => user.username === userName);
    // if (!user) {
    //   return { error: "username o password invalid" };
    // }
    const passwordMatch = await bcrypt.compare(password, user.password); //? bcript
    if (user && passwordMatch) {
      //si usuario y contraseña es correcta
      return user;
    } else {
      return { error: "Username o password invalid2" };
    }
  },
};

export default userModel;
