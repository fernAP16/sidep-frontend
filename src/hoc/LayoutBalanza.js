import React from 'react'
import * as ROUTES from "../routes/routes.js";
import { NavBarRevisor } from '../components/NavBar/NavBarRevisor';
import HomeIcon from '../assets/icons/inicio.svg';
import HomeRedIcon from '../assets/icons/inicioRed.svg';
import PesajeIcon from '../assets/icons/pesaje.svg';
import PesajeRedIcon from '../assets/icons/pesajeRed.svg';
import TopBar from '../components/TopBar/TopBar.js';
import NavBar from '../components/NavBar/NavBar.js';
import { Box, CssBaseline } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Auxiliar from '../hoc/Auxiliar/Auxiliar.js';
import { NavBarBalanza } from '../components/NavBar/NavBarBalanza.js';


export const LayoutBalanza = (props) => {

    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);
    let navigate = useNavigate();
    let location = useLocation();

    const switchBottomOption = () =>{
        switch(location.pathname){
            case ROUTES.INICIO_BALANZA:
                setValue(0);
                break;
            case ROUTES.PESAJE_BALANZA:
                setValue(1);
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
                navigate(ROUTES.INICIO_BALANZA);
                break;
            case 1:
                navigate(ROUTES.PESAJE_BALANZA);
                break;
            default:
                break;
        };

    }

    return (
        <Auxiliar>
        <Box ref={ref}>
          <TopBar
          direccion={3}
          />
          {props.children}
          <CssBaseline />
          <NavBarBalanza
            value={value}
            setValue={setValue}
            changeMenuOption={changeMenuOption}
            firstIcon={HomeIcon}
            secondIcon={PesajeIcon}
            firstIconRed={HomeRedIcon}
            secondIconRed={PesajeRedIcon}
          />
        </Box>
      </Auxiliar>
    )
}
