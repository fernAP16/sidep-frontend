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
        if(estado === 0){
            // Usted no se encuentra despachando ningún producto
            setTieneDespacho(0);
            return; 
        } else {
            if(estado === 1) {
                // 1: En turno de espera
                navigate(ROUTES.DESPACHO_TURNO_ESPERA, {
                    state: {
                        idDespacho: response.data.idDespacho,
                        idPlanta: response.data.idPlanta
                    }
                });
                setPaso('Cola de espera')
            } else if(estado === 2) { // 2:	En revision
                navigate(ROUTES.DESPACHO_REVISION, {
                    state: {
                        idDespacho: response.data.idDespacho,
                        idPlanta: response.data.idPlanta
                    }
                });
            } else if(estado === 4) { // 4:	En peso vacio
                navigate(ROUTES.DESPACHO_PESAJE_VACIO, {
                    state: {
                        idDespacho: response.data.idDespacho,
                        idPlanta: response.data.idPlanta
                    }
                });
            } else if(estado === 6) { // 6:	En cola de carga
                navigate(ROUTES.DESPACHO_COLA_CARGA, {
                    state: {
                        idDespacho: response.data.idDespacho,
                        idPlanta: response.data.idPlanta
                    }
                });
            } else if(estado === 7) { // 7:	Cargando productos
                navigate(ROUTES.DESPACHO_CARGA_PRODUCTOS, {
                    state: {
                        idDespacho: response.data.idDespacho,
                        idPlanta: response.data.idPlanta
                    }
                });
            } else if(estado === 8) { // 8:	En peso lleno
                navigate(ROUTES.DESPACHO_PESAJE_LLENO, {
                    state: {
                        idDespacho: response.data.idDespacho,
                        idPlanta: response.data.idPlanta
                    }
                });
            } else if(estado === 9) { // 9:	Revision de carga por incidencia en peso lleno
                setPaso('Revisión de carga por incidencia en peso lleno')
            } else if(estado === 10) { // 10:  En salida
                navigate(ROUTES.DESPACHO_SALIDA, {
                    state: {
                        idDespacho: response.data.idDespacho,
                        idPlanta: response.data.idPlanta
                    }
                });
            } else if(estado === 11) { // 11: Terminado
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