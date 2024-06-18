import { Button, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DetalleOrden.css';

export const DetalleOrden = () => {

    const { state } = useLocation();
    let navigate = useNavigate();

    const [nombres, setNombres] = React.useState('');
    const [ordenDetalle, setOrdenDetalle] = React.useState(null);

    React.useEffect(() => {
        console.log(state);
        let nomb = (state && state.nombres) ? state.nombres.split(' ') : localStorage.getItem('nombres').split(' ');
        setNombres(nomb[0].charAt(0) + nomb[0].slice(1).toLowerCase() + " " + nomb[1].charAt(0) + nomb[1].slice(1).toLowerCase());
        setOrdenDetalle((state && state.orden) ? state.orden : localStorage.getItem('ordenDetalle'))
        console.log(state.orden);
        // obtener datos state.terminado
    }, [])

    const handleVolver = () => {
        
        navigate(-1, {
            state: {
                nombres: nombres,
                idConductor: (state && state.idConductor) ? state.idConductor : localStorage.getItem('idConductor')
            }
        });
    }

    return (
        <div className='margin-pantalla'>
            <Grid className='titulo-usuario-grid'>
                <Typography className = "titulo-usuario-text">Hola, {nombres}</Typography>
            </Grid>
            <Grid className='titulo-ordenes-grid'>
                <Typography className = "titulo-ordenes-text">Detalle de la orden de recojo:</Typography>
            </Grid>
            { ordenDetalle && (
                <Card className='detalle-card'>
                    <Grid className='detalle-item'>
                        <Typography className='detalle-label'>
                            Cliente:
                        </Typography>
                        <Typography className='detalle-resultado'>
                            {ordenDetalle.sedeCliente.cliente.razonSocial}
                        </Typography>
                    </Grid>
                    <Grid className='detalle-item'>
                        <Typography className='detalle-label'>
                            Distrito:
                        </Typography>
                        <Typography className='detalle-resultado'>
                            {ordenDetalle.sedeCliente.distrito}
                        </Typography>
                    </Grid>
                    <Grid className='detalle-item'>
                        <Typography className='detalle-label'>
                            Dirección:
                        </Typography>
                        <Typography className='detalle-resultado'>
                            {ordenDetalle.sedeCliente.direccion}
                        </Typography>
                    </Grid>
                    <Grid className='detalle-item'>
                        <Typography className='detalle-label'>
                            Producto:
                        </Typography>
                        <Typography className='detalle-resultado'>
                            {ordenDetalle.productoVenta.producto.nombre}
                        </Typography>
                    </Grid>
                    <Grid className='detalle-item'>
                        <Typography className='detalle-label'>
                            Marca:
                        </Typography>
                        <Typography className='detalle-resultado'>
                            {ordenDetalle.productoVenta.marca.nombre}
                        </Typography>
                    </Grid>
                    <Grid className='detalle-item'>
                        <Typography className='detalle-label'>
                            Cantidad:
                        </Typography>
                        <Typography className='detalle-resultado'>
                            {ordenDetalle.cantidad + " " + ordenDetalle.productoVenta.unidad.nombre}
                        </Typography>
                    </Grid>
                    <Grid className='detalle-item'>
                        <Typography className='detalle-label'>
                            Tracto del vehículo:
                        </Typography>
                        <Typography className='detalle-resultado'>
                            {ordenDetalle.tracto.placa}
                        </Typography>
                    </Grid>
                    <Grid className='detalle-item'>
                        <Typography className='detalle-label'>
                            Carreta del vehículo:
                        </Typography>
                        <Typography className='detalle-resultado'>
                            {ordenDetalle.carreta.placa}
                        </Typography>
                    </Grid>
                    {
                        state.terminado && 
                        <>
                        <Grid className='detalle-item'>
                            <Typography className='detalle-label'>
                                Fecha de recojo:
                            </Typography>
                            <Typography className='detalle-resultado'>
                                {state.fechaRecojo}
                            </Typography>
                        </Grid>
                        <Grid className='detalle-item'>
                            <Typography className='detalle-label'>
                                Hora de llegada:
                            </Typography>
                            <Typography className='detalle-resultado'>
                                {state.horaLlegada}
                            </Typography>
                        </Grid>
                        <Grid className='detalle-item'>
                            <Typography className='detalle-label'>
                                Hora de salida:
                            </Typography>
                            <Typography className='detalle-resultado'>
                                {state.horaSalida}
                            </Typography>
                        </Grid>
                        </>
                    }
                </Card>
                )
            }
            <Grid className='grid-volver'>
                <Button 
                    variant="contained" 
                    className='button-volver-detalle'
                    onClick={() => handleVolver()}
                >
                    VOLVER
                </Button>
            </Grid>
        </div>
    )
}
