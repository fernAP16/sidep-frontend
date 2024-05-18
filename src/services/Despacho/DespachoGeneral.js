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