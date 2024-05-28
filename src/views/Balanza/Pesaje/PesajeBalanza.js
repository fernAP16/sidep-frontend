import { Box, Button, Card, FormControlLabel, Grid, MenuItem, Modal, Select, Switch, TextField, Typography, styled } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../routes/routes';
import { obtenerDatosDespachoPorPesaje } from '../../../services/Despacho/PesajeVacio';
import './PesajeBalanza.css'
import { agregarPesaje } from '../../../services/Despacho/DespachoGeneral';

export const PesajeBalanza = () => {

  let { state } = useLocation();
  let navigate = useNavigate();
  const [idColaPesaje, setIdColaPesaje] = React.useState(0);
  const [codigoBalanza, setCodigoBalanza] = React.useState('');
  const [idDespacho, setIdDespacho] = React.useState(0);
  const [idBalanza, setIdBalanza] = React.useState(0);
  const [unidad, setUnidad] = React.useState("TN.");
  const [orden, setOrden] = React.useState({});
  const [hayPesaje, setHayPesaje] = React.useState(false);
  const [mostrarDatos, setMostrarDatos] = React.useState(true);
  const [pesoRegistrado, setPesoRegistrado] = React.useState('');
  const [pesoFloat, setPesoFloat] = React.useState(0);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openRegistrado, setOpenRegistrado] = React.useState(false);

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 275,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "5px",
    pt: 2,
    px: 2,
    pb: 3,
  };

  React.useEffect(() => {
    if(state === null){
      navigate(ROUTES.INICIO_BALANZA, {
        state: {
          idBalanza: localStorage.getItem('idBalanza'),
          codigoBalanza: localStorage.getItem('codigoBalanza')
        }
      });
      return;
    }
    const idColaPsj = state.idColaPesaje;
    const codigoBlz = state.codigoBalanza;
    const idDsp = state.idDespacho;
    const idBlz = state.idBalanza;
    setIdColaPesaje(idColaPsj);
    setCodigoBalanza(codigoBlz);
    setIdDespacho(idDsp);
    setIdBalanza(idBlz);
    obtenerDatosDespachoPorPesaje(idColaPsj)
    .then(function(response){
      if(response.data.razonSocial !== null){
        setOrden({
          cliente: response.data.razonSocial,
          producto: response.data.producto,
          cantidad: response.data.cantidad,
          tracto: response.data.placaTracto,
          carreta: response.data.placaCarreta
        })
        setHayPesaje(true);
      } else {
        setOrden({
          cliente: '',
          producto: '',
          cantidad: '',
          tracto: '',
          carreta: ''
        })
        setHayPesaje(false);
      }
    })
    .catch(function(err){
      console.log(err);
    })
    // Obtener datos
  }, [])

  const handleChangeCheck = (event) => {
    setMostrarDatos(event.target.checked);
  };

  const handleChange = (event) => {
    setUnidad(event.target.value);
  };

  const handleRegistrarPeso = () => {
    const float = parseFloat(pesoRegistrado);
    setPesoFloat(float);
    setOpenConfirm(true);
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }

  const handleChangePeso = (event) => {
    const { value } = event.target;

    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(value)) {
      setPesoRegistrado(value);
    }
  }

  const handleAccionRegistrarPeso = () => {
    let peso = pesoFloat;
    setOpenConfirm(false);
    if(unidad === "TN.") peso *= 1000;
    agregarPesaje(idDespacho, peso, 2, idBalanza)
    .then(function(response){
      if(response.data === 1) setOpenRegistrado(true);
      else console.log(response.data);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  const handleCloseRegistrado = () => {
    setOpenRegistrado(false);
    navigate(ROUTES.INICIO_BALANZA, {
      state: {
        idBalanza: localStorage.getItem('idBalanza'),
        codigoBalanza: localStorage.getItem('codigoBalanza')
      }
    });
    return;
  }
  
  return (
    <div className='margin-pantalla'>
      <Grid className='grid-titulo-pesaje'>
        <Typography className='codigo-titulo-inicio'>
          {codigoBalanza}
        </Typography>
        <Typography className='label-titulo-inicio'>
          Pesaje antes de carga
        </Typography>
      </Grid>
      <Typography className='label-ingresar-inicio'>
          Ingresar peso del vehículo:
        </Typography>
      <Grid className='grid-peso-vehiculo'>
        <TextField 
          value={pesoRegistrado}
          onChange={handleChangePeso}
          className='textfield-peso-vehiculo'
          size='small'
        />
        <Select
          value={unidad}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{ width: "80px"}}
          size='small'
        >
          <MenuItem value={"TN."} defaultValue>TN.</MenuItem>
          <MenuItem value={"kg."}>kg.</MenuItem>
        </Select>
      </Grid>
      <Grid className='grid-datos-pesaje'>
        <Typography className='label-ingresar-inicio'>
          Ver datos del cliente
        </Typography>
        <FormControlLabel
          control={<Android12Switch defaultChecked checked={mostrarDatos} onChange={handleChangeCheck}/>}
          style={{ marginLeft: "5px"}}
          
        />
      </Grid>

      { (hayPesaje && mostrarDatos) ? 
      <>
        <Card className='card-orden'>
          <Grid style={{ marginBottom: "10px" }} className='grid-orden'>
            <Typography className='card-titulo'>
              Cliente:
            </Typography>
            <Typography className='card-datos'>
              {orden.cliente}
            </Typography>
          </Grid>
          <Grid style={{ marginBottom: "10px" }} className='grid-orden'>
            <Typography className='card-titulo'>
              Producto:
            </Typography>
            <Typography className='card-datos'>
              {orden.producto}
            </Typography>
          </Grid>
          <Grid className='grid-orden'>
            <Typography className='card-titulo'>
              Cantidad:
            </Typography>
            <Typography className='card-datos'>
              {orden.cantidad}
            </Typography>
          </Grid>
        </Card>
        <Card className='card-vehiculo'>
          <Grid className='card-vehiculo-titulos'>
            <Grid className='card-vehiculo-header'>
              <Typography>
                Tracto
              </Typography>
            </Grid>
            <Grid className='card-vehiculo-header'>
            <Typography>
                Carreta
              </Typography>
            </Grid>
          </Grid>
          <Grid className='card-vehiculo-datos'>
            <Grid className='card-vehiculo-dato'>
              <Typography>
                {orden.tracto}
              </Typography>
            </Grid>
            <Grid className='card-vehiculo-dato'>
              <Typography>
                {orden.carreta}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </>
      :
      <div style={{ height: "255px"}}>
      </div>
      }
      <Button
        variant='contained'
        className='button-registrar-peso'
        onClick={handleRegistrarPeso}
      >
        REGISTRAR PESO DEL VEHÍCULO
      </Button>
      <Modal
        open={openConfirm}
        onClose={handleCloseConfirm}
      >
        <Box sx={{ ...style}}>
          <Grid className='grid-pregunta'>
            <Typography className='modal-pregunta'>
              ¿Desea registrar el peso del vehículo?
            </Typography>
          </Grid>
          <Grid className='modal-grid-unidad'>
            <Typography className='modal-unidad'>
              {pesoRegistrado + ' ' + unidad}
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
              onClick={handleAccionRegistrarPeso}
            >
              OK
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openRegistrado}
        onClose={handleCloseRegistrado}
      >
        <Box sx={{ ...style}}>
          <Grid className='grid-registrado'>
            <Typography className='typography-registrado'>
              Peso registrado
            </Typography>
          </Grid>
          <Grid className='modal-grid-unidad'>
            <Typography className='typography-peso'>
              {pesoRegistrado + ' ' + unidad}
            </Typography>
          </Grid>
          <Grid className='modal-aprobar-buttons'>
            <Button
              className='button-volver'
              variant='contained'
              onClick={handleCloseRegistrado}
            >
              OK
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}
