import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const getOrdenesByIdConductor = (idConductor) => {
  return axios.get(
    API_URL.url + "ordenRecojo/listByConductor/" + idConductor
  )
}

export const registrarDespachoByIdOrden = (id, x, y) => {
  const obj = {
    idOrden: id,
    x: x,
    y: y
  }
  return axios.post(
    API_URL.url + "despacho/registrar",
    obj
  )
}

export const obtenerUltimoDespachoPorOden = (idOrden) => {
  return axios.post(
    API_URL.url + "despacho/orden/" + idOrden
  )
}