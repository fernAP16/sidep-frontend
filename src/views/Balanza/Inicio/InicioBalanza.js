import { Grid, Typography } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../../constants/commonStyle.css'
import './InicioBalanza.css';


export const InicioBalanza = () => {

  let { state } = useLocation();
  let navigate = useNavigate();
  const [idBalanza, setIdBalanza] = React.useState(0);
  const [codigoBalanza, setCodigoBalanza] = React.useState('');

  React.useEffect(() => {
    const idBlz = (state && state.idBalanza) ? state.idBalanza : localStorage.getItem('idBalanza');
    const codigoBlz = (state && state.codigoBalanza) ? state.codigoBalanza : localStorage.getItem('codigoBalanza');
    setIdBalanza(idBlz);
    setCodigoBalanza(codigoBlz);
  }, []);

  return (
    <div className='margin-pantalla'>
      <Grid className='grid-titulo-inicio'>
        <Typography className='codigo-titulo-inicio'>
          {codigoBalanza}
        </Typography>
        <Typography className='label-titulo-inicio'>
          Escanear QR del conductor
        </Typography>
      </Grid>
    </div>
  )
}
