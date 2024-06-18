import React from 'react';
import './Historial.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDatosOrdenTerminada, getOrdenesByIdConductor } from '../../../services/Inicio/InicioConductor';
import * as ROUTES from '../../../routes/routes';
import { Grid, Typography } from '@mui/material';
import OrdenesCard from '../../../components/OrdenesCard/OrdenesCard';

const Historial = () => {

  let { state } = useLocation();
  let navigate = useNavigate();
  const [nombres, setNombres] = React.useState('');
  const [ordenes, setOrdenes] = React.useState([]);
  const [ordenesFull, setOrdenesFull] = React.useState([]);

  React.useEffect(() => {
    let nomb = (state && state.nombres) ? state.nombres.split(' ') : localStorage.getItem('nombres').split(' ');
    let id = (state && state.idConductor) ? state.idConductor : parseInt(localStorage.getItem('idConductor'));
    setNombres(nomb[0].charAt(0) + nomb[0].slice(1).toLowerCase() + " " + nomb[1].charAt(0) + nomb[1].slice(1).toLowerCase());
    getOrdenesByIdConductor(id)
      .then(function (response) {
        let array = [];
        let arrayFull = [];
        response.data.forEach(element => {
          if(element.estadoOrden.idEstadoOrden === 3){
            array.push({
              idOrden: element.idOrdenRecojo,
              cliente: element.sedeCliente.cliente.razonSocial,
              producto: element.productoVenta.producto.nombre,
              marca: element.productoVenta.marca.nombre,
              unidad: element.productoVenta.unidad.nombre,
              cantidad: element.cantidad,
              estado: element.estadoOrden.idEstadoOrden
            });
            arrayFull.push(element);
          }
        });
        setOrdenes(array);
        setOrdenesFull(arrayFull);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const detalleOrden = (ord) => {
    let ordenDetalle = ordenesFull.filter((orden) => orden.idOrdenRecojo === ord.idOrden)
    localStorage.setItem('ordenDetalle', ordenDetalle[0]);
    getDatosOrdenTerminada(ordenDetalle[0].idOrdenRecojo)
    .then(function(response){
      let fechaRecojo = new Date(response.data.fechaRecojo);
      let horaLlegada = new Date(response.data.horaLlegada);
      let horaSalida = new Date(response.data.horaSalida);
      const fechaRecojoFormatted = fechaRecojo.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const horaLlegadaFormatted = horaLlegada.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const horaSalidaFormatted = horaSalida.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      navigate(ROUTES.DETALLE_CONDUCTOR, {
        state: {
          orden: ordenDetalle[0],
          nombres: nombres,
          idConductor: (state && state.idConductor) ? state.idConductor : parseInt(localStorage.getItem('idConductor')),
          terminado: true,
          fechaRecojo: fechaRecojoFormatted,
          horaLlegada: horaLlegadaFormatted,
          horaSalida: horaSalidaFormatted
        }
      })
    })
    
  }

  return (
    <div className='margin-pantalla'>
      <Grid className='titulo-usuario-grid'>
        <Typography className="titulo-usuario-text">Hola, {nombres}</Typography>
      </Grid>
      <Grid className='titulo-ordenes-grid'>
        <Typography className="titulo-ordenes-text">Órdenes de recojo registradas ({ordenes.length}):</Typography>
      </Grid>
      {ordenes.map((ord) => {
        return (
          <OrdenesCard
            key={ord.idOrden}
            orden={ord}
            detalleAction={() => detalleOrden(ord)}
            estado={ord.estado}
          />
        )
      })}
    </div>
  )
}

export default Historial;