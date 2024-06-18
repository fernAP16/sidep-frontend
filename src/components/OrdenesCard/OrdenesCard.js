import { Button, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import DetalleIcon from '../../assets/icons/detalle.svg';
import DespacharIcon from '../../assets/icons/despachar.svg';
import './OrdenesCard.css';

const OrdenesCard = (props) => {

  const { orden, esInicio, detalleAction, despacharAction, estado, estaDespachando } = props;
  
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
                    alt="Detalle"
                  />
                }
                onClick={detalleAction}
              >
                Ver detalle
              </Button>
              <Button
                variant="contained"
                className={ (estado === 2 && estaDespachando) ? 'boton-continuar' : 'boton-despacho'}
                startIcon={ (estado === 1 && !estaDespachando) ?
                  <img
                    src={DespacharIcon}
                    alt="Despachar"
                  />
                  : <></>
                }
                onClick={despacharAction}
                disabled={estado === 1 && estaDespachando}
              >
                {(estado === 2 && estaDespachando) ? <>Continuar despacho</> : <>Despachar</>}
              </Button>
            </Grid>
          : 
            <>
              <Grid container >
                <Button
                  variant="contained"
                  className='boton-detalle-full'
                  startIcon={
                    <img
                      src={DetalleIcon}
                      alt="Detalle"
                    />
                  }
                  onClick={detalleAction}
                >
                  Ver detalle
                </Button>
              </Grid>
            </>
          }
        </Grid>
      </Grid>
    </Card>
  )
}

export default OrdenesCard;