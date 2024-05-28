import React, { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { Scanner } from '@yudiel/react-qr-scanner';
import { actualizarEstadoDespacho, registrarSalidaDespacho } from '../../../../services/Despacho/DespachoGeneral';
import * as ROUTES from '../../../../routes/routes';
import './Salida.css'

export const Salida = () => {

  let { state } = useLocation();
  let navigate = useNavigate();
  const [idDespachoSelected, setIdDespachoSelected] = React.useState(0);
  const [idPlantaSelected, setIdPlantaSelected] = React.useState(0);
  let [qrSalida, setQrSalida] = React.useState(0);
  const [isScanning, setIsScanning] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [mensajeError, setMensajeError] = React.useState('');
  const [openSalida, setOpenSalida] = React.useState(false);
  const [horaSalida, setHoraSalida] = React.useState('');
  const qrSalidaRef = React.useRef(qrSalida);
  const isScanningRef = React.useRef(true);
  const errorRef = React.useRef(error);
  const mensajeErrorRef = React.useRef(mensajeError);
  let despachoRef = React.useRef(idDespachoSelected);
  let plantaRef = React.useRef(idPlantaSelected);

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
    qrSalidaRef.current = qrSalida;
  }, [qrSalida]);

  React.useEffect(() => {
    isScanningRef.current = isScanning;
  }, [isScanning])

  React.useEffect(() => {
    errorRef.current = error;
  }, [error])

  React.useEffect(() => {
    mensajeErrorRef.current = mensajeError;
  }, [mensajeError])

  React.useEffect(() => {
    despachoRef.current = idDespachoSelected;
  }, [idDespachoSelected])

  React.useEffect(() => {
    plantaRef.current = idPlantaSelected;
  }, [idPlantaSelected])

  React.useEffect(() => {
    const idDespacho = state.idDespacho;
    const idPlanta = state.idPlanta;
    setIdDespachoSelected(idDespacho);
    setIdPlantaSelected(idPlanta);
    return () => {
      console.log("Component unmounted");
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, []);

  const handleOnResult = useCallback((result, error) => {
    if(!isScanning || !isScanningRef.current) return;
    if (!error) {
      console.error(error);
      return;
    }

    if (result) {
      registrarSalidaDespacho(idPlantaSelected, result, idDespachoSelected)
      .then(function(response){
        console.log(response.data);
        if(response.data !== null && response.data !== ""){
          const fechaSalida = new Date(response.data);
          const horaFin = fechaSalida.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
          setHoraSalida(horaFin);
          setOpenSalida(true);
        }
      })
      .catch(function(err){
        console.log(err);
      })
    }
  }, [navigate, idDespachoSelected, idPlantaSelected]);

  const handleTerminarDespacho = () => {
    actualizarEstadoDespacho(idDespachoSelected, 11)
    .then(function(response){
      navigate(ROUTES.INICIO_CONDUCTOR);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  const handleCloseSalida = () => {
    setOpenSalida(false);
  }

  return (
    <>
      <ProgressBar fase={5}/>
      <div className='margin-pantalla-despacho'>
        <Grid className='titulo-revision-grid'>
          <Typography className = "titulo-ordenes-text">
            Diríjase al módulo de salida y escanee el código QR mostrado
          </Typography>
        </Grid>
        <Grid>
        {isScanningRef.current && (
          <Scanner
            onResult={handleOnResult}
            constraints={{ video: { facingMode: 'environment'} }}
            components={{ audio: false }}
          />
        )}
      </Grid>
      <Modal
        open={openSalida}
        onClose={handleCloseSalida}
      >
        <Box sx={{ ...style}}>
        <Grid className='grid-titulo-noaprobada'>
            <Typography className='modal-titulo-salida'>
                Salida registrada
            </Typography>
        </Grid>
        <Grid className='grid-balanza-asignada'>
            <Typography className='label-salida'>
                {'Hora salida: ' + horaSalida}
            </Typography>
        </Grid>
        <Grid className='grid-button-pesaje'>
            <Button
              className='button-ir-pesaje'
              variant='contained'
              onClick={handleTerminarDespacho}
            >
              TERMINAR DESPACHO
            </Button>
        </Grid>
        </Box>
      </Modal>
      </div>
    </>
  )
}
