import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const auth = (dni, clave) => {
  const obj = {
      username: dni,
      password: clave,
  }
  return axios.post(
    API_URL.url + "conductor/auth", 
    obj
  )
}