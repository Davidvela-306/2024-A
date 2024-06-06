//* Modelo
const tourModel = {
  //aquí se define 2 cosas:
  //! Método del modelo
  //? Interactuar con la bbd
  //? Obtener respuesta de la bbd para enviar al controlador
  async getAllTourModel() {
    // TODO Punto 1
    const peticion = await fetch("http://localhost:4000/tours");
    // TODO Punto 2
    const tours = await peticion.json(); //Guardamos de la bbd, convertir el cuerpo de la respuesta en un objeto JavaScript.

    return tours; //Método creado: obtener todos los tour como obj de js
  },

  async createTourModel(newTour) {
    //se le pasará el argumento desde el controller
    //TODO Punto 1
    const url = "http://localhost:4000/tours";
    const peticion = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newTour), //Convierte newTour en una cadena JSON., es el nuevo recurso que se creará
      headers: { "Content-Type": "application/json" },
    }); //(url, opciones)
    const data = await peticion.json(); 
    //TODO Punto 2
    return data; //obj javascript
  },
  
  async getTourByIDModel(tourId) {
    //TODO Punto 1
    const response = await fetch(`http://localhost:4000/tours/${tourId}`);
    if (!response.ok) {
      return { error: "Tour no encontrado" };
    }
    const data = await response.json();
    //TODO Punto 2
    return data;
  },
};

export default tourModel;
