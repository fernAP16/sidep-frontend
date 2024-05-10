import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import '../../../../constants/commonStyle.css';
import './Revision.css'

export const Revision = () => {

    let { state } = useLocation(); // idDespacho, idPlanta
    let navigate = useNavigate();
    const [idTurnoRevision, setIdTurnoRevision] = React.useState('');

    return (
        <div className='margin-pantalla'>
            <Grid className='titulo-revision-grid'>
                <Typography className = "titulo-revision">Punto de control asignado: </Typography>
                <Typography className = "punto-control">C2</Typography>
            </Grid>
            <Grid className='titulo-revision-grid'>
                <Typography className = "titulo-ordenes-text">Diríjase al punto de control para la revisión de unidad física </Typography>
            </Grid>
        </div>
    )
}
