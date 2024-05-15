import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getEstadoDespacho } from '../../../services/Despacho/TurnoEspera';
import * as ROUTES from '../../../routes/routes';
import { Grid, Typography } from '@mui/material';
import '../../../constants/commonStyle.css';

const Despacho = () => {

  let { state } = useLocation();
  let navigate = useNavigate();

  const [nombres, setNombres] = React.useState('');
  const [tieneDespacho, setTieneDespacho] = React.useState(null);
  const [paso, setPaso] = React.useState('');

  React.useEffect(() => { 
    let nomb = (state && state.nombres) ? state.nombres.split(' ') : localStorage.getItem('nombres').split(' ');
    setNombres(nomb[0].charAt(0) + nomb[0].slice(1).toLowerCase() + " " + nomb[1].charAt(0) + nomb[1].slice(1).toLowerCase());
    const id = (state && state.idConductor ? state.idConductor : localStorage.getItem('idConductor'));
    getEstadoDespacho(id)
    .then(function(response){
        let estado = response.data.idEstadoOrden;
        if(estado === 0){ // No hay despacho
            // Usted no se encuentra despachando ningún producto
            setTieneDespacho(0);
            return; 
        } else {
            if(estado === 1) { // 1	En turno de espera
                navigate(ROUTES.DESPACHO_TURNO_ESPERA, {
                    state: {
                        idDespacho: response.data.idDespacho,
                        idPlanta: response.data.idPlanta
                    }
                });
                setPaso('Cola de espera')
            } else if(estado === 2) { // 2	En revision
                setPaso('En revisión')
            } else if(estado === 3) { // 3	Fin de despacho con incidencia en revision
                setPaso('Fin de despacho con incidencia en revisión')
            } else if(estado === 4) { // 4	En peso vacio
                setPaso('Pesaje vacío')
            } else if(estado === 5) { // 5	Fin de despacho con incidencia en peso vacio
                setPaso('Fin de despacho con incidencia en peso vacío')
            } else if(estado === 6) { // 6	En cola de carga
                setPaso('Cola de carga')
            } else if(estado === 7) { // 7	Cargando productos
                setPaso('Cargando productos')
            } else if(estado === 8) { // 8	En peso lleno
                setPaso('Pesaje lleno')
            } else if(estado === 9) { // 9	Revision de carga por incidencia en peso lleno
                setPaso('Revisión de carga por incidencia en peso lleno')
            } else if(estado === 10) { // 10  En salida
                setPaso('En salida')
            } else if(estado === 11) { // 11 Terminado
                setPaso('Despacho terminado')
            }
        }
    })
    .catch(function(err){
        console.log(err);
    })
    .finally(() => {

    })

  }, [])

  return (
    <div className='margin-pantalla'>
      <Grid className='titulo-usuario-grid'>
        <Typography className = "titulo-usuario-text">Hola, {nombres}</Typography>
      </Grid>
    { tieneDespacho === null
    ?
        <Grid className='titulo-ordenes-grid'>
            <Typography className = "titulo-ordenes-text">Obteniendo datos del despacho...</Typography>
        </Grid>
    :
        ( tieneDespacho === 0 
        ?
            <Grid className='titulo-ordenes-grid'>
                <Typography className = "titulo-ordenes-text">No se encuentra despachando ningún producto</Typography>
            </Grid>
        :
            <Grid className='titulo-ordenes-grid'>
                <Typography className = "titulo-ordenes-text">Se redirigirá a la pestaña de "{paso}" </Typography>
            </Grid>
        )    
    }
    </div>
  )
}

export default Despacho;