import React from 'react';
import '../../../constants/commonStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, Checkbox, FormControlLabel, FormGroup, Grid, Modal, Typography } from '@mui/material';
import './RevisionRev.css';
import * as ROUTES from '../../../routes/routes';
import { getIncidencias } from '../../../services/Despacho/Revision';

export const RevisionRev = () => {

  const { state } = useLocation();
  let navigate = useNavigate();

  const [puntoControl, setPuntoControl] = React.useState('');
  const [orden, setOrden] = React.useState('');
  const [openAbandonar, setOpenAbandonar] = React.useState(false);
  const [openAprobar, setOpenAprobar] = React.useState(false);
  const [openIncidencia, setOpenIncidencia] = React.useState(false);
  const [incidencias, setIncidencias] = React.useState([]);

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
    if(state === null || state.puntoControl === null){
      navigate(ROUTES.INICIO_REVISOR, {
        state: {
          idRevisor: localStorage.getItem('idRevisor'),
          nombres: localStorage.getItem('nombres')
        }
      });
      return;
    }
    setPuntoControl(state.puntoControl);
    setOrden({
      cliente: 'Ferreteria San Marcos',
      producto: 'Cemento LORETO',
      cantidad: '700 bolsas de 52.5 kg',
      tracto: 'CFA-485',
      carreta: 'FD-5189'
    })
    getIncidencias()
    .then(function(response){
      let arrInc = []
      response.data.forEach(element => {
        arrInc.push({
          id: element.idIncidencia,
          nombre: element.nombre,
          checked: false
        })
      });
      setIncidencias(arrInc);
    })
    .catch(function(err){
      console.log(err);
    })
    .finally(() => {

    })
  }, []);

  const handleClickAprobar = () => {
    setOpenAprobar(true);
  }

  const handleClickIncidencia = () => {
    setOpenIncidencia(true);
  }

  const handleClickAbandonar = () => {
    setOpenAbandonar(true);
  }

  const handleCloseAprobar = () => {
    setOpenAprobar(false);
  }

  const handleCloseIncidencia = () => {
    setOpenIncidencia(false);
  }

  const handleCloseAbandonar = () => {
    setOpenAbandonar(false);
  }

  const handleCheckboxChange = (id) => {
    setIncidencias((prevState) =>
      prevState.map((inc) =>
        inc.id === id ? { ...inc, checked: !inc.checked } : inc
      )
    );
  };

  return (
    <div className='margin-pantalla'>
      <Grid item container className='grid-punto-control'>
        <Typography className='text-punto-control'>
          {puntoControl}
        </Typography>
        <Typography className='text-titulo-orden'>
          Revisión de unidades físicas
        </Typography>
      </Grid>
      <Typography className='text-subtitulo-orden'>
        Datos de la orden del cliente:
      </Typography>
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
      <Typography className='text-subtitulo-orden'>
        Datos del vehículo:
      </Typography>
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
      <Grid>
        <Grid>
          <Button 
            variant="contained" 
            className='button-abandonar'
            onClick={handleClickAbandonar}
          >
              ABANDONAR REVISIÓN
          </Button>
        </Grid>
        <Grid className='grid-button-resultados'>
          <Button
            variant="contained" 
            className='button-accion'
            onClick={handleClickAprobar}
          >
            APROBAR
          </Button>
          <Button
            variant="contained" 
            className='button-accion'
            onClick={handleClickIncidencia}
          >
            HAY INCIDENCIA
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={openAprobar}
        onClose={handleCloseAprobar}
      >
        <Box sx={{ ...style}}>
          <Grid className='grid-pregunta'>
            <Typography className='modal-pregunta'>
              ¿Está seguro de aprobar el estado de la unidad física del transportista?
            </Typography>
          </Grid>
          <Grid className='modal-aprobar-buttons'>
            <Button
              className='one-button'
              variant='outlined'
              onClick={handleCloseAprobar}
            >
              VOLVER
            </Button>
            <Button
              className='one-button'
              variant='contained'
              // onClick={handleCloseAprobar}
            >
              APROBAR
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openIncidencia}
        onClose={handleCloseIncidencia}
      >
        <Box sx={{ ...style}}>
          <Grid className='grid-incidencia'>
            <Typography className='titulo-incidencia'>
              Incidencias identificadas
            </Typography>
          </Grid>
          <Grid className='grid-incidencia'>
            <Typography className='label-incidencia'>
              Marque las incidencias que se encontraron en la revisión:
            </Typography>
          </Grid>
          <Grid>
          <FormGroup className='form-incidencias'>
            {incidencias.map((inc) => {
              return (<FormControlLabel 
                id={inc.id}
                control={<Checkbox/>}
                label={inc.nombre}
                checked={inc.checked}
                onChange={() => handleCheckboxChange(inc.id)}
              />
              )}
            )}
          </FormGroup>
          </Grid>
          <Grid className='incidencia-buttons'>
            <Button
              className='one-button'
              variant='outlined'
              onClick={handleCloseIncidencia}
            >
              VOLVER
            </Button>
            <Button
              className='one-button'
              variant='contained'
              // onClick={handleCloseRegistrarIncidencias}
            >
              REGISTRAR
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openAbandonar}
        onClose={handleCloseAbandonar}
      >
        <Box sx={{ ...style}}>
          <Grid className='grid-pregunta'>
            <Typography className='modal-pregunta'>
            ¿Está seguro de abandonar el punto de control?
            </Typography>
          </Grid>
          <Grid className='modal-aprobar-buttons'>
            <Button
              className='one-button'
              variant='outlined'
              onClick={handleCloseAbandonar}
            >
              VOLVER
            </Button>
            <Button
              className='one-button'
              variant='contained'
              // onClick={handleCloseAprobar}
            >
              OK
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}
