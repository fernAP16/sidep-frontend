import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const registrarIngresoColaBalanzaVacio = (idPlanta, idDespachoActual) => {
    const obj = {
        idPlanta : idPlanta,
        idDespacho: idDespachoActual
    }
    return axios.post(
        API_URL.url + "colacarga/registrar",
        obj
    )
}