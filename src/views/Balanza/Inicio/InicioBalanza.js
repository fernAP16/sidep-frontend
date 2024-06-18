import { Grid, Typography } from '@mui/material';
import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../routes/routes';
import '../../../constants/commonStyle.css';
import './InicioBalanza.css';
import { Scanner } from '@yudiel/react-qr-scanner';

export const InicioBalanza = () => {
  let { state } = useLocation();
  let navigate = useNavigate();
  let [idBalanza, setIdBalanza] = useState(0);
  let [codigoBalanza, setCodigoBalanza] = useState('');
  let [idTipoPesaje, setIdTipoPesaje] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = React.useState(false);
  const [mensajeError, setMensajeError] = React.useState('');
  const idBalanzaRef = useRef(idBalanza);
  const codigoBalanzaRef = useRef(codigoBalanza);
  const isScanningRef = useRef(true);
  const errorRef = useRef(error);
  const mensajeErrorRef = useRef(mensajeError);

  React.useEffect(() => {
    const idBlz = state?.idBalanza || localStorage.getItem('idBalanza');
    const codigoBlz = state?.codigoBalanza || localStorage.getItem('codigoBalanza');
    const idTipoPsj = state?.idTipoPesaje || localStorage.getItem('idTipoPesaje');
    setIdBalanza(idBlz);
    setCodigoBalanza(codigoBlz);
    setIdTipoPesaje(idTipoPsj);
    return () => {
      console.log("Component unmounted");
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, []);

  React.useEffect(() => {
    idBalanzaRef.current = idBalanza; // Actualiza la referencia cuando idBalanza cambia
  }, [idBalanza]);

  React.useEffect(() => {
    codigoBalanzaRef.current = codigoBalanza;
  }, [codigoBalanza]);

  React.useEffect(() => {
    isScanningRef.current = isScanning;
  }, [isScanning])

  React.useEffect(() => {
    errorRef.current = error;
  }, [error])

  React.useEffect(() => {
    mensajeErrorRef.current = mensajeError;
  }, [mensajeError])

  const separarCadena = (cadena) => {
    const partes = cadena.split('/');
    let resultado = {};

    resultado = {
      idColaPesaje: Number(partes[1]),
      idBalanza: Number(partes[3]),
      idDespacho: Number(partes[5]),
      posicion: Number(partes[7])
    };

    return resultado;
  };

  const validarResultado = (resultado) => {
    if (resultado.idColaPesaje === null || resultado.idBalanza === null || resultado.idDespacho === null) return -6;
    if (isNaN(resultado.idColaPesaje) || isNaN(resultado.idBalanza) || isNaN(resultado.idDespacho)) return -5;
    if (isNaN(parseInt(resultado.idColaPesaje)) || !isFinite(parseInt(resultado.idColaPesaje))) return -4;
    if (isNaN(parseInt(resultado.idBalanza)) || !isFinite(parseInt(resultado.idBalanza))) return -3;
    if (isNaN(parseInt(resultado.idDespacho)) || !isFinite(parseInt(resultado.idDespacho))) return -2;
    if (parseInt(idBalanzaRef.current) !== parseInt(resultado.idBalanza)) return -1;
    if(parseInt(resultado.posicion) !== 1) return 0;
    return 1;
  };

  const handleOnResult = useCallback((result, error) => {
    if(!isScanning || !isScanningRef.current)return;
    if (!error) {
      console.error(error);
      return;
    }

    if (result) {
      const resultado = separarCadena(result);
      if(resultado.idColaPesaje === null || resultado.idBalanza === null || resultado.idDespacho === null || resultado.posicion === null){
        setMensajeError("QR inválido");
        setError(true);
        setTimeout(() => {
          setMensajeError('');
          setError(false);
        }, 3000);
        return;
      }
      
      const validacion = validarResultado(resultado);
      if (validacion === 1) {
        isScanningRef.current = false;
        navigate(ROUTES.PESAJE_BALANZA, {
          state: {
            idBalanza: resultado.idBalanza,
            idColaPesaje: resultado.idColaPesaje,
            codigoBalanza: codigoBalanzaRef.current,
            idDespacho: resultado.idDespacho,
            idTipoPesaje: idTipoPesaje
          },
        });
      } else if(validacion === 0){
          setMensajeError("No es el turno del conductor");
          setError(true);
          setTimeout(() => {
            setMensajeError('');
            setError(false);
          }, 3000);
      } else if(validacion === -1) {
        setMensajeError("No es la balanza asignada del conductor");
        setError(true);
        setTimeout(() => {
          setMensajeError('');
          setError(false);
        }, 3000);
      } else {
        setMensajeError("QR inválido");
        setError(true);
        setTimeout(() => {
          setMensajeError('');
          setError(false);
        }, 3000);
      }
    }
  }, [codigoBalanza, idBalanza, navigate]);

  

  return (
    <div className='margin-pantalla'>
      <Grid className='grid-titulo-inicio'>
        <Typography className='codigo-titulo-inicio'>{codigoBalanza}</Typography>
        <Typography className='label-titulo-inicio'>Escanear QR del conductor</Typography>
      </Grid>
      <Grid>
        {isScanningRef.current && (
          <Scanner
            onResult={handleOnResult}
            constraints={{ video: { facingMode: 'environment'} }}
            components={{ audio: false }}
          />
        )}
      </Grid>
      {error &&
          <Grid className='mensaje-error-grid'>
            <Typography
              className='mensaje-error-balanza'
            >
              { mensajeError }
            </Typography>
          </Grid>
        }
    </div>
  );
};
