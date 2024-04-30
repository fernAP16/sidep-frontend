import { Button, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import './OrdenesCard.css';
import DetalleIcon from '../../assets/icons/detalle.svg';
import DespacharIcon from '../../assets/icons/despachar.svg';

const OrdenesCard = (props) => {

  const {orden, esInicio} = props;
  
  React.useEffect(() => {

  }, []);


  return (
    <Card className='orden-card'>
      <Grid container item>
        <Grid item className='orden-datos'>
          <Typography className='orden-cliente-text'>
            {orden.cliente}
          </Typography>
          <Typography className='orden-producto'>
            {"Producto: " + orden.producto}
          </Typography>
          <Typography className='orden-producto'>
            {"Cantidad: " + orden.cantidad}
          </Typography>
        </Grid>
        <Grid item className='botones-card'>
          {esInicio ? 
            <Grid container >
              <Button
                variant="contained"
                className='boton-detalle-mitad'
                startIcon={
                  <img
                    src={DetalleIcon}
                    alt="Logo del sistema SIDEP"
                  />
                }
              >
                Ver detalle
              </Button>
              <Button
                variant="contained"
                className='boton-despacho'
                startIcon={
                  <img
                    src={DespacharIcon}
                    alt="Logo del sistema SIDEP"
                  />
                }
              >
                Despachar
              </Button>
            </Grid>
          : 
            <>
            </>
          }
        </Grid>
      </Grid>
    </Card>
  )
}

export default OrdenesCard;