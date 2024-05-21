import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const registrarColaBalanzaVacio = (idPlanta, idDespachoActual, idTipoPesaje) => {
    const obj = {
        idPlanta : idPlanta,
        idDespacho: idDespachoActual,
        tipoPesaje: idTipoPesaje
    }
    return axios.post(
        API_URL.url + "colapesaje/registrar",
        obj
    )
}

export const obtenerDatosPesaje = (idDespacho, idTipoPesaje) => {
    const obj = {
        idDespacho: idDespacho,
        tipoPesaje: idTipoPesaje
    }
    return axios.post(
        API_URL.url + "colapesaje/obtenerdatos",
        obj
    )
}