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

export const obtenerDatosColaCarga = (idDespachoActual) => {
    return axios.post(
        API_URL.url + "colacarga/obtenerdatos/" + idDespachoActual
    )
}

export const verificarCanal = (idCanalCarga, qrLeido) => {
    const obj = {
        idCanalCarga: idCanalCarga,
        qrLeido: qrLeido
    }
    return axios.post(
        API_URL.url + "colacarga/verificar",
        obj
    )
}

export const obtenerDatosCompletos = (idDespacho) => {
    return axios.post(
        API_URL.url + "colacarga/obtenerdatos/completos/" + idDespacho
    )
}

export const finalizarCarga = (idDespacho, idColaCanal) => {
    const obj = {
        idDespacho: idDespacho,
        idColaCanal: idColaCanal
    }
    return axios.post(
        API_URL.url + "colacarga/finalizarcarga",
        obj
    )
}