import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { esES } from '@mui/x-date-pickers/locales/esES';
import { AdapterDateFnsBase } from '@mui/x-date-pickers/AdapterDateFnsBase';
import { AppRouter } from './routes/AppRouter/AppRouter';
import theme from '../src/assets/theme/themeConfig';

function App() {

  const innerRef = useRef();

  return (
    <StyledEngineProvider injectFirst>   
      <ThemeProvider theme={theme}>  
        <CssBaseline/>
          <LocalizationProvider dateAdapter={AdapterDateFnsBase} locale={esES}>       
            <AppRouter onError={(error) => console.log(error)} ref={innerRef} />   
          </LocalizationProvider>   
        </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
