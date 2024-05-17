import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const getEstadoDespacho = (idConductor) => {
  return axios.get(
    API_URL.url + "despacho/estadoDespacho/" + idConductor
  )
}

export const registrarTurnoEspera = (idDesp, x, y) => {
  const obj = {
    idDespacho: idDesp,
    x: x,
    y: y
  }
  
  return axios.post(
    API_URL.url + "turnorevision/registrar",
    obj
  )
}

export const getTurnoEspera = (idDesp, x, y) => {
  const obj = {
    idDespacho: idDesp,
    x: x,
    y: y
  }
  
  return axios.post(
    API_URL.url + "turnorevision/obtener",
    obj
  )
}