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
    authRevisor(dni, contra)
    .then((function(response) {
      if(response.data.status)navigate(ROUTES.INICIO_REVISOR);
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
              onChange={(e) => {
                setDni(e.target.value)
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
                onChange={(e) => {
                  setContra(e.target.value)
                }}
                value={contra}
                fullWidth
              />
            </Grid>
        </Grid>
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
