import React from 'react';
import '../../../constants/commonStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, Checkbox, FormControlLabel, FormGroup, Grid, Modal, Typography } from '@mui/material';
import './RevisionRev.css';
import * as ROUTES from '../../../routes/routes';
import { aprobarRevision, asignarPuntoControlYRevisor, getDespachoByIdTurnoRevision, getIncidencias, registrarIncidencias, registrarSalidaRevisor } from '../../../services/Despacho/Revision';

export const RevisionRev = () => {

  const { state } = useLocation();
  let navigate = useNavigate();

  const [idRevisor, setIdRevisor] = React.useState(null);
  const [codigoPuntoControl, setCodigoPuntoControl] = React.useState('');
  const [idPuntoControl, setIdPuntoControl] = React.useState('');
  const [idTurnoRevision, setIdTurnoRevision] = React.useState(null);
  const [orden, setOrden] = React.useState('');
  const [openAbandonar, setOpenAbandonar] = React.useState(false);
  const [openAprobar, setOpenAprobar] = React.useState(false);
  const [openIncidencia, setOpenIncidencia] = React.useState(false);
  const [incidencias, setIncidencias] = React.useState([]);
  const [accionRealizada, setAccionRealizada] = React.useState(false);
  const [labelAccion, setLabelAccion] = React.useState('');
  const [hayRevision, setHayRevision] = React.useState(false);

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
    const idRevisor = ((state && state.idRevisor) ? state.idRevisor : parseInt(localStorage.getItem('idRevisor')));
    const idPuntoControl = ((state && state.idPuntoControl) ? state.idPuntoControl : parseInt(localStorage.getItem('idPuntoControl')));
    const codigoPuntoControl = ((state && state.codigoPuntoControl) ? state.codigoPuntoControl : 'C' + parseInt(localStorage.getItem('idPuntoControl')));
    const idTurnoRevision = ((state && state.idTurnoRevision) ? state.idTurnoRevision : parseInt(localStorage.getItem('idTurnoRevision')));
    const idPlanta = ((state && state.idPlanta) ? state.idPlanta : parseInt(localStorage.getItem('idPlanta')));
    setIdRevisor(idRevisor);
    setCodigoPuntoControl(codigoPuntoControl);
    setIdPuntoControl(idPuntoControl);
    setIdTurnoRevision(idTurnoRevision);
    console.log(idTurnoRevision)
    if(!idTurnoRevision){
      setOrden({
        cliente: '',
        producto: '',
        cantidad: '',
        tracto: '',
        carreta: '',
      })
      setHayRevision(false);
      return;
    } else {
      getDespachoByIdTurnoRevision(idTurnoRevision)
      .then(function(response){
        if(response.data.razonSocial !== null){
          setOrden({
            cliente: response.data.razonSocial,
            producto: response.data.producto,
            cantidad: response.data.cantidad,
            tracto: response.data.placaTracto,
            carreta: response.data.placaCarreta
          })
          setHayRevision(true);
        } else {
          setOrden({
            cliente: '',
            producto: '',
            cantidad: '',
            tracto: '',
            carreta: ''
          })
          setHayRevision(false);
        }
        
      })
      .catch(function(err){
        console.log(err);
        setOrden({
          cliente: 'Ferreteria San Marcos',
          producto: 'Cemento LORETO',
          cantidad: '700 bolsas de 52.5 kg',
          tracto: 'CFA-485',
          carreta: 'FD-5189'
        })
        setHayRevision(false);
      })
      .finally(() => {
        
      })
    }
    
  }, []);

  const handleClickAprobar = () => {
    setOpenAprobar(true);
  }

  const handleClickIncidencia = () => {
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
      setOpenIncidencia(true);
    })
    .catch(function(err){
      console.log(err);
    })
    .finally(() => {

    })
    
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

  const handleAccionRealizada = () => {
    setAccionRealizada(false);
  }

  const handleConfirmAprobar = () => {
    aprobarRevision(idTurnoRevision)
    .then(function(response){
      console.log(response);
      handleCloseAprobar();
      setLabelAccion('Conductor aprobado');
      setAccionRealizada(true);
    })
    .catch(function(err){
      console.log(err);
    })

  }

  const handleConfirmIncidencia = () => {
    handleCloseIncidencia();
    const filteredIds = incidencias.filter(inc => inc.checked).map(inc => inc.id);
    registrarIncidencias(idTurnoRevision, filteredIds)
    .then(function(response){
      console.log(response.data);
      setLabelAccion('Incidencias registrada');
      setAccionRealizada(true);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  const handleCheckboxChange = (id) => {
    setIncidencias((prevState) =>
      prevState.map((inc) =>
        inc.id === id ? { ...inc, checked: !inc.checked } : inc
      )
    );
  };

  const handleVolverInicio = () => {
    console.log(idTurnoRevision);
    registrarSalidaRevisor(idTurnoRevision)
    .then(function(response){
      console.log(response.data);
      navigate(ROUTES.INICIO_REVISOR, {
        state: {
          idRevisor: localStorage.getItem('idRevisor'),
          nombres: localStorage.getItem('nombres')
        }
      });
    })
    .catch(function(err){
      console.log(err);
    })
  }

  const handleSiguienteRevision = () => {
    handleAccionRealizada();
    const x = 10.5;
    const y = 25;
    asignarPuntoControlYRevisor((state && state.idRevisor) ? state.idRevisor : parseInt(localStorage.getItem('idRevisor')), idPuntoControl, x, y)
    .then(function(response){
      console.log(response.data);
      localStorage.setItem('idTurnoRevision', response.data.idTurnoRevision);
      const idNuevoTurnoRevision = response.data.idTurnoRevision;
      setIdTurnoRevision(idNuevoTurnoRevision);
      if(idNuevoTurnoRevision===null){
          setOrden({
            cliente: '',
            producto: '',
            cantidad: '',
            tracto: '',
            carreta: '',
        })
        setHayRevision(false);
        return;
      }
      getDespachoByIdTurnoRevision(idNuevoTurnoRevision)
      .then(function(response){
        if(response.data.razonSocial !== null){
          setHayRevision(true);
          setOrden({
            cliente: response.data.razonSocial,
            producto: response.data.producto,
            cantidad: response.data.cantidad,
            tracto: response.data.placaTracto,
            carreta: response.data.placaCarreta
          })
        } else {
          setHayRevision(false);
          setOrden({
            cliente: '',
            producto: '',
            cantidad: '',
            tracto: '',
            carreta: '',
          })
        }
        handleAccionRealizada();
      })
      .catch(function(err){
        console.log(err);
        setOrden({
          cliente: 'Ferreteria San Marcos',
          producto: 'Cemento LORETO',
          cantidad: '700 bolsas de 52.5 kg',
          tracto: 'CFA-485',
          carreta: 'FD-5189'
        })
      })
    })
    .catch(function(err){
      console.log(err);
    })
  }
  

  return (
    <div className='margin-pantalla'>
      <Grid item container className='grid-punto-control'>
        <Typography className='text-punto-control'>
          {codigoPuntoControl}
        </Typography>
        <Typography className='text-titulo-orden'>
          Revisión de unidades físicas
        </Typography>
      </Grid>
      <Typography className='text-subtitulo-orden'>
        {hayRevision ? <>Datos de la orden del cliente:</> : <>Esperando al siguiente conductor...</>}
      </Typography>
      {hayRevision && 
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
      </>
      }
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
              onClick={handleConfirmAprobar}
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
              onClick={handleConfirmIncidencia}
              disabled={incidencias.filter(inc => inc.checked).length===0}
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
              onClick={handleVolverInicio}
            >
              OK
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={accionRealizada}
        onClose={handleAccionRealizada}
      >
        <Box sx={{ ...style}}>
          <Grid className='grid-aprobado'>
            <Typography className='modal-aprobado'>
            {labelAccion}
            </Typography>
          </Grid>
          <Grid className='grid-aprobado-buttons'>
            <Button
              className='button-aprobado'
              variant='outlined'
              onClick={handleVolverInicio}
              style={{ marginBottom: "15px"}}
            >
              VOLVER A INICIO
            </Button>
            <Button
              className='button-aprobado'
              variant='contained'
              onClick={handleSiguienteRevision}
            >
              SIGUIENTE
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}
