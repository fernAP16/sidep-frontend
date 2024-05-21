import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';
import LogoRed from '../../../assets/icons/logoRed.svg';
import './Login.css';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../routes/routes';
import { auth } from '../../../services/Login/LoginConductor';
import { getOrdenesByIdConductor } from '../../../services/Inicio/InicioConductor';

export const LoginConductor = () => {
  
  const { state } = useLocation();
  let navigate = useNavigate();

  const textfieldRefs = [useRef(), useRef(), useRef(), useRef()]; // Referencias para los TextField
  const [dni, setDni] = React.useState('');
  const [digito1, setDigito1] = React.useState('');
  const [digito2, setDigito2] = React.useState('');
  const [digito3, setDigito3] = React.useState('');
  const [digito4, setDigito4] = React.useState('');
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    
  }, []);

  const handleKeyDown = (index, event) => {
    const currentInput = event.target.value;
    if (currentInput.length === 1 && event.key !== 'Backspace') {
      if (index < textfieldRefs.length - 1) {
        textfieldRefs[index + 1].current.focus();
      }
    } else if (event.key === 'Backspace' && currentInput.length === 0) {
      if (index > 0) {
        textfieldRefs[index - 1].current.focus();
      }
    }
  };

  const handleIngresar = () => {
    const clave = digito1 + digito2 + digito3 + digito4;
    if(dni === '88888888' && clave === '8888'){
      navigate(ROUTES.LOGIN_REVISOR)
      return;
    }
    if(dni === '44444444' && clave === '4444'){
      navigate(ROUTES.LOGIN_BALANZA)
      return;
    }
    auth(dni, clave)
    .then((function(response) {
      if(response.data.status){
        localStorage.setItem('idConductor', response.data.id);
        localStorage.setItem('nombres', response.data.nombres);
        navigate(ROUTES.INICIO_CONDUCTOR, {
          state: {
              idConductor: response.data.id,
              nombres: response.data.nombres
          }
      });
      }
      else setError(true);
    }))
    
  }

  return (
    <div>
      <Grid container className='topBarLogin'>
      </Grid>
      <Grid>
        <Grid item className='logoRed'>
          <img
              src={LogoRed}
              alt="Logo del sistema SIDEP"
          />
        </Grid>
        <Grid item className='iniciarSesion'>
          <Typography className='iniciarSesionText'>Iniciar sesion</Typography>
        </Grid>
        <Grid item className='datos'>
          <Grid item>
            <Typography className='datos-titulo'>Número de DNI:</Typography>
          </Grid>
          <Grid item>
            <TextField 
              variant="outlined" 
              className='textfield-dni'
              inputProps={{ maxLength: 8 }}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                setDni(onlyNumbers)
                setError(false)
              }}
              value={dni}
              fullWidth/>
          </Grid>
        </Grid>
        <Grid item className='datos'>
          <Grid item>
            <Typography className='datos-titulo'>Clave digital:</Typography>
          </Grid>
          <Grid className='datos-clave'>
            <Grid item>
              <TextField 
                className='datos-digito textfield-contrasena' 
                variant="outlined" 
                type="password"
                inputProps={{ maxLength: 1 }}
                inputRef={textfieldRefs[0]}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                  setDigito1(onlyNumbers)
                  setError(false)
                }}
                value={digito1}
                onKeyDown={(e) => handleKeyDown(0, e)}
              />
            </Grid>
            <Grid item>
              <TextField 
                className='datos-digito textfield-contrasena' 
                variant="outlined" 
                type="password"
                inputProps={{ maxLength: 1 }}
                inputRef={textfieldRefs[1]}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                  setDigito2(onlyNumbers)
                  setError(false)
                }}
                value={digito2}
                onKeyDown={(e) => handleKeyDown(1, e)}
              />
            </Grid>
            <Grid item>
              <TextField 
                className='datos-digito textfield-contrasena' 
                variant="outlined" 
                type="password"
                inputProps={{ maxLength: 1 }}
                inputRef={textfieldRefs[2]}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                  setDigito3(onlyNumbers)
                  setError(false)
                }}
                value={digito3}
                onKeyDown={(e) => handleKeyDown(2, e)}
              />
            </Grid>
            <Grid item>
              <TextField 
                className='datos-digito textfield-contrasena' 
                variant="outlined" 
                type="password"
                inputProps={{ maxLength: 1 }}
                inputRef={textfieldRefs[3]}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                  setDigito4(onlyNumbers)
                  setError(false)
                }}
                value={digito4}
                onKeyDown={(e) => handleKeyDown(3, e)}
              />
            </Grid>
          </Grid>
        </Grid>
        {error &&
          <Grid item className='button-inicio'>
            <Typography
              className='mensaje-error'
            >
              DNI o clave incorrecta
            </Typography>
          </Grid>
        }
        <Grid item className='button-inicio'>
          <Button 
            variant="contained" 
            className='button-login'
            onClick={() => handleIngresar()}
          >
            INGRESAR
          </Button>
        </Grid>
      </Grid>
      </div>
  )
}
