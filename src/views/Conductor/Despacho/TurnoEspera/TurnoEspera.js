import React from 'react';
import './TurnoEspera.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTurnoEspera } from '../../../../services/Despacho/TurnoEspera';
import { Button, Card, Grid, Typography } from '@mui/material';
import * as ROUTES from '../../../../routes/routes';
import { actualizarEstadoDespacho } from '../../../../services/Despacho/DespachoGeneral';

const TurnoEspera = () => {

  let { state } = useLocation(); // idDespacho, idPlanta
  let navigate = useNavigate();

  const [turnoAsignado, setTurnoAsignado] = React.useState(0);
  const [turnoActual, setTurnoActual] = React.useState(0);
  const [estado, setEstado] = React.useState('');
  const [idDespachoActual, setIdDespachoActual] = React.useState(0);
  const [idPlantaSelected, setIdPlantaSelected] = React.useState(0);

  React.useEffect(() => { 
    const x = -12.082746;
    const y = -77.0509898;
    const idDespacho = state.idDespacho;
    setIdPlantaSelected(state.idPlanta);
    setIdDespachoActual(idDespacho);
    getTurnoEspera(idDespacho, x, y)
    .then(function(response){
      if(response.data.idTurnoRevision !== 0){
        const turnoAsignado = response.data.turnoAsignado
        const turnoActual = response.data.turnoActual
        setTurnoAsignado(turnoAsignado);
        setTurnoActual(turnoActual);
        if(turnoActual >= turnoAsignado){
          setEstado("Su turno");
        } else {
          setEstado("En espera");
        }
      } else { // ERROR        
        console.log(response.data);
      }
    })
    .catch(function(err){
      console.log(err);
    })
    
  }, [])

  const handleIniciarDespacho = () => {
    actualizarEstadoDespacho(idDespachoActual, 2)
    .then(function(response){
      navigate(ROUTES.DESPACHO_REVISION, {
        state: {
            idRevision: 1,
            idDespacho: idDespachoActual,
            idPlanta: idPlantaSelected
        }
      });
    })
    .catch(function(err){
      console.log(err);
    })
  }

  return (
    <div  className='margin-pantalla'>
      <Grid className='titulo-usuario-grid'>
        <Typography className = "titulo-usuario-text">Usted se encuentra en la cola de espera para despacho de productos:</Typography>
      </Grid>
      <Card className='turno-card'>
        <Typography className='titulo-card'>
          Turno asignado
        </Typography>
        <Typography className='turno-asignado-card'>
          {turnoAsignado}
        </Typography>
        <Grid className='grid-etiquetas'>
          <Grid container item className='grid-espacio'>
            <Typography className='turno-etiqueta-card'>
              Turno actual:
            </Typography>
            <Typography className='turno-valor-card'>
              {turnoActual}
            </Typography>
          </Grid>
          <Grid container item className='grid-espacio'>
            <Typography className='turno-etiqueta-card'>
              Estado actual:
            </Typography>
            <Typography className='turno-valor-card'>
              {estado}
            </Typography>
          </Grid>
        </Grid>
        <Typography className='estado-card'>
        </Typography>
        <Grid item container>
          <Button
            className='button-turno'
            variant='contained'
            disabled={turnoActual === 0 || turnoActual < turnoAsignado}
            onClick={() => handleIniciarDespacho()}
            >
            INICIAR DESPACHO
          </Button>
        </Grid>
      </Card>
      <Grid>

      </Grid>
    </div>
  )
}

export default TurnoEspera;