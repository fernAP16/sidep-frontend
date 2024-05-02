import { Button, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import './OrdenesCard.css';
import DetalleIcon from '../../assets/icons/detalle.svg';
import DespacharIcon from '../../assets/icons/despachar.svg';

const OrdenesCard = (props) => {

  const { orden, esInicio, detalleAction, despacharAction } = props;
  
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
            {"Producto: " + orden.producto + " " + orden.marca}
          </Typography>
          <Typography className='orden-producto'>
            {"Cantidad: " + orden.cantidad + " " + orden.unidad}
          </Typography>
        </Grid>
        <Grid item className='botones-card'>
          {esInicio ? 
            <Grid container >
              <Button
                variant="contained"
                className='boton-detalle'
                startIcon={
                  <img
                    src={DetalleIcon}
                    alt="Logo del sistema SIDEP"
                  />
                }
                onClick={detalleAction}
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
                onClick={despacharAction}
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