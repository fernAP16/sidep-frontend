import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const getPuntosControlPorPlanta = (x, y) => {
  const obj = {x: x, y: y}
  return axios.post(
    API_URL.url + "puntocontrol/listByPlanta",
    obj
  )
}