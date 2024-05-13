import React from 'react';
import '../../../constants/commonStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, Grid, Modal, Typography } from '@mui/material';
import './RevisionRev.css';
import * as ROUTES from '../../../routes/routes';

export const RevisionRev = () => {

  const { state } = useLocation();
  let navigate = useNavigate();

  const [puntoControl, setPuntoControl] = React.useState('');
  const [orden, setOrden] = React.useState('');
  const [abandona, setAbandona] = React.useState(false);
  const [openAprobar, setOpenAprobar] = React.useState(false);

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
  }, []);

  const handleClickAprobar = () => {
    setOpenAprobar(true);
  }

  const handleCloseAprobar = () => {
    setOpenAprobar(false);
  }

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
            onClick={() => setAbandona(true)}
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
              className='modal-aprobar-volver'
              variant='outlined'
              onClick={handleCloseAprobar}
            >
              VOLVER
            </Button>
            <Button
              className='modal-aprobar-aprobar'
              variant='contained'
              // onClick={handleCloseAprobar}
            >
              APROBAR
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}
