import React from 'react';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { Button, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { obtenerDatosPesaje } from '../../../../services/Despacho/PesajeVacio';
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import './PesajeVacio.css'

export const PesajeVacio = () => {

  let { state } = useLocation();
  const [idColaPesaje, setIdColaPesaje] = React.useState(0);
  const [idBalanza, setIdBalanza] = React.useState('');
  const [codigoBalanza, setCodigoBalanza] = React.useState('');
  const [idDespachoSelected, setIdDespachoSelected] = React.useState(0);
  const [idPlantaSelected, setIdPlantaSelected] = React.useState(0);
  const [valorPesaje, setValorPesaje] = React.useState(null);
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    const idDespacho = state.idDespacho;
    const idPlanta = state.idPlanta;
    setIdDespachoSelected(idDespacho);
    setIdPlantaSelected(idPlanta);
    obtenerDatosPesaje(idDespacho, 1)
    .then(function(response){
      console.log(response);
      const idColaPsj = response.data.idColaPesaje;
      const idBlz = response.data.idZonaBalanza;
      const codigoBlz = response.data.codigoZonaBalanza;
      const valorPsj = response.data.valorPesaje;
      setIdColaPesaje(idColaPsj)
      setIdBalanza(idBlz)
      if(idBlz === 0){
        setCodigoBalanza("BN");
      } else {
        setCodigoBalanza(codigoBlz);
        setValue("IdColaPesaje/" + idColaPsj + "/Balanza/" + idBlz + "/Despacho/" + idDespacho)
      }
      if(valorPsj !== null) setValorPesaje(valorPsj);
    })
    .catch(function(err){
      console.log(err);
    })
  }, [])

  const handleVerResultados = () => {
  }

  return (
    <>
      <ProgressBar fase={2}/>
      <div className='margin-pantalla-despacho'>
        <Grid className='titulo-revision-grid'>
            <Typography className = "titulo-revision">Balanza asignada: </Typography>
            <Typography className = "punto-control">{codigoBalanza}</Typography>
        </Grid>
        <Grid className='titulo-revision-grid'>
            <Typography className = "titulo-ordenes-text">Diríjase a la balanza y pase el código QR en el lector</Typography>
        </Grid>
        <Grid className='qrpesaje-grid'>
          {value !== null && 
            <QRCode
              size={128}
              style={{ height: "auto", maxWidth: "70%", width: "70%" }}
              value={value}
              viewBox={`0 0 128 128`}
            />
          }
        </Grid>
        <Grid className='grid-button-resultados'>
          <Button
              variant="contained" 
              className='button-resultados'
              disabled={!valorPesaje}
              onClick={() => handleVerResultados()}
          >
              OBTENER RESULTADOS
          </Button>
        </Grid>
      </div>
    </>
  )
}