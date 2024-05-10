import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';
import LogoRed from '../../../assets/icons/logoRed.svg';
import '../../Conductor/Login/Login.css';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../routes/routes';
import { authRevisor } from '../../../services/Login/LoginRevisor';

export const LoginRevisor = () => {

  const [dni, setDni] = React.useState('');
  const [contra, setContra] = React.useState('');
  const [error, setError] = React.useState(false);

  let navigate = useNavigate();

  React.useEffect(() => {

  }, []);

  const handleIngresar = () => {
    if(dni === '88888888' && contra === '8888'){
      navigate(ROUTES.LOGIN_CONDUCTOR)
      return;
    }
    authRevisor(dni, contra)
    .then((function(response) {
      localStorage.setItem('idConductor', response.data.id);
      localStorage.setItem('nombres', response.data.nombres);
      if(response.data.status)navigate(ROUTES.INICIO_REVISOR, {
        state: {
            idConductor: response.data.id,
            nombres: response.data.nombres
        }
      });
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
                if(onlyNumbers.length > 8) return;
                setDni(onlyNumbers);
                setError(false);
              }}
              value={dni}
              fullWidth/>
          </Grid>
        </Grid>
        <Grid item className='datos'>
          <Grid item>
            <Typography className='datos-titulo'>Contraseña:</Typography>
          </Grid>
            <Grid item>
              <TextField
                variant="outlined" 
                className='textfield-contrasena'
                type="password"
                inputProps={{ maxLength: 30 }}
                onChange={(e) => {
                  setContra(e.target.value);
                  setError(false);
                }}
                value={contra}
                fullWidth
              />
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
