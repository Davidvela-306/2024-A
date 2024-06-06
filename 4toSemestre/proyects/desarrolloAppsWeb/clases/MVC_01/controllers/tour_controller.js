//* Controlador
import tourModel from "../model/tour.js"; //importar del model
import { v4 as uuidv4 } from "uuid";

//! Método del controlador, hace 3 cosas
//?1 Tomar el req de la ruta
//?2 Invocar el métdodo del model
//?3 Mandar la respuesta al frontend

//TODO 1 (en el req, se llamara desde la ruta)
const getAllToursController = async (req, res) => {
  //TODO 2
  try {
    const tours = await tourModel.getAllTourModel(); //tours = datos objeto en js del modelo
    //TODO 3
    res.status(200).json(tours); //si sale bien, estado es 200-éxito, json() transforma a json
  } catch (error) {
    res.status(500).json({ mgs: error });
  }
};

//! Método del controlador, hace 3 cosas
//?1 Tomar el req de la ruta
//?2 Invocar el métdodo del model
//?3 Mandar la respuesta al frontend

//TODO 1
const createTourController = async (req, res) => {
  //Agrega id único al body del obj obtenido por req
  const newTourData = {
    id: uuidv4(),
    ...req.body,
  };
  //TODO 2
  const tour = await tourModel.createTourModel(newTourData); //almacen objeto en tour
  //TODO 3
  res.status(201).json(tour);
};

//! Método del controlador, hace 3 cosas
//?1 Tomar el req de la ruta
//?2 Invocar el métdodo del model
//?3 Mandar la respuesta al frontend

//Data encontrada por params
const getTouryIdController = async (req, res) => {
  //TODO 1
  const { id } = req.params; //:id de route
  try {
    const tour = await tourModel.getTourByIDModel(id);
    const status = tour.error ? 404 : 200;
    res.status(status).json(tour);
  } catch (error) {
    res.status(500).json({ mgs: error });
  }
};

//Exportamos el controlador
export { getAllToursController, createTourController, getTouryIdController };
