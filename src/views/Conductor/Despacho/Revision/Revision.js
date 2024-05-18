import React from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import '../../../../constants/commonStyle.css';
import './Revision.css'
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { obtenerDatosRevisionPorConductor } from '../../../../services/Despacho/Revision';

export const Revision = () => {

    let { state } = useLocation(); // idDespacho, idPlanta
    let navigate = useNavigate();
    const [idDespachoActual, setIdDespachoActual] = React.useState(0);
    const [idTurnoRevision, setIdTurnoRevision] = React.useState(0);
    const [codigoPuntoControl, setCodigoPuntoControl] = React.useState('-');
    const [estado, setEstado] = React.useState('-');
    const [horaInicio, setHoraInicio] = React.useState('-');
    const [horaFin, setHoraFin] = React.useState('-');
    const [tieneResultados, setTieneResultados] = React.useState(true);

    React.useEffect(() => {
        const idDespacho = state.idDespacho;
        setIdDespachoActual(idDespacho);
        obtenerDatosRevisionPorConductor(idDespacho)
        .then(function(response){
            setIdTurnoRevision(response.data.idTurnoRevision);
            setCodigoPuntoControl(response.data.codigoPuntoControl);
            if(response.data.esAprobado === null) setEstado('En revisión');
            else setEstado('Terminado');
            const fechaInicio = new Date(response.data.horaInicio);
            const horaIni = fechaInicio.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            setHoraInicio(horaIni);
            if(response.data.horaFin === null)setHoraFin('-');
            else {
                const fechaFin = new Date(response.data.horaFin);
                fechaFin.setTime(fechaFin.getTime() - (5 * 60 * 60 * 1000));
                const horaFin = fechaFin.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                setHoraFin(horaFin);
            }
        })
        .catch(function(err){
            console.log(err);
        })
    }, []);

    const handleVerResultados = () => {
        
    }

    return (
        <>
            <ProgressBar fase={1}/>
            <div className='margin-pantalla-despacho'>
                <Grid className='titulo-revision-grid'>
                    <Typography className = "titulo-revision">Punto de control asignado: </Typography>
                    <Typography className = "punto-control">{codigoPuntoControl}</Typography>
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
