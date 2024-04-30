import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';
import LogoRed from '../../../assets/icons/logoRed.svg';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../routes/routes';

export const LoginConductor = () => {

  const textfieldRefs = [useRef(), useRef(), useRef(), useRef()]; // Referencias para los TextField

  let navigate = useNavigate();

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
    navigate(ROUTES.INICIO_CONDUCTOR);
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
            <TextField variant="outlined" fullWidth/>
          </Grid>
        </Grid>
        <Grid item className='datos'>
          <Grid item>
            <Typography className='datos-titulo'>Clave digital:</Typography>
          </Grid>
          <Grid className='datos-clave'>
            <Grid item>
              <TextField 
                className='datos-digito' 
                variant="outlined" 
                inputProps={{ maxLength: 1 }}
                inputRef={textfieldRefs[0]}
                onKeyDown={(e) => handleKeyDown(0, e)}
              />
            </Grid>
            <Grid item>
              <TextField 
                className='datos-digito' 
                variant="outlined" 
                inputProps={{ maxLength: 1 }}
                inputRef={textfieldRefs[1]}
                onKeyDown={(e) => handleKeyDown(1, e)}
              />
            </Grid>
            <Grid item>
              <TextField 
                className='datos-digito' 
                variant="outlined" 
                inputProps={{ maxLength: 1 }}
                inputRef={textfieldRefs[2]}
                onKeyDown={(e) => handleKeyDown(2, e)}
              />
            </Grid>
            <Grid item>
              <TextField 
                className='datos-digito' 
                variant="outlined" 
                inputProps={{ maxLength: 1 }}
                inputRef={textfieldRefs[3]}
                onKeyDown={(e) => handleKeyDown(3, e)}
              />
            </Grid>
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
