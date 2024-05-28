import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { obtenerDatosPesaje } from '../../../../services/Despacho/PesajeVacio';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import QRCode from 'react-qr-code';
import * as ROUTES from '../../../../routes/routes';
import './PesajeLleno.css';
import { actualizarEstadoDespacho } from '../../../../services/Despacho/DespachoGeneral';

export const PesajeLleno = () => {

  let { state } = useLocation();
  let navigate = useNavigate();
  const [idColaPesaje, setIdColaPesaje] = React.useState(0);
  const [idBalanza, setIdBalanza] = React.useState('');
  const [codigoBalanza, setCodigoBalanza] = React.useState('');
  const [idDespachoSelected, setIdDespachoSelected] = React.useState(0);
  const [idPlantaSelected, setIdPlantaSelected] = React.useState(0);
  const [valorPesajeVacio, setValorPesajeVacio] = React.useState(null);
  const [valorPesajeLleno, setValorPesajeLleno] = React.useState(null);
  const [valorVehiculo, setValorVehiculo] = React.useState(0);
  const [limiteInferior, setLimiteInferior] = React.useState(0);
  const [limiteSuperior, setLimiteSuperior] = React.useState(0);
  const [cantidadProductos, setCantidadProductos] = React.useState(0);
  const [pesoUnitario, setPesoUnitario] = React.useState(0);
  const [value, setValue] = React.useState(null);
  const [openAprobado, setOpenAprobado] = React.useState(false);
  const [openTerminar, setOpenTerminar] = React.useState(false);
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
    obtenerDatosPesaje(idDespacho, 2)
    .then(function(response){
      console.log(response.data);
      const idColaPsj = response.data.idColaPesaje;
      const idBlz = response.data.idZonaBalanza;
      const codigoBlz = response.data.codigoZonaBalanza;
      const valorPsjVacio = response.data.valorPesajeVacio;
      const valorPsjLleno = response.data.valorPesajeLleno;
      const posicion = response.data.posicion;
      const valorPsjVehiculo = response.data.valorVehiculo;
      const limiteInf = response.data.limiteInf;
      const limiteSup = response.data.limiteSup;
      const cantidadPrd = response.data.cantidadProductos;
      const pesoUnit = response.data.pesoUnitario;
      setIdColaPesaje(idColaPsj)
      setIdBalanza(idBlz)
      setValorVehiculo(valorPsjVehiculo);
      setLimiteInferior(limiteInf);
      setLimiteSuperior(limiteSup);
      setValorPesajeVacio(valorPsjVacio);
      setCantidadProductos(cantidadPrd);
      setPesoUnitario(pesoUnit);
      if(idBlz === 0){
        setCodigoBalanza("BN");
      } else {
        setCodigoBalanza(codigoBlz);
        setValue("IdColaPesaje/" + idColaPsj + "/Balanza/" + idBlz + "/Despacho/" + idDespacho + "/Posicion/" + posicion)
      }
      if(valorPsjLleno !== null) setValorPesajeLleno(valorPsjLleno);
    })
    .catch(function(err){
      console.log(err);
    })
  }, [])

  const handleVerResultados = () => {
    const pesoPromedio = (valorPesajeLleno - valorPesajeVacio) / cantidadProductos;
    const pesoMinimo = pesoUnitario - limiteInferior;
    const pesoMaximo = pesoUnitario + limiteSuperior;
    if(pesoPromedio < pesoMinimo){
      setDesfase(parseInt((pesoMinimo - pesoPromedio) * cantidadProductos));
      setTipoDesfase("menos");
      setOpenTerminar(true);
      return;
    } 
    if (pesoPromedio > pesoMaximo){
      setDesfase(parseInt((pesoPromedio - pesoMaximo) * cantidadProductos));
      setTipoDesfase("extra");
      setOpenTerminar(true);
      return;
    }
    setOpenAprobado(true);
  }

  const handleIrASalida = () => {
    actualizarEstadoDespacho(idDespachoSelected, 10)
    .then(function(response){
      navigate(ROUTES.DESPACHO_SALIDA, {
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

  const volverADespacho = () => {
  
  }

  return (
    <>
      <ProgressBar fase={4}/>
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
              disabled={!valorPesajeLleno}
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
              <Typography className='titulo-modal'>
                  Pesaje terminado  
              </Typography>
          </Grid>
          <Grid className='grid-subtitulo-noaprobada'>
              <Typography className='label-subtitulo-noaprobada'>
                Por favor, recoja los documentos de la impresora:
              </Typography>
          </Grid>
          <Grid className='grid-documentos'>
              <Typography className='label-documentos'>
                · Guía de Remisión
              </Typography>
              <Typography className='label-documentos'>
                · Hoja de pesos y medidos
              </Typography>
              <Typography className='label-documentos'>
                · Ticket de salida
              </Typography>
          </Grid>
          <Grid className='grid-button-pesaje'>
              <Button
              className='button-ir-pesaje'
              variant='contained'
              onClick={handleIrASalida}
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
          <Typography className='titulo-modal'>
            Peso incorrecto
          </Typography>
        </Grid>
        <Grid className='grid-subtitulo-noaprobada'>
          <Typography className='label-subtitulo-noaprobada'>
            {'Los productos recogidos tienen un peso' + tipoDesfase + 'de:'}
          </Typography>
        </Grid>
        <Grid className='label-balanza-asignada'>
          {desfase + " kg."}
        </Grid>
        <Grid className='grid-subtitulo-noaprobada'>
          <Typography className='label-subtitulo-noaprobada'>
            Por favor, volver al despacho para revisar la carga
          </Typography>
        </Grid>
        <Grid className='modal-aprobar-buttons'>
          <Button
          className='one-button'
          variant='contained'
          onClick={volverADespacho}
          >
            VOLVER A DESPACHO
          </Button>
        </Grid>
        </Box>
      </Modal>
    </>
  )
}
