import React from 'react';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { obtenerDatosPesaje } from '../../../../services/Despacho/PesajeVacio';
import QRCode from "react-qr-code";
import * as ROUTES from '../../../../routes/routes';
import './PesajeVacio.css'
import { actualizarEstadoDespacho, actualizarOrdenPorDespacho } from '../../../../services/Despacho/DespachoGeneral';
import { registrarIngresoColaBalanzaVacio } from '../../../../services/Despacho/CargaProductos';
import { actualizarEstadoDespachoPorTurnoRevision } from '../../../../services/Despacho/Revision';

export const PesajeVacio = () => {

  let { state } = useLocation();
  let navigate = useNavigate();
  const [idColaPesaje, setIdColaPesaje] = React.useState(0);
  const [idBalanza, setIdBalanza] = React.useState('');
  const [codigoBalanza, setCodigoBalanza] = React.useState('');
  const [idDespachoSelected, setIdDespachoSelected] = React.useState(0);
  const [idPlantaSelected, setIdPlantaSelected] = React.useState(0);
  const [valorPesajeVacio, setValorPesajeVacio] = React.useState(null);
  const [valorVehiculo, setValorVehiculo] = React.useState(0);
  const [limiteInferior, setLimiteInferior] = React.useState(0);
  const [limiteSuperior, setLimiteSuperior] = React.useState(0);
  const [value, setValue] = React.useState(null);
  const [openAprobado, setOpenAprobado] = React.useState(false);
  const [openTerminar, setOpenTerminar] = React.useState(false);
  const [canalCargaAsignado, setCanalCargaAsignado] = React.useState('');
  const [desfase, setDesfase] = React.useState(0);
  const [tipoDesfase, setTipoDesfase] = React.useState('');

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
    const idPlanta = state.idPlanta;
    setIdDespachoSelected(idDespacho);
    setIdPlantaSelected(idPlanta);
    obtenerDatosPesaje(idDespacho, 1)
    .then(function(response){
      console.log(response.data);
      const idColaPsj = response.data.idColaPesaje;
      const idBlz = response.data.idZonaBalanza;
      const codigoBlz = response.data.codigoZonaBalanza;
      const valorPsj = response.data.valorPesajeVacio;
      const posicion = response.data.posicion;
      const valorPsjVehiculo = response.data.valorVehiculo;
      const limiteInf = response.data.limiteInf;
      const limiteSup = response.data.limiteSup;
      setIdColaPesaje(idColaPsj)
      setIdBalanza(idBlz)
      setValorVehiculo(valorPsjVehiculo);
      setLimiteInferior(limiteInf);
      setLimiteSuperior(limiteSup);
      if(idBlz === 0){
        setCodigoBalanza("BN");
      } else {
        setCodigoBalanza(codigoBlz);
        setValue("IdColaPesaje/" + idColaPsj + "/Balanza/" + idBlz + "/Despacho/" + idDespacho + "/Posicion/" + posicion)
      }
      if(valorPsj !== null) setValorPesajeVacio(valorPsj);
    })
    .catch(function(err){
      console.log(err);
    })
  }, [])

  const handleVerResultados = () => {
    const pesoMinimo = valorVehiculo - limiteInferior;
    const pesoMaximo = valorVehiculo + limiteSuperior;
    if(valorPesajeVacio < pesoMinimo){
      setDesfase(pesoMinimo - valorPesajeVacio);
      setTipoDesfase("menos");
      setOpenTerminar(true);
      return;
    }
    if(valorPesajeVacio > pesoMaximo){
      setDesfase(valorPesajeVacio - pesoMaximo)
      setTipoDesfase("extra");
      setOpenTerminar(true);
      return;
    }
    registrarIngresoColaBalanzaVacio(idPlantaSelected, idDespachoSelected)
    .then(function(response){
      if(response.data){
        const canal = response.data.canalCargaAsignado;
        setCanalCargaAsignado(canal);
        setOpenAprobado(true);
      } else {

      }
    })
    .catch(function(err){

    })
  }

  const handleIrACargaProductos = () => {
    actualizarEstadoDespacho(idDespachoSelected, 6)
    .then(function(response){
      navigate(ROUTES.DESPACHO_COLA_CARGA, {
        state: {
            idDespacho: idDespachoSelected,
            idPlanta: idPlantaSelected
        }
      });
    })
    .catch(function(err){
      console.log(err);
    })
  }

  const handleCloseAprobado = () => {
    setOpenAprobado(false);
  }
  
  const handleCloseTerminar = () => {
    setOpenTerminar(false);
  }

  const handleTerminarDespacho = () => {
    actualizarEstadoDespachoPorTurnoRevision(idDespachoSelected, 5)
    .then(function(response){
      actualizarOrdenPorDespacho(idDespachoSelected, 1)
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
      <ProgressBar fase={2}/>
      <div className='margin-pantalla-despacho'>
        <Grid className='titulo-revision-grid'>
            <Typography className = "titulo-revision">Balanza asignada: </Typography>
            <Typography className = "punto-control">{codigoBalanza}</Typography>
        </Grid>
        <Grid className='titulo-revision-grid'>
            <Typography className = "titulo-ordenes-text">Diríjase a la balanza y pase el código QR en el lector</Typography>
        </Grid>
        <Grid className='qrpesaje-grid'>
          {value !== null && 
            <QRCode
              size={128}
              style={{ height: "auto", maxWidth: "70%", width: "70%" }}
              value={value}
              viewBox={`0 0 128 128`}
            />
          }
        </Grid>
        <Grid className='grid-button-resultados'>
          <Button
              variant="contained" 
              className='button-resultados'
              disabled={!valorPesajeVacio}
              onClick={() => handleVerResultados()}
          >
              OBTENER RESULTADOS
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
                Pesaje terminado  
            </Typography>
        </Grid>
        <Grid className='grid-subtitulo-noaprobada'>
            <Typography className='label-subtitulo-noaprobada'>
                Por favor, dirigirse al canal de carga asignado:
            </Typography>
        </Grid>
        <Grid className='grid-balanza-asignada'>
            <Typography className='label-balanza-asignada'>
                {'Canal ' + canalCargaAsignado}
            </Typography>
        </Grid>
        <Grid className='grid-button-pesaje'>
            <Button
            className='button-ir-pesaje'
            variant='contained'
            onClick={handleIrACargaProductos}
            >
            IR A CARGA
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
            Peso incorrecto
          </Typography>
        </Grid>
        <Grid className='grid-subtitulo-noaprobada'>
          <Typography className='label-subtitulo-noaprobada'>
            {'El vehiculo tiene un peso ' + tipoDesfase + 'de:'}
          </Typography>
        </Grid>
        <Grid className='label-balanza-asignada'>
          {desfase + " kg."}
        </Grid>
        <Grid className='grid-subtitulo-noaprobada'>
          <Typography className='label-subtitulo-noaprobada'>
            Por favor, volver con el vehículo que se encuentra registrado en el sistema
          </Typography>
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