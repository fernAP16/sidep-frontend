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

export const registrarIncidencias = (id, arrIdIncidencias) => {
  const obj = {
    idIncidencias: arrIdIncidencias,
    idTurnoRevision: id
  }
  return axios.post(
    API_URL.url + "turnorevision/registrarIncidencia",
    obj
  )
}

export const actualizarEstadoDespachoPorTurnoRevision = (idTurnoRevision, nuevoEstado) => {
  const obj = {
    nuevoEstado: nuevoEstado,
    idTurnoRevision: idTurnoRevision
  }
  return axios.post(
    API_URL.url + "turnorevision/estadoDespacho",
    obj
  )
}

export const obtenerDatosRevisionPorConductor = (idDespacho) => {
  return axios.post(
    API_URL.url + "turnorevision/obtenerDatos/conductor/" + idDespacho
  )
}

export const registrarSalidaRevisor = (idTurnoRevision) => {
  return axios.post(
    API_URL.url + "turnorevision/salidaRevisor/" + idTurnoRevision
  )
}