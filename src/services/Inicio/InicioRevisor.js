import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const getPuntosControlPorPlanta = (idPlanta) => {
  return axios.get(
    API_URL.url + "puntocontrol/listByPlanta/" + idPlanta
  )
}