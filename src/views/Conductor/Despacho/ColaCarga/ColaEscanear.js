import React, { useCallback } from 'react'
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { Scanner } from '@yudiel/react-qr-scanner';
import { verificarCanal } from '../../../../services/Despacho/CargaProductos';
import * as ROUTES from '../../../../routes/routes';
import './ColaEscanear.css';
import { actualizarEstadoDespacho } from '../../../../services/Despacho/DespachoGeneral';

export const ColaEscanear = () => {

  let { state } = useLocation();
  let navigate = useNavigate();
  const [idDespachoActual, setIdDespachoActual] = React.useState(3);
  const [idPlantaActual, setIdPlantaActual] = React.useState(1);
  const [idCanalCarga, setIdCanalCarga] = React.useState(1);
  const [codigoCanalCarga, setCodigoCanalCarga] = React.useState('');
  const [isScanning, setIsScanning] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [mensajeError, setMensajeError] = React.useState('');
  const [tituloModal, setTituloModal] = React.useState('');
  const isScanningRef = React.useRef(true);
  const errorRef = React.useRef(error);
  const mensajeErrorRef = React.useRef(mensajeError);
  const tituloModalRef = React.useRef(tituloModal);

  React.useEffect(() => {
    setIdDespachoActual(state.idDespacho);
    setIdPlantaActual(state.idPlanta);
    setIdCanalCarga(state.idCanalCarga);
    setCodigoCanalCarga(state.codigoCanalCarga);
    return () => {
      console.log("Component unmounted");
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, [])

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
    isScanningRef.current = isScanning;
  }, [isScanning])

  React.useEffect(() => {
    errorRef.current = error;
  }, [error])

  React.useEffect(() => {
    mensajeErrorRef.current = mensajeError;
  }, [mensajeError])

  React.useEffect(() => {
    tituloModalRef.current = tituloModal;
  }, [tituloModal])

  const handleVerificarCanal = useCallback((result, error) => {
    console.log(result);
    if(!isScanning || !isScanningRef.current)return;
    if (!error) {
      console.error(error);
      return;
    }
    if (result) {
      verificarCanal(idCanalCarga, result)
      .then(function(response){
        if(response.data){
          actualizarEstadoDespacho(idDespachoActual, 7)
          .then(function(response){
            if(response.data){
              navigate(ROUTES.DESPACHO_CARGA_PRODUCTOS, {
                state: {
                    idDespacho: idDespachoActual,
                    idPlanta: idPlantaActual
                }
              });
            } else {
              setTituloModal("Error");
              setMensajeError("Se produjo un error de conexión a internet");
              setError(true);
            }
          })
          .catch(function(err){
            console.log(err);
          })
        } else {
          setTituloModal("Canal incorrecto");
          setMensajeError("Por favor, acudir al canal de carga que le fue asignado");
          setError(true);
        }
      })
      .catch(function(err){
        console.log(err);
      })
    }
  }, [idCanalCarga, codigoCanalCarga, navigate]);

  const handleCloseError = () => {
    setError(false);
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
              Escanee el código QR que tiene al alcance
            </Typography>
        </Grid>
        <Grid className='grid-scanner-colacarga'>
          <Grid className='scanner-colacarga'>
            <Scanner
              onResult={handleVerificarCanal}
              constraints={{ video: { facingMode: 'environment'} }}
              components={{ audio: false }}
            />
          </Grid>
        </Grid>
        <Modal
          open={error}
          onClose={handleCloseError}
        >
          <Box sx={{ ...style}}>
            <Grid className='grid-titulo-error'>
              <Typography className='typography-titulo-error'>
                  {tituloModal}
              </Typography>
            </Grid>
            <Grid className='grid-texto-error'>
                <Typography className='typography-texto-error'>
                    {mensajeError}
                </Typography>
            </Grid>
            <Grid className='grid-button-error'>
              <Button
                className='button-error'
                variant='contained'
                onClick={handleCloseError}
                >
                OK
              </Button>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  )
}
