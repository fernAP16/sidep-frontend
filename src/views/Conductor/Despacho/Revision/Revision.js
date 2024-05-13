import React from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import '../../../../constants/commonStyle.css';
import './Revision.css'
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';

export const Revision = () => {

    let { state } = useLocation(); // idDespacho, idPlanta
    let navigate = useNavigate();
    const [idTurnoRevision, setIdTurnoRevision] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [horaInicio, setHoraInicio] = React.useState('');
    const [horaFin, setHoraFin] = React.useState('');
    const [tieneResultados, setTieneResultados] = React.useState(true);

    React.useEffect(() => {
        setEstado('En revisión');
        setHoraInicio('10:20 AM');
        setHoraFin('-');
    }, []);

    const handleVerResultados = () => {
        
    }

    return (
        <>
            <ProgressBar fase={1}/>
            <div className='margin-pantalla'>
                <Grid className='titulo-revision-grid'>
                    <Typography className = "titulo-revision">Punto de control asignado: </Typography>
                    <Typography className = "punto-control">C2</Typography>
                </Grid>
                <Grid className='titulo-revision-grid'>
                    <Typography className = "titulo-ordenes-text">Diríjase al punto de control para la revisión de unidad física </Typography>
                </Grid>
                <Card className='card-revision'>
                    <Grid className='card-column'>
                        <Typography className='card-text'>Estado actual:</Typography>
                        <Typography className='card-text'>{estado}</Typography>
                    </Grid>
                    <Grid className='card-column'>
                        <Typography className='card-text'>Hora de inicio:</Typography>
                        <Typography className='card-text'>{horaInicio}</Typography>
                    </Grid>
                    <Grid className='card-column'>
                        <Typography className='card-text'>Hora de fin:</Typography>
                        <Typography className='card-text'>{horaFin}</Typography>
                    </Grid>
                </Card>
                <Grid className='grid-button-revision'>
                    <Button 
                        variant="contained" 
                        className='button-revision'
                        disabled={tieneResultados}
                        onClick={() => handleVerResultados()}
                    >
                        Ver resultados
                </Button>
                </Grid>
            </div>
        </>
    )
}
