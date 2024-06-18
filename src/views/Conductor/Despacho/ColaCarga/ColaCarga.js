import React from 'react'
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar'
import { Button, Card, Grid, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import { obtenerDatosColaCarga } from '../../../../services/Despacho/CargaProductos';

import CamionGris from '../../../../assets/icons/camionGris.svg';
import CamionVerde from '../../../../assets/icons/camionVerde.svg';
import CamionAmarillo from '../../../../assets/icons/camionAmarillo.svg';
import CamionRojo from '../../../../assets/icons/camionRed.svg';
import * as ROUTES from '../../../../routes/routes';

import './ColaCarga.css';

export const ColaCarga = () => {
  
  let { state } = useLocation();
  let navigate = useNavigate();
  const [idDespachoActual, setIdDespachoActual] = React.useState(0);
  const [idPlantaActual, setIdPlantaActual] = React.useState(0);
  const [idColaCanal, setIdConalCanal] = React.useState(0);
  const [posicionActual, setPosicionActual] = React.useState(1);
  const [idCanalCarga, setIdCanalCarga] = React.useState(1);
  const [codigoCanalCarga, setCodigoCanalCarga] = React.useState('A1');
  

  React.useEffect(() => {
    const idDsp = state.idDespacho;
    const idPlt = state.idPlanta;
    setIdDespachoActual(idDsp);
    setIdPlantaActual(idPlt);
    obtenerDatosColaCarga(idDsp)
    .then(function(response){
      setPosicionActual(response.data.posicionActual);
      setIdConalCanal(response.data.idColaCanal);
      setIdCanalCarga(response.data.idCanalCarga);
      setCodigoCanalCarga(response.data.codigoCanalCarga);
    })
    .catch(function(err){
      console.log(err);
    })
  }, [])

  const colorCamion = (numeroCamion) => {

    if(numeroCamion === 1) {
      if(posicionActual === 1) return CamionVerde;
      return CamionRojo
    }
    if(posicionActual < numeroCamion) return CamionGris;
    if(posicionActual === numeroCamion) return CamionVerde;
    return CamionAmarillo;
  }

  const handleIniciarCarga = () => {
    navigate(ROUTES.DESPACHO_COLA_ESCANEAR, {
      state: {
        idDespacho: idDespachoActual,
        idPlanta: idPlantaActual,
        idCanalCarga: idCanalCarga,
        codigoCanalCarga, codigoCanalCarga
      }
    })
  }

  return (
    <>
      <ProgressBar fase={3}/>
      <div className='margin-pantalla-despacho'>
        <Grid className='grid-colacarga-titulo'>
            <Typography className = "typography-colacarga-titulo">Canal de carga asignado: </Typography>
            <Typography className = "typography-colacarga-canal">{codigoCanalCarga}</Typography>
        </Grid>
        <Grid className='grid-colacarga-indicacion'>
            <Typography className = "typography-colacarga-indicacion">
              Diríjase a la cola del canal de carga asignado y espere su turno
            </Typography>
        </Grid>
        <Card className='card-colacarga'>
          <Typography className = "card-colacarga-titulo">
            {'Cola del canal ' + codigoCanalCarga}
          </Typography>
          <Grid className='icon'>
            <Grid className='arrow'>
            </Grid>
          </Grid>
          <Grid className='grid-colacarga-estados'>
            <Typography className = "typography-colacarga-estado">
              En espera
            </Typography>
            <Typography className = "typography-colacarga-estado">
              Cargando
            </Typography>
          </Grid>
          <Grid className='grid-camiones-carga'>
            <img
              src={colorCamion(5)}
              alt="Despacho"
            />
            <img
              src={colorCamion(4)}
              alt="Despacho"
            />
            <img
              src={colorCamion(3)}
              alt="Despacho"
            />
            <img
              src={colorCamion(2)}
              alt="Despacho"
            />
            <img
              src={colorCamion(1)}
              alt="Despacho"
            />
          </Grid>
        </Card>
        <Grid className='grid-colacarga-indicacion'>
            <Typography className = "typography-colacarga-indicacion">
              {'Turnos Faltantes: ' + (posicionActual - 1)}
            </Typography>
        </Grid>
        <Grid className='grid-button-iniciar'>
          <Button
              variant="contained" 
              className='button-resultados'
              disabled={posicionActual !== 1}
              onClick={() => handleIniciarCarga()}
          >
              INICIAR CARGA
          </Button>
        </Grid>
      </div>
    </>
  )
}
