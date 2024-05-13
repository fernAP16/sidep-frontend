import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import './InicioRevisor.css';
import '../../../constants/commonStyle.css';
import CheckIcon from '../../../assets/icons/check.svg';
import NotAvailableIcon from '../../../assets/icons/NotAvailable.svg';
import * as ROUTES from '../../../routes/routes';

export const InicioRevisor = () => {

  const { state } = useLocation();
  let navigate = useNavigate();
  const [nombres, setNombres] = React.useState('');
  const [puntosControl, setPuntosControl] = React.useState([]);
  const [selectedPuntoControl, setSelectedPuntoControl] = React.useState(null);

  React.useEffect(() => {
    
    const resultado = [];
    let nomb = (state && state.nombres) ? state.nombres.split(' ') : localStorage.getItem('nombres').split(' ');
    setNombres(nomb[0].charAt(0) + nomb[0].slice(1).toLowerCase() + " " + nomb[1].charAt(0) + nomb[1].slice(1).toLowerCase());
    const arrayPuntosControl = [
      {
        codigo: 'C1',
        disponible: true
      },
      {
        codigo: 'C2',
        disponible: true
      },
      {
        codigo: 'C3',
        disponible: false
      },
      {
        codigo: 'C4',
        disponible: true
      },
      {
        codigo: 'C5',
        disponible: true
      },
      {
        codigo: 'C6',
        disponible: false
      },
      {
        codigo: 'C7',
        disponible: true
      },
      {
        codigo: 'C8',
        disponible: false
      },
      {
        codigo: 'C9',
        disponible: false
      },
      {
        codigo: 'C10',
        disponible: true
      },
    ]
    for (let i = 0; i < arrayPuntosControl.length; i += 5) {
      let subarreglo = arrayPuntosControl.slice(i, i + 5);
      resultado[i/5] = subarreglo;
    }
    setPuntosControl(resultado);
  }, []);

  const handleSelectPuntoControl = (event) => {
    setSelectedPuntoControl(event.target.value);
  }

  const handleIngresar = () => {
    if(!selectedPuntoControl) return;
    console.log(selectedPuntoControl)
    navigate(ROUTES.REVISION_REVISOR, {
      state: {
        idRevisor: (state && state.idRevisor) ? state.idRevisor : parseInt(localStorage.getItem('idRevisor')),
        puntoControl: selectedPuntoControl,
      }
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
          <RadioGroup className='column-punto-control' value={selectedPuntoControl} onChange={handleSelectPuntoControl}>
            {puntosControl.map((subArreglo, index) => (
              <div key={index} className='five-punto-control'>
                {subArreglo.map((ptControl) => (
                  <FormControlLabel
                    key={ptControl.codigo}
                    className="button-punto-control"
                    value={ptControl.codigo}
                    control={<Radio />}
                    disabled={!ptControl.disponible}
                    label={
                      <Grid item container className='grid-radio-buttons'>
                        <Typography className='text-radio-buttons'>
                          {ptControl.codigo}
                        </Typography>
                        <img
                          src={ptControl.disponible ? CheckIcon : NotAvailableIcon}>
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
          disabled={!selectedPuntoControl}
          onClick={() => handleIngresar()}
        >
            INGRESAR AL PUNTO DE CONTROL
        </Button>
      </Grid>
    </div>
  )
}
