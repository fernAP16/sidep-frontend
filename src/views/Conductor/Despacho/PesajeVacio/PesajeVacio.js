import React from 'react';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { Grid, Typography } from '@mui/material';

export const PesajeVacio = () => {

  const [codigoPuntoControl, setCodigoPuntoControl] = React.useState('');

  React.useEffect(() => {

  }, [])

  return (
    <>
      <ProgressBar fase={2}/>
      <div className='margin-pantalla-despacho'>
        <Grid className='titulo-revision-grid'>
            <Typography className = "titulo-revision">Balanza asignada: </Typography>
            <Typography className = "punto-control">{codigoPuntoControl}</Typography>
        </Grid>
      </div>
    </>
  )
}