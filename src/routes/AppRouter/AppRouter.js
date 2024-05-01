import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ROUTES from "../routes.js";

import { LoginConductor } from '../../views/Conductor/Login/Login';
import InicioConductor from "../../views/Conductor/Inicio/InicioConductor.js";
import Historial from "../../views/Conductor/Historial/Historial.js";
import TurnoEspera from "../../views/Conductor/Despacho/TurnoEspera/TurnoEspera.js";
import Layout from "../../hoc/Layout.js"
import { useSelector } from 'react-redux';
import { LoginRevisor } from '../../views/Revisor/Login/Login.js';
import { InicioRevisor } from '../../views/Revisor/Inicio/InicioRevisor.js';

export const AppRouter = (props) => {

    // const [username, setUsername] = React.useState("");
    // const [loading, setLoading] = React.useState(true);
    
    // const userInf = useSelector(state => state.userReducer.user);
    // const userInfLocal = JSON.parse(localStorage.getItem("user"));
    // const dispatch = useDispatch();

    React.useEffect(() => {
        
    }, [])

    let publicRoutes = (
        <Routes>       
            <Route index element={<LoginConductor/>} />
            <Route path="*" element={<LoginConductor />} />
        </Routes>
    )

    let routes = (
        <Routes>
            <Route index path={ROUTES.LOGIN_CONDUCTOR} element = {<LoginConductor/>}/>
            <Route path={ROUTES.TURNO_ESPERA} element={/*loading === true ? <></> : */<Layout><TurnoEspera/></Layout>}/>
            <Route path={ROUTES.INICIO_CONDUCTOR} element={/*loading === true ? <></> : */<Layout><InicioConductor/></Layout>}/>
            <Route path={ROUTES.INICIO_REVISOR} element={/*loading === true ? <></> : */<Layout><InicioRevisor/></Layout>}/>
            <Route path={ROUTES.HISTORIAL_CONDUCTOR} element={/*loading === true ? <></> : */<Layout><Historial/></Layout>}/>
            <Route path={ROUTES.LOGIN_REVISOR} element = {<LoginRevisor/>}/>
        </Routes>
    )

  return (
    <BrowserRouter>
        {routes}
    </BrowserRouter>
  )
}
