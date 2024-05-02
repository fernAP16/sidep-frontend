import React from 'react';
import './InicioConductor.css';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import OrdenesCard from '../../../components/OrdenesCard/OrdenesCard';
import { getOrdenesByIdConductor, registrarDespachoByIdOrden } from '../../../services/Inicio/InicioConductor';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetterInWords, formatoHoraMMSS_AMPM } from '../../../constants/commonfunctions';
import '../../../constants/commonStyle.css';
import * as ROUTES from '../../../routes/routes';

const InicioConductor = () => {

  let { state } = useLocation();
  let navigate = useNavigate();

  const [nombres, setNombres] = React.useState('');
  const [ordenes, setOrdenes] = React.useState([]);
  const [ordenesFull, setOrdenesFull] = React.useState([]);
  const [openToConfirm, setOpenToConfirm] = React.useState(false);
  const [openRegistered, setOpenRegistered] = React.useState(false);
  const [openErrors, setOpenErrors] = React.useState(false);
  const [ordenDespachar, setOrdenDespachar] = React.useState({});
  const [messageError, setMessageError] = React.useState([]);
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "5px",
    pt: 2,
    px: 2,
    pb: 3,
  };

  React.useEffect(() => {
    let nomb = (state && state.nombres) ? state.nombres.split(' ') : localStorage.getItem('nombres').split(' ');
    setNombres(nomb[0].charAt(0) + nomb[0].slice(1).toLowerCase() + " " + nomb[1].charAt(0) + nomb[1].slice(1).toLowerCase());
    getOrdenesByIdConductor((state && state.idConductor) ? state.idConductor : localStorage.getItem('idConductor'))
    .then(function(response){
      let array = [];
      let arrayFull = [];
      response.data.forEach(element => {
        array.push({
          idOrden: element.idOrdenRecojo,
          cliente: element.sedeCliente.cliente.razonSocial,
          producto: element.productoVenta.producto.nombre,
          marca: element.productoVenta.marca.nombre,
          unidad: element.productoVenta.unidad.nombre,
          cantidad: element.cantidad
        })
        arrayFull.push(element);
      });
      setOrdenes(array);
      setOrdenesFull(arrayFull);
    })
    .catch(function(error){
      console.log(error);
    })
    .finally({

    })
  }, []);

  const detalleOrden = (ord) => {
    let ordenDetalle = ordenesFull.filter((orden) => orden.idOrdenRecojo === ord.idOrden)
    localStorage.setItem('ordenDetalle', ordenDetalle[0]);
    navigate(ROUTES.DETALLE_CONDUCTOR, {
      state: {
          orden: ordenDetalle[0],
          nombres: nombres,
          idConductor: (state && state.idConductor) ? state.idConductor : localStorage.getItem('idConductor')
      }
    })
  }

  const despachar = (ord) => {
    let ordenReg = ordenesFull.filter((orden) => orden.idOrdenRecojo === ord.idOrden)
    setOrdenDespachar(ordenReg[0]);
    setOpenToConfirm(true);
  }

  const handleCloseToConfirm = () => {
    setOpenToConfirm(false);
  };

  const handleCloseErrors = () => {
    setOpenErrors(false);
  }

  const handleCloseRegistered = () => {
    setOpenRegistered(false);
  };
  
  const handleVolver = () => {
    setOpenToConfirm(false);
  };

  const handleRegistrar = () => {
    registrarDespachoByIdOrden(ordenDespachar.idOrdenRecojo)
    .then(function(response){
      console.log(response);
      let errorMessage = response.data.errorMessage;
      let parts = errorMessage.split("+").filter(part => part.trim() !== "");
      let formattedMessages = parts.map((part) => part.trim());
      if(response.data.idDespacho !== null){
        setOpenRegistered(true);
      } else {
        setMessageError(formattedMessages);
        setOpenErrors(true);
      }
    })
    .catch(function(err){
      console.log(err);
    })
    .finally(() => {

    })
    setOpenToConfirm(false);
  }
  

  return (
    <div className='margin-pantalla'>
      <Grid className='titulo-usuario-grid'>
        <Typography className = "titulo-usuario-text">Hola, {nombres}</Typography>
      </Grid>
      <Grid className='titulo-ordenes-grid'>
        <Typography className = "titulo-ordenes-text">Órdenes de recojo registradas ({ordenes.length}):</Typography>
      </Grid>
      {ordenes.map((ord) => {
        return (<OrdenesCard
          orden={ord}
          esInicio
          detalleAction={() => detalleOrden(ord)}
          despacharAction={() => despachar(ord)}
        />
      )
      })}
      <Modal
        open={openToConfirm}
        onClose={handleCloseToConfirm}
      >
        <Box sx={{ ...style}}>
          <Grid>
            <Typography className='modal-title'>
              ¿Desea registrar su ingreso al despacho de productos?
            </Typography>
          </Grid>
          <Grid className='modal-botones'>
            <Button
              variant="outlined"
              className='modal-boton'
              onClick={() => handleVolver()}
            >
              Volver
            </Button>
            <Button
              variant="contained"
              className='modal-boton'
              onClick={() => handleRegistrar()}
            >
              OK
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openErrors}
        onClose={handleCloseErrors}
      >
        <Box sx={{ ...style}}>
          <Grid>
            <Typography className='modal-title'>
              Ingreso rechazado
            </Typography>
          </Grid>
          <Grid>
            <Typography className='modal-text'>
              Debe renovar los siguientes documentos:
            </Typography>
            <Typography className='modal-text-error'>
              {messageError.map((mes, index) => {
                return (
                  <div style={{marginBottom: "5px"}}>{index+1}. {" " + mes + "\n"}</div>
                )
              })}
            </Typography>
          </Grid>
          <Grid className='modal-grid-boton'>
            <Button
              variant="contained"
              className='modal-boton-solo'
              onClick={() => handleCloseErrors()}
            >
              OK
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openRegistered}
        onClose={handleCloseRegistered}
      >
        <Box sx={{ ...style}}>
          <Grid>
            <Typography className='modal-title'>
              Entrada registrada
            </Typography>
            <Typography className='modal-hora'> 
              Hora entrada {" " + formatoHoraMMSS_AMPM(new Date())}
            </Typography>
            <Grid>
              <Button
                variant="contained"
                className='modal-boton-solo'
                onClick={() => handleCloseRegistered()}
              >
                OK
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default InicioConductor;
