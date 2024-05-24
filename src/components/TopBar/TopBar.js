import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useNavigate} from "react-router-dom";
import LogoIcon from '../../assets/icons/logo.svg'
import LogOutIcon from '../../assets/icons/logout.svg'
import * as ROUTES from '../../routes/routes'
import "./TopBar.css";

const TobBar = (props) => {

    const { direccion } = props;

    let navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        localStorage.setItem("sesion", JSON.stringify(true));
        if(direccion === 1) navigate(ROUTES.LOGIN_CONDUCTOR);
        else if (direccion === 2) navigate(ROUTES.LOGIN_REVISOR);
        else if (direccion === 3) navigate(ROUTES.LOGIN_BALANZA);
    };

    return (
        <div>
            <Grid container className='topBar'>
                <Grid item container xs={10} md={10} className='logo'>
                    <img
                        src={LogoIcon}
                        alt="Logo del sistema SIDEP"
                    />
                </Grid>
                <Grid  item container xs={2} md={2}>
                    <img
                        src={LogOutIcon}
                        alt="Cerrar sesión"
                        onClick={() => logOut()}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default TobBar;