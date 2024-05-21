import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const authBalanza = (codigo, contra) => {
  const obj = {
      username: codigo,
      password: contra,
  }
  return axios.post(
    API_URL.url + "zonabalanza/auth", 
    obj
  )
}