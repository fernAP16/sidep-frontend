import React from 'react';
import './InicioConductor.css';
import { Grid, Typography } from '@mui/material';
import OrdenesCard from '../../../components/OrdenesCard/OrdenesCard';

const InicioConductor = () => {

  const [ordenes, setOrdenes] = React.useState([
    {
      cliente: "Ferreteria San Marcos",
      producto: "Cemento SOL",
      cantidad: "700 bolsas de 52.5 kg."
    },
    {
      cliente: "Constructora San Martin",
      producto: "Ladrillos PIRAMIDE",
      cantidad: "800 unidades de 15 kg"
    },
    {
      cliente: "Bechtel Perú",
      producto: "Cemento APU",
      cantidad: "900 bolsas de 42.5 kg"
    },
    {
      cliente: "Ferreteria San Marcos",
      producto: "Cemento SOL",
      cantidad: "700 bolsas de 52.5 kg."
    },
    {
      cliente: "Ferreteria San Marcos",
      producto: "Cemento SOL",
      cantidad: "700 bolsas de 52.5 kg."
    },
  ]);

  React.useEffect(() => {

  }, []);

  return (
    <div className='margin-pantalla'>
      <Grid className='titulo-usuario-grid'>
        <Typography className = "titulo-usuario-text">Hola, Jorge Tarazona</Typography>
      </Grid>
      <Grid className='titulo-ordenes-grid'>
        <Typography className = "titulo-ordenes-text">Órdenes de recojo registradas (8):</Typography>
      </Grid>
      {ordenes.map((ord) => {
        return (<OrdenesCard
          orden={ord}
          esInicio
        />
      )
      })}
    </div>
  )
}

export default InicioConductor;
