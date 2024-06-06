import { response } from "express"

const tourModel = {
    
        //! Método del Modelo
        //? 1.- Interacturar con la BDD
        //? 2.- Obtener respuesta de la BDD para enviar al controlador
    async getAllToursModel (){
        //: Punto 1
        const peticion = await fetch('http://localhost:4000/tours')
        //: Punto 2
        const tours = await peticion.json()
        return tours
    }
    ,
        //! Método del Modelo
        //? 1.- Interacturar con la BDD
        //? 2.- Obtener respuesta de la BDD para enviar al controlador
    async createTourModel (newTour){
        //: Punto 1
        const url = 'http://localhost:4000/tours'
        const peticion = await fetch(url,{
            method:'POST',                               // VERBO
            body:JSON.stringify(newTour),                // INFO
            headers:{'Content-Type':'application/json'}  // TIPO DE CONTENT
        })
        const data = await  peticion.json()

        //: Punto 2
        return data
    }
    ,


    async getTourByIDModel (tourId){
        //: PUNTO 1
        const response = await fetch(`http://localhost:4000/tours/${tourId}`)
        
        if (!response.ok){
            return {error:"Tour no encontrado"}
        }
        const data = await response.json()

        //: PUNTO 2
        return data
    }
    ,

    //! Método del Modelo
    //? 1.- Interacturar con la BDD
    //? 2.- Obtener respuesta de la BDD para enviar al controlador
    async updateTourModel (idTour,dataTour){
        //: Punto 1
        const url = `http://localhost:4000/tours/${idTour}`
        const peticion = await fetch(url,{
            method:'PUT',                             
            body:JSON.stringify(dataTour),                
            headers:{'Content-Type':'application/json'}  
        })
        const data = await  peticion.json()
        //: Punto 2
        return data
    }

    ,


        //! Método del Modelo
    //? 1.- Interacturar con la BDD
    //? 2.- Obtener respuesta de la BDD para enviar al controlador
    async deleteTourModel (idTour){
        //: Punto 1
        const url = `http://localhost:4000/tours/${idTour}`
        const peticion = await fetch(url,{
            method:'DELETE',                             
        })
        await  peticion.json()
        //: Punto 2
        return {msg:"Tour eliminado correctamente"}
    }

}



export default tourModel