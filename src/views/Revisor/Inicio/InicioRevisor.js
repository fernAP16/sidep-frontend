import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import './InicioRevisor.css';
import '../../../constants/commonStyle.css';
import CheckIcon from '../../../assets/icons/check.svg';
import NotAvailableIcon from '../../../assets/icons/NotAvailable.svg';
import * as ROUTES from '../../../routes/routes';
import { getPuntosControlPorPlanta } from '../../../services/Inicio/InicioRevisor';
import { asignarPuntoControlYRevisor } from '../../../services/Despacho/Revision';

export const InicioRevisor = () => {

  const { state } = useLocation();
  let navigate = useNavigate();
  const [nombres, setNombres] = React.useState('');
  const [puntosControl, setPuntosControl] = React.useState([]);
  const [selectedIdPuntoControl, setSelectedIdPuntoControl] = React.useState(null);
  const [selectedPuntoControl, setSelectedPuntoControl] = React.useState(null);

  React.useEffect(() => {
    const x = 10.5;
    const y = 25;
    const idPlanta = 1;
    const resultado = [];
    let nomb = (state && state.nombres) ? state.nombres.split(' ') : localStorage.getItem('nombres').split(' ');
    setNombres(nomb[0].charAt(0) + nomb[0].slice(1).toLowerCase() + " " + nomb[1].charAt(0) + nomb[1].slice(1).toLowerCase());
    getPuntosControlPorPlanta(x, y)
    .then(function(response){
      console.log(response);
      let arrPuntosControl = [];
      response.data.forEach((element) => {
        if(element.idRevisorAsignado === ((state && state.idRevisor) ? state.idRevisor : parseInt(localStorage.getItem('idRevisor')))){
          
          navigate(ROUTES.REVISION_REVISOR, {
            state: {
              idRevisor: (state && state.idRevisor) ? state.idRevisor : parseInt(localStorage.getItem('idRevisor')),
              puntoControl: element.codigoPuntoControl,
              idTurnoRevision: element.idTurnoRevision,
              idPlanta: idPlanta
            }
          })
          return;
        }
        const puntoControl = {
          id: element.idPuntoControl,
          codigo: element.codigoPuntoControl,
          disponible: element.idRevisorAsignado !== null
        }
        arrPuntosControl.push(puntoControl);
      })
      for (let i = 0; i < arrPuntosControl.length; i += 5) {
        let subarreglo = arrPuntosControl.slice(i, i + 5);
        resultado[i/5] = subarreglo;
      }
      console.log(resultado);
      setPuntosControl(resultado);
    })
    .catch(function(err){

    })
    .finally(() => {

    })
    
  }, []);

  const handleSelectPuntoControl = (event) => {
    setSelectedIdPuntoControl(event.target.value);
    console.log(event.target.value);
  }

  const handleIngresar = () => {
    const x = 10.5;
    const y = 25;
    if(!selectedIdPuntoControl) return;
    console.log(selectedIdPuntoControl);
    asignarPuntoControlYRevisor((state && state.idRevisor) ? state.idRevisor : parseInt(localStorage.getItem('idRevisor')), selectedIdPuntoControl, x, y)
    .then(function(response){
      console.log(response.data);
      navigate(ROUTES.REVISION_REVISOR, {
        state: {
          idRevisor: (state && state.idRevisor) ? state.idRevisor : parseInt(localStorage.getItem('idRevisor')),
          puntoControl: selectedIdPuntoControl,
          idTurnoRevision: response.data.idTurnoRevision,
          idPlanta: response.data.idPlanta
        }
      })
    })
    .catch(function(err){
      console.log(err);
    })
    
  }

  return (
    <div className='margin-pantalla'>
      <Grid className='titulo-usuario-grid'>
        <Typography className = "titulo-usuario-text">Hola, {nombres}</Typography>
      </Grid>
      <Grid className='titulo-ordenes-grid'>
        <Typography className = "titulo-ordenes-text">Ingrese su entrada al punto de control donde se encuentra:</Typography>
      </Grid>
      <Grid item container className='grid-puntos-control'>
        <FormControl className='form-puntos-control'>
          <RadioGroup className='column-punto-control' value={selectedIdPuntoControl} onChange={handleSelectPuntoControl}>
            {puntosControl.map((subArreglo, index) => (
              <div key={index} className='five-punto-control'>
                {subArreglo.map((ptControl) => (
                  <FormControlLabel
                    key={ptControl.id}
                    className="button-punto-control"
                    value={ptControl.id}
                    control={<Radio />}
                    disabled={ptControl.disponible}
                    label={
                      <Grid item container className='grid-radio-buttons'>
                        <Typography className='text-radio-buttons'>
                          {ptControl.codigo}
                        </Typography>
                        <img
                          src={!ptControl.disponible ? CheckIcon : NotAvailableIcon}>
                        </img>
                      </Grid>
                    }
                  >
                  </FormControlLabel> 
                ))}
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid className='grid-button-ingresar'>
        <Button
          variant="contained" 
          className='button-ingresar'
          disabled={!selectedIdPuntoControl}
          onClick={() => handleIngresar()}
        >
            INGRESAR AL PUNTO DE CONTROL
        </Button>
      </Grid>
    </div>
  )
}
