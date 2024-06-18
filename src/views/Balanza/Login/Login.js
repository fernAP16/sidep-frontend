import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';
import LogoRed from '../../../assets/icons/logoRed.svg';
import '../../Conductor/Login/Login.css';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../routes/routes';
import { authBalanza } from '../../../services/Login/LoginBalanza';


export const LoginBalanza = () => {

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
    authBalanza(dni, contra)
    .then((function(response) {
      const idBalanza = response.data.id;
      const codigoBalanza = response.data.nombres.split("/")[0];
      const idTipoPesaje = response.data.nombres.split("/")[1];
      localStorage.setItem('idBalanza', idBalanza);
      localStorage.setItem('codigoBalanza', codigoBalanza);
      localStorage.setItem('idTipoPesaje', idTipoPesaje);
      if(response.data.status)navigate(ROUTES.INICIO_BALANZA, {
        state: {
            idBalanza: idBalanza,
            codigoBalanza: codigoBalanza,
            idTipoPesaje: idTipoPesaje
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
            <Typography className='datos-titulo'>Código de balanza:</Typography>
          </Grid>
          <Grid item>
            <TextField 
              variant="outlined" 
              className='textfield-dni'
              inputProps={{ maxLength: 8 }}
              onChange={(e) => {    
                if(e.target.value.length > 8) return;
                setDni(e.target.value);
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
