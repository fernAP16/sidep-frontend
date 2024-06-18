import React from 'react';
import * as ROUTES from "../routes/routes.js";
import { useLocation, useNavigate } from 'react-router-dom';
import DespachoIcon from '../assets/icons/despacho.svg'
import HomeIcon from '../assets/icons/inicio.svg'
import HistorialIcon from '../assets/icons/historial.svg'
import DespachoRedIcon from '../assets/icons/despachoRed.svg'
import HomeRedIcon from '../assets/icons/inicioRed.svg'
import HistorialRedIcon from '../assets/icons/historialRed.svg'
import { Box, CssBaseline } from '@mui/material';
import Auxiliar from '../hoc/Auxiliar/Auxiliar.js';
import TopBar from '../components/TopBar/TopBar.js';
import NavBar from '../components/NavBar/NavBar.js';

const Layout = (props) => {

    // const {title, optionBack, cursiveTitle, incident, lastCheckIn} = props;
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);
    let navigate = useNavigate();
    let location = useLocation();

    const switchBottomOption = () =>{
        switch(location.pathname){
            case ROUTES.DESPACHO_INICIO:
            case ROUTES.DESPACHO_TURNO_ESPERA:
            case ROUTES.DESPACHO_REVISION:
            case ROUTES.DESPACHO_PESAJE_VACIO:
            case ROUTES.DESPACHO_COLA_CARGA:
            case ROUTES.DESPACHO_COLA_ESCANEAR:
            case ROUTES.DESPACHO_CARGA_PRODUCTOS:
            case ROUTES.DESPACHO_PESAJE_LLENO:
            case ROUTES.DESPACHO_SALIDA:
                setValue(0);
                break;
            case ROUTES.INICIO_CONDUCTOR:
                setValue(1);
                break;
            case ROUTES.HISTORIAL_CONDUCTOR:
                setValue(2);
                break;
            default:
                break;
        };
    }

    React.useEffect(() => {
        switchBottomOption();
    }, [location]);

    React.useEffect(() => {        
        switchBottomOption();        
    }, []);

    React.useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;        
    }, [value]);  

    const changeMenuOption = (value) =>{
        switch(value){
            case 0:
                navigate(ROUTES.DESPACHO_INICIO);
                break;
            case 1:
                navigate(ROUTES.INICIO_CONDUCTOR);
                break;
            case 2:
                navigate(ROUTES.HISTORIAL_CONDUCTOR);
                break;
            default:
                break;
        };

    }

    return (
        <Auxiliar>
        <Box ref={ref}>
          <TopBar
          direccion={1}
          />
          {props.children}
          <CssBaseline />
          <NavBar
            value={value}
            setValue={setValue}
            changeMenuOption={changeMenuOption}
            firstIcon={DespachoIcon}
            secondIcon={HomeIcon}
            thirdIcon={HistorialIcon}
            firstIconRed={DespachoRedIcon}
            secondIconRed={HomeRedIcon}
            thirdIconRed={HistorialRedIcon}
          />
        </Box>
      </Auxiliar>
    )
}

export default Layout;