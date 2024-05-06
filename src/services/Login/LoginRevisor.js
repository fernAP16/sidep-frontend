import axios from "axios";

const API_URL = window.globalConfig || { url: process.env.REACT_APP_WEB_SERVICES_URL} ;

export const authRevisor = (dni, contra) => {
  const obj = {
      username: dni,
      password: contra,
  }
  return axios.post(
    API_URL.url + "revisor/auth", 
    obj
  )
}