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
import { LayoutRevisor } from '../../hoc/LayoutRevisor.js';
import { DetalleOrden } from '../../views/Conductor/Inicio/DetalleOrden.js';

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
            <Route index element = {<LoginConductor/>}/>
            <Route path={ROUTES.DESPACHO_TURNO_ESPERA} element={/*loading === true ? <></> : */<Layout><TurnoEspera/></Layout>}/>
            <Route path={ROUTES.INICIO_CONDUCTOR} element={/*loading === true ? <></> : */<Layout><InicioConductor/></Layout>}/>
            <Route path={ROUTES.HISTORIAL_CONDUCTOR} element={/*loading === true ? <></> : */<Layout><Historial/></Layout>}/>
            <Route path={ROUTES.DETALLE_CONDUCTOR} element={/*loading === true ? <></> : */<Layout><DetalleOrden/></Layout>}/>

            <Route path={ROUTES.LOGIN_REVISOR} element = {<LoginRevisor/>}/>
            <Route path={ROUTES.INICIO_REVISOR} element={/*loading === true ? <></> : */<LayoutRevisor><InicioRevisor/></LayoutRevisor>}/>
        </Routes>
    )

  return (
    <BrowserRouter>
        {routes}
    </BrowserRouter>
  )
}
