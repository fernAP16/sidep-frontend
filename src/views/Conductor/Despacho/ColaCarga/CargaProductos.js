import React from 'react'
import { finalizarCarga, obtenerDatosCompletos } from '../../../../services/Despacho/CargaProductos'
import { useLocation, useNavigate } from 'react-router-dom';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { Box, Button, Card, Grid, Modal, Typography } from '@mui/material';
import RelojIcon from '../../../../assets/icons/relojRed.svg';
import * as ROUTES from '../../../../routes/routes';
import './CargaProductos.css';
import { actualizarEstadoDespacho } from '../../../../services/Despacho/DespachoGeneral';
import { registrarColaBalanzaVacio } from '../../../../services/Despacho/PesajeVacio';

export const CargaProductos = () => {

  let { state } = useLocation();
  let navigate = useNavigate();
  const [idDespachoActual, setIdDespachoActual] = React.useState(0);
  const [idPlantaActual, setIdPlantaActual] = React.useState(0);
  const [idOrdenActual, setIdOrdenActual] = React.useState(0);
  const [idColaCanal, setIdColaCanal] = React.useState(0);
  const [idCanalCarga, setIdCanalCarga] = React.useState(0);
  const [codigoCanalCarga, setCodigoCanalCarga] = React.useState('');
  const [razonSocial, setRazonSocial] = React.useState('');
  const [producto, setProducto] = React.useState('');
  const [cantidad, setCantidad] = React.useState('');
  const [horaInicioDate, setHoraInicioDate] = React.useState(new Date());
  const [horaInicio, setHoraInicio] = React.useState('');
  const [horaFin, setHoraFin] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [textoBoton, setTextoBoton] = React.useState('');
  const [timer, setTimer] = React.useState(null);
  const [textoTimer, setTextoTimer] = React.useState('');
  const [finalizado, setFinalizado] = React.useState(false);
  const [tiempoEmpleado, setTiempoEmpleado] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const intervalRef = React.useRef(null);
  const textoTimerRef = React.useRef(textoTimer);
  let render = true;
  let segundos = 0;
  let minutos = 0;
  let horas = 0;

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
    intervalRef.current = timer;
  }, [timer]);

  React.useEffect(() => {
    textoTimerRef.current = textoTimer;
  }, [textoTimer]);

  function calcularDiferenciaTiempo(fechaInicio, fechaFin) {
    // Calcular la diferencia en milisegundos
    const diferencia = fechaFin - fechaInicio;
  
    // Calcular las horas, minutos y segundos
    const segundosTotales = Math.floor(diferencia / 1000);
    const horas = Math.floor(segundosTotales / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;
  
    // Devolver un objeto con las horas, minutos y segundos
    return {
      horas,
      minutos,
      segundos
    };
  }

  React.useEffect(() => {
    if(render){
      render = false;
      const idDsp = state.idDespacho;
      const idPlt = state.idPlanta;
      setIdDespachoActual(idDsp);
      setIdPlantaActual(idPlt);
      obtenerDatosCompletos(idDsp)
      .then(function(response){
        setIdOrdenActual(response.data.idOrdenRecojo);
        setIdColaCanal(response.data.idColaCanal);
        setIdCanalCarga(response.data.idCanalCarga);
        setCodigoCanalCarga(response.data.codigoCanalCarga);
        setRazonSocial(response.data.razonSocial);
        setProducto(response.data.producto);
        setCantidad(response.data.cantidad);
        const fechaInicio = new Date(response.data.horaInicio);
        setHoraInicioDate(fechaInicio);
        console.log(fechaInicio);
        const horaIni = fechaInicio.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        setHoraInicio(horaIni);
        if(response.data.horaFin === null){
          const diferenciaHoras = calcularDiferenciaTiempo(fechaInicio, new Date());
          horas = diferenciaHoras.horas;
          minutos = diferenciaHoras.minutos;
          segundos = diferenciaHoras.segundos;
          setHoraFin('-');
          setEstado("Despachando");
          setTextoBoton("FINALIZAR CARGA");
          intervalRef.current = setInterval(() => {
            console.log(segundos);
            if (segundos === 59) {
              segundos = 0;
              minutos++;
            } else {
              segundos++;
            }
            if (minutos === 59) {
              minutos = 0
              horas++;
            }
            const formattedHours = String(horas);
            const formattedMinutes = String(minutos);
            const formattedSeconds = String(segundos);
            setTextoTimer(`${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`);
          }, 1000);
          return () => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          };
        }
        else {
          const horaFinResp = response.data.horaFin
          if(horaFinResp !== null){
            const fechaFin = new Date(horaFinResp);
            const diferenciaHoras = calcularDiferenciaTiempo(fechaInicio, fechaFin);
            const formattedHours = String(diferenciaHoras.horas);
            const formattedMinutes = String(diferenciaHoras.minutos);
            const formattedSeconds = String(diferenciaHoras.segundos);
            setTiempoEmpleado(`${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`);
            const horaFin = fechaFin.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            setHoraFin(horaFin);
            setEstado("Terminado");
            setTextoBoton("IR A PESAJE");
            setFinalizado(true);
          } else {
            console.log("Error");
          }
        }
      })
      .catch(function(err){
        console.log(err);
      })
    }
  }, [state])

  const handleClickBoton = () => {
    if(finalizado){
      registrarColaBalanzaVacio(idPlantaActual, idDespachoActual, 2)
      .then(function(response){
        const idPesajeVacio = response.data.idColaBalanzaNuevo;
        if(idPesajeVacio !== null){
          actualizarEstadoDespacho(idDespachoActual, 8)
          .then(function(response){
            navigate(ROUTES.DESPACHO_PESAJE_LLENO, {
              state: {
                  idDespacho: idDespachoActual,
                  idPlanta: idPlantaActual
              }
          });
          })
          .catch(function(err){
            console.log(err);
          })
        } else console.log(response.data);
      })
      .catch(function(err){
        console.log(err);
      })
      
    } else setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }

  const handleRegistrarSalida = () => {
    setOpenConfirm(false);
    finalizarCarga(idDespachoActual, idColaCanal)
    .then(function(response){
      if(response.data){
        setFinalizado(true);
        obtenerDatosCompletos(idDespachoActual)
        .then(function(response){
          const horaFinResp = response.data.horaFin
          if(horaFinResp !== null){
          const fechaFin = new Date(response.data.horaFin);
          const diferenciaHoras = calcularDiferenciaTiempo(horaInicioDate, fechaFin);
          const formattedHours = String(diferenciaHoras.horas);
          const formattedMinutes = String(diferenciaHoras.minutos);
          const formattedSeconds = String(diferenciaHoras.segundos);
          setTiempoEmpleado(`${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`);
          const horaFin = fechaFin.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
          setHoraFin(horaFin);
          setEstado("Terminado");
          setTextoBoton("IR A PESAJE");
          setFinalizado(true);
          }
        })
        .catch(function(err){
          console.log(err);
        })
      } 
    })
    .catch(function(err){

    })
  }

  const clearTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  return (
    <>
      <ProgressBar fase={3}/>
      <div className='margin-pantalla-despacho'>
        <Grid className='grid-colacarga-titulo'>
          <Typography className = "typography-colacarga-titulo">Usted está en el canal: </Typography>
          <Typography className = "typography-colacarga-canal">{codigoCanalCarga}</Typography>
        </Grid>
        <Grid className='grid-colacarga-pedido'>
            <Typography className = "typography-colacarga-indicacion">
              Detalle del pedido a recoger:
            </Typography>
        </Grid>
        <Card className='card-orden'>
          <Grid style={{ marginBottom: "10px" }} className='grid-orden'>
            <Typography className='card-titulo'>
              Producto:
            </Typography>
            <Typography className='card-datos'>
              {producto}
            </Typography>
          </Grid>
          <Grid className='grid-orden'>
            <Typography className='card-titulo'>
              Cantidad:
            </Typography>
            <Typography className='card-datos'>
              {cantidad}
            </Typography>
          </Grid>
        </Card>
        <Grid className='grid-colacarga-estado'>
            <Typography className = "typography-colacarga-indicacion">
              {"Estado de la carga: "}
            </Typography>
            <Typography className = "typography-colacarga-estado">
              {estado}
            </Typography>
        </Grid>
        <Card className='card-tiempo'>
          <Grid className='grid-horas'>
            <Grid className='grid-hora-separado'>
              <Typography className='typography-hora'>
                Inicio:
              </Typography>
              <Typography className='typography-hora-datos'>
                {horaInicio}
              </Typography>
            </Grid>
            <Grid className='grid-orden'>
              <Typography className='typography-hora'>
                Fin:
              </Typography>
              <Typography className='typography-hora-datos'>
                {horaFin}
              </Typography>
            </Grid>
          </Grid>
          <Grid className='grid-cronometro'>
            <Grid className='img-reloj'>
              <img
                src={RelojIcon}
                alt="Tiempo"
              />
            </Grid>
            <Grid className='typography-tiempo'>
              <Typography className='card-datos'>
                {(finalizado ? tiempoEmpleado : textoTimer)}
              </Typography>
            </Grid>
          </Grid>
        </Card>
        <Grid>
          <Button
            variant='contained'
            onClick={() => handleClickBoton()}
            className='button-cola'
          >
            {textoBoton}
          </Button>
        </Grid>
        <Modal
          open={openConfirm}
          onClose={handleCloseConfirm}
        >
          <Box sx={{ ...style}}>
            <Grid className='grid-pregunta'>
              <Typography className='modal-pregunta'>
                ¿Desea finalizar la carga de productos en el vehículo?
              </Typography>
            </Grid>
            <Grid className='modal-aprobar-buttons'>
              <Button
                className='one-button'
                variant='outlined'
                onClick={handleCloseConfirm}
              >
                VOLVER
              </Button>
              <Button
                className='one-button'
                variant='contained'
                onClick={handleRegistrarSalida}
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

// INICIAR CARGA DE PRODUCTOS

