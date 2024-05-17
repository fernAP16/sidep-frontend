import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const getIncidencias = () => {
  return axios.get(
    API_URL.url + "incidencia/listAll"
  )
}

export const getDespachoByIdTurnoRevision = (idTurnoRevision) => {
  return axios.post(
    API_URL.url + "turnorevision/obtenerDespachoById/" + idTurnoRevision,
  )
}

export const asignarPuntoControlYRevisor = (idRevisor, idPuntoControl, x, y) => {
  const obj = {
    idRevisor: idRevisor,
    idPuntoControl: idPuntoControl,
    x: x,
    y: y
  }
  return axios.post(
    API_URL.url + "turnorevision/asignarTurnoRevision",
    obj
  )
}

export const aprobarRevision = (idTurnoRevision) => {
  return axios.post(
    API_URL.url + "turnorevision/aprobar/" + idTurnoRevision,
  )
}
