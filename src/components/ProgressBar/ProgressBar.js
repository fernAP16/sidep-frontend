import { Grid } from '@mui/material';
import React from 'react';

import './ProgressBar.css';

export const ProgressBar = (props) => {

    const { fase } = props;
    
    

    return (
        <div className='progress-bar'>
            <Grid className='div-progress-bar'>
                <Grid xs={1} className={'dot ' + (fase >= 1 ? 'red-dot' : '')}>
                    1
                </Grid>
                <Grid xs={1} className={'line ' + (fase >= 2 ? 'red-line' : '')}>

                </Grid>
                <Grid xs={1} className={'dot ' + (fase >= 2 ? 'red-dot' : '')}>
                    2
                </Grid>
                <Grid xs={1} className={'line ' + (fase >= 3 ? 'red-line' : '')}>

                </Grid>
                <Grid xs={1} className={'dot ' + (fase >= 3 ? 'red-dot' : '')}>
                    3
                </Grid>
                <Grid xs={1} className={'line ' + (fase >= 4 ? 'red-line' : '')}>

                </Grid>
                <Grid xs={1} className={'dot ' + (fase >= 4 ? 'red-dot' : '')}>
                    4
                </Grid>
                <Grid xs={1} className={'line ' + (fase >= 5 ? 'red-line' : '')}>

                </Grid>
                <Grid xs={1} className={'dot ' + (fase >= 5 ? 'red-dot' : '')}>
                    5
                </Grid>
                
            </Grid>
            <Grid className='div-progress-text'>
                <Grid xs={1} className={'text-progress ' + (fase === 1 ? 'text-progress-selected' : '')}>
                    Revisión
                </Grid>
                <Grid xs={1} className={'text-progress ' + (fase === 2 ? 'text-progress-selected' : '')}>
                    Pesaje vacío
                </Grid>
                <Grid xs={1} className={'text-progress ' + (fase === 3 ? 'text-progress-selected' : '')}>
                    Carga de productos
                </Grid>
                <Grid xs={1} className={'text-progress ' + (fase === 4 ? 'text-progress-selected' : '')}>
                    Pesaje lleno
                </Grid>
                <Grid xs={1} className={'text-progress ' + (fase === 5 ? 'text-progress-selected' : '')}>
                    Salida
                </Grid>
                
            </Grid>
        </div>
    )
}
