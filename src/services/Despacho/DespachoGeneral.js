import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const actualizarEstadoDespacho = (idDespacho, idNuevoEstado) => {
    const obj = {
        idDespacho: idDespacho,
        idNuevoEstado: idNuevoEstado
    }
    return axios.post(
        API_URL.url + "despacho/nuevoEstado",
        obj
    )
}

export const actualizarOrdenPorDespacho = (idDespachoActual, idNuevoEstado) => {
    const obj = {
        idDespacho: idDespachoActual,
        idNuevoEstado: idNuevoEstado
    }
    return axios.post(
        API_URL.url + "ordenRecojo/nuevoEstado",
        obj
    )
}

export const agregarPesaje = (idDespacho, valorPesaje, tipoPesaje, idBalanza) => {
    const obj = {
        idDespacho: idDespacho,
        tipoPesaje: tipoPesaje,
        valorPesaje: valorPesaje,
        idZonaBalanza: idBalanza
    }
    return axios.post(
        API_URL.url + "despacho/agregarPesaje",
        obj
    )
}