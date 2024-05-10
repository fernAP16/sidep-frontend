import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../constants/commonStyle.css';
import { Grid, Typography } from '@mui/material';

export const InicioRevisor = () => {

  const { state } = useLocation();
  let navigate = useNavigate();
  const [nombres, setNombres] = React.useState('');

  React.useEffect(() => {
    let nomb = (state && state.nombres) ? state.nombres.split(' ') : localStorage.getItem('nombres').split(' ');
    setNombres(nomb[0].charAt(0) + nomb[0].slice(1).toLowerCase() + " " + nomb[1].charAt(0) + nomb[1].slice(1).toLowerCase());

  }, []);

  return (
    <div className='margin-pantalla'>
      <Grid className='titulo-usuario-grid'>
        <Typography className = "titulo-usuario-text">Hola, {nombres}</Typography>
      </Grid>
      <Grid className='titulo-ordenes-grid'>
        <Typography className = "titulo-ordenes-text">Ingrese su entrada al punto de control donde se encuentra:</Typography>
      </Grid>
    </div>
  )
}
