import React from 'react';
import './InicioConductor.css';
import { Grid, Typography } from '@mui/material';
import OrdenesCard from '../../../components/OrdenesCard/OrdenesCard';
import { getOrdenesByIdConductor } from '../../../services/Inicio/InicioConductor';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetterInWords } from '../../../constants/commonfunctions';
import '../../../constants/commonStyle.css';
import * as ROUTES from '../../../routes/routes';

const InicioConductor = () => {

  let { state } = useLocation();
  let navigate = useNavigate();

  const [nombres, setNombres] = React.useState('');
  const [ordenes, setOrdenes] = React.useState([]);
  const [ordenesFull, setOrdenesFull] = React.useState([]);
  
  React.useEffect(() => {
    let nomb = (state && state.nombres) ? state.nombres.split(' ') : localStorage.getItem('nombres').split(' ');
    setNombres(nomb[0].charAt(0) + nomb[0].slice(1).toLowerCase() + " " + nomb[1].charAt(0) + nomb[1].slice(1).toLowerCase());
    getOrdenesByIdConductor((state && state.idConductor) ? state.idConductor : localStorage.getItem('idConductor'))
    .then(function(response){
      let array = [];
      let arrayFull = [];
      response.data.forEach(element => {
        array.push({
          idOrden: element.idOrdenRecojo,
          cliente: element.sedeCliente.cliente.razonSocial,
          producto: element.productoVenta.producto.nombre,
          marca: element.productoVenta.marca.nombre,
          unidad: element.productoVenta.unidad.nombre,
          cantidad: element.cantidad
        })
        arrayFull.push(element);
      });
      setOrdenes(array);
      setOrdenesFull(arrayFull);
    })
    .catch(function(error){
      console.log(error);
    })
    .finally({

    })
  }, []);

  const detalleOrden = (ord) => {
    let ordenDetalle = ordenesFull.filter((orden) => orden.idOrdenRecojo === ord.idOrden)
    localStorage.setItem('ordenDetalle', ordenDetalle[0]);
    navigate(ROUTES.DETALLE_CONDUCTOR, {
      state: {
          orden: ordenDetalle[0],
          nombres: nombres,
          idConductor: (state && state.idConductor) ? state.idConductor : localStorage.getItem('idConductor')
      }
    })
  }

  return (
    <div className='margin-pantalla'>
      <Grid className='titulo-usuario-grid'>
        <Typography className = "titulo-usuario-text">Hola, {nombres}</Typography>
      </Grid>
      <Grid className='titulo-ordenes-grid'>
        <Typography className = "titulo-ordenes-text">Órdenes de recojo registradas ({ordenes.length}):</Typography>
      </Grid>
      {ordenes.map((ord) => {
        return (<OrdenesCard
          orden={ord}
          esInicio
          detalleAction={() => detalleOrden(ord)}
        />
      )
      })}
    </div>
  )
}

export default InicioConductor;
