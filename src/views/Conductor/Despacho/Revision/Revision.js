import React from 'react';
import { Box, Button, Card, Grid, Modal, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { getIncidenciasCometidas, obtenerDatosRevisionPorConductor } from '../../../../services/Despacho/Revision';
import { actualizarEstadoDespacho, actualizarOrdenPorDespacho } from '../../../../services/Despacho/DespachoGeneral';
import * as ROUTES from '../../../../routes/routes';
import '../../../../constants/commonStyle.css';
import './Revision.css'
import { registrarColaBalanzaVacio } from '../../../../services/Despacho/PesajeVacio';

export const Revision = () => {

    let { state } = useLocation();
    let navigate = useNavigate();
    const [idDespachoActual, setIdDespachoActual] = React.useState(0);
    const [idTurnoRevision, setIdTurnoRevision] = React.useState(0);
    const [codigoPuntoControl, setCodigoPuntoControl] = React.useState('-');
    const [estado, setEstado] = React.useState('-');
    const [horaInicio, setHoraInicio] = React.useState('-');
    const [horaFin, setHoraFin] = React.useState('-');
    const [tieneResultados, setTieneResultados] = React.useState(false);
    const [openAprobado, setOpenAprobado] = React.useState(false);
    const [openTerminar, setOpenTerminar] = React.useState(false);
    const [revisionAprobada, setRevisionAprobada] = React.useState(null);
    const [incidenciasCometidas, setIncidenciasCometidas] = React.useState([]);
    const [balanzaAsignada, setBalanzaAsignada] = React.useState('');
    const [idPlantaSelected, setIdPlantaSelected] = React.useState(0);
    const [turnoAsignadoPesajeVacio, setTurnoAsignadoPesajeVacio] = React.useState(0);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 280,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: "5px",
        pt: 2,
        px: 2,
        pb: 3,
    };


    React.useEffect(() => {
        const idDespacho = state.idDespacho;
        setIdPlantaSelected(state.idPlanta);
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
                const horaFin = fechaFin.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                setHoraFin(horaFin);
                setTieneResultados(true)
                setRevisionAprobada(response.data.esAprobado);
            }
        })
        .catch(function(err){
            console.log(err);
        })
    }, []);

    const handleVerResultados = () => {
        if(revisionAprobada !== null){
            if(revisionAprobada === 0){
                // Traer incidencias
                getIncidenciasCometidas(idTurnoRevision)
                .then(function(response){
                    setIncidenciasCometidas(response.data);
                    setOpenTerminar(true);
                })
                .catch(function(err){
                    setIncidenciasCometidas([]);
                })
            } else {
                // Asignar balanza y mostrar modal de aprobacion
                registrarColaBalanzaVacio(idPlantaSelected, idDespachoActual, 1)
                .then(function(response){
                    const idPesajeVacio = response.data.idColaBalanzaNuevo; 
                    const turnoAsignado = response.data.turnoAsignado;
                    const balanza = response.data.balanzaAsignada;
                    setBalanzaAsignada(balanza);
                    setTurnoAsignadoPesajeVacio(idPesajeVacio);
                    setOpenAprobado(true);
                })
                .catch(function(err){
                    setBalanzaAsignada('B1');
                    setOpenAprobado(true);
                })
                
            }
        }
    }

    const handleCloseAprobado = () => {
        setOpenAprobado(false);
    }

    const handleCloseTerminar = () => {
        setOpenTerminar(false);
    }

    const handleIrAPesaje = () => {
        actualizarEstadoDespacho(idDespachoActual, 4)
        .then(function(response){
          navigate(ROUTES.DESPACHO_PESAJE_VACIO, {
            state: {
                idDespacho: idDespachoActual,
                idPlanta: idPlantaSelected
            }
          });
        })
        .catch(function(err){
          console.log(err);
        })
    }

    const handleTerminarDespacho = () => {
        actualizarEstadoDespacho(idDespachoActual, 3)
        .then(function(response){
          actualizarOrdenPorDespacho(idDespachoActual, 1)
          .then(function(response){
            navigate(ROUTES.INICIO_CONDUCTOR, {
                state: {
                    idConductor: localStorage.getItem('idConductor'),
                    nombres: localStorage.getItem('nombres')
                }
            });
          })
          .catch(function(err){
            console.log(err);
          })
        })
        .catch(function(err){
          console.log(err);
        })
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
                        disabled={!tieneResultados}
                        onClick={() => handleVerResultados()}
                    >
                        Ver resultados
                    </Button>
                </Grid>
            </div>
            <Modal
                open={openAprobado}
                onClose={handleCloseAprobado}
            >
                <Box sx={{ ...style}}>
                <Grid className='grid-titulo-noaprobada'>
                    <Typography className='modal-noaprobada'>
                        Revisión aprobada
                    </Typography>
                </Grid>
                <Grid className='grid-subtitulo-noaprobada'>
                    <Typography className='label-subtitulo-noaprobada'>
                        Por favor, dirigirse a la zona de balanza asignada:
                    </Typography>
                </Grid>
                <Grid className='grid-balanza-asignada'>
                    <Typography className='label-balanza-asignada'>
                        {'Balanza ' + balanzaAsignada}
                    </Typography>
                </Grid>
                <Grid className='grid-button-pesaje'>
                    <Button
                    className='button-ir-pesaje'
                    variant='contained'
                    onClick={handleIrAPesaje}
                    >
                    IR A PESAJE
                    </Button>
                </Grid>
                </Box>
            </Modal>
            <Modal
                open={openTerminar}
                onClose={handleCloseTerminar}
            >
                <Box sx={{ ...style}}>
                <Grid className='grid-titulo-noaprobada'>
                    <Typography className='modal-noaprobada'>
                        Revisión no aprobada
                    </Typography>
                </Grid>
                <Grid className='grid-subtitulo-noaprobada'>
                    <Typography className='label-subtitulo-noaprobada'>
                        Regresar al despacho cuando resuelva las incidencias:
                    </Typography>
                </Grid>
                <Grid className='grid-incidencias-cometidas'>
                    {incidenciasCometidas.map((inc, index) => {
                        return (
                        <Typography className='label-incidencia-cometidas'>
                            {index+1 + ') ' + inc}
                        </Typography>
                    )
                    })}
                    
                </Grid>
                <Grid className='modal-aprobar-buttons'>
                    <Button
                    className='one-button'
                    variant='contained'
                    onClick={handleTerminarDespacho}
                    >
                    TERMINAR DESPACHO
                    </Button>
                </Grid>
                </Box>
            </Modal>
        </>
    )
}
