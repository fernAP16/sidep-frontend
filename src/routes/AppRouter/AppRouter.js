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
import Despacho from '../../views/Conductor/Despacho/Despacho.js';
import { Revision } from '../../views/Conductor/Despacho/Revision/Revision.js';
import { RevisionRev } from '../../views/Revisor/Revision/RevisionRev.js';
import { PesajeVacio } from '../../views/Conductor/Despacho/PesajeVacio/PesajeVacio.js';
import { LoginBalanza } from '../../views/Balanza/Login/Login.js';
import { InicioBalanza } from '../../views/Balanza/Inicio/InicioBalanza.js';
import { PesajeBalanza } from '../../views/Balanza/Pesaje/PesajeBalanza.js';
import { LayoutBalanza } from '../../hoc/LayoutBalanza.js';
import { ColaCarga } from '../../views/Conductor/Despacho/ColaCarga/ColaCarga.js';
import { CargaProductos } from '../../views/Conductor/Despacho/ColaCarga/CargaProductos.js';
import { PesajeLleno } from '../../views/Conductor/Despacho/PesajeLleno/PesajeLleno.js';
import { Salida } from '../../views/Conductor/Despacho/Salida/Salida.js';

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
            {/* General conductor */}
            <Route index element = {<LoginConductor/>}/>
            <Route path={ROUTES.INICIO_CONDUCTOR} element={/*loading === true ? <></> : */<Layout><InicioConductor/></Layout>}/>
            <Route path={ROUTES.HISTORIAL_CONDUCTOR} element={/*loading === true ? <></> : */<Layout><Historial/></Layout>}/>
            <Route path={ROUTES.DETALLE_CONDUCTOR} element={/*loading === true ? <></> : */<Layout><DetalleOrden/></Layout>}/>

            {/* Despacho conductor */}
            <Route path={ROUTES.DESPACHO_INICIO} element={/*loading === true ? <></> : */<Layout><Despacho/></Layout>}/>
            <Route path={ROUTES.DESPACHO_TURNO_ESPERA} element={/*loading === true ? <></> : */<Layout><TurnoEspera/></Layout>}/>
            <Route path={ROUTES.DESPACHO_REVISION} element={/*loading === true ? <></> : */<Layout><Revision/></Layout>}/>
            <Route path={ROUTES.DESPACHO_PESAJE_VACIO} element={/*loading === true ? <></> : */<Layout><PesajeVacio/></Layout>}/>
            <Route path={ROUTES.DESPACHO_COLA_CARGA} element={/*loading === true ? <></> : */<Layout><ColaCarga/></Layout>}/>
            <Route path={ROUTES.DESPACHO_CARGA_PRODUCTOS} element={/*loading === true ? <></> : */<Layout><CargaProductos/></Layout>}/>
            <Route path={ROUTES.DESPACHO_PESAJE_LLENO} element={/*loading === true ? <></> : */<Layout><PesajeLleno/></Layout>}/>
            <Route path={ROUTES.DESPACHO_SALIDA} element={/*loading === true ? <></> : */<Layout><Salida/></Layout>}/>

            {/* General revisor */}
            <Route path={ROUTES.LOGIN_REVISOR} element = {<LoginRevisor/>}/>
            <Route path={ROUTES.INICIO_REVISOR} element={/*loading === true ? <></> : */<LayoutRevisor><InicioRevisor/></LayoutRevisor>}/>
            <Route path={ROUTES.REVISION_REVISOR} element={/*loading === true ? <></> : */<LayoutRevisor><RevisionRev/></LayoutRevisor>}/>

            {/* General Balanza */}
            <Route path={ROUTES.LOGIN_BALANZA} element = {<LoginBalanza/>}/>
            <Route path={ROUTES.INICIO_BALANZA} element = {/*loading === true ? <></> : */<LayoutBalanza><InicioBalanza/></LayoutBalanza>}/>
            <Route path={ROUTES.PESAJE_BALANZA} element = {/*loading === true ? <></> : */<LayoutBalanza><PesajeBalanza/></LayoutBalanza>}/>
        </Routes>
    )

  return (
    <BrowserRouter>
        {routes}
    </BrowserRouter>
  )
}
