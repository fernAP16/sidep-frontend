import React from 'react'
import { useLocation } from 'react-router-dom';
import * as ROUTES from '../../routes/routes.js';
import { BottomNavigation, BottomNavigationAction, Grid, Paper } from '@mui/material';
import './NavBar.css';

const NavBar = (props) => {

  let location = useLocation();

  const {
    value,
    setValue,
    changeMenuOption,
    firstIcon,
    secondIcon,
    thirdIcon,
    firstIconRed,
    secondIconRed,
    thirdIconRed
  } = props;

  const [leftPosition, setLeftPosition] = React.useState(0)

  React.useEffect(() => {
    let buttonName = 'Inicio';
    let val = 1;

    switch (location.pathname) {
      case ROUTES.TURNO_ESPERA:
        buttonName = 'Despacho';
        val = 0;
        break;
      case ROUTES.INICIO_CONDUCTOR:
        buttonName = 'Inicio';
        val = 1;
        break;
      case ROUTES.HISTORIAL_CONDUCTOR:
        buttonName = 'Historial';
        val = 2;
        break;
    }

    getPosition(buttonName);
    setValue(val);

  }, [location, changeMenuOption, setValue]);

  const getPosition = (id) => {
    var el = document.getElementById(id).getElementsByTagName("img")[0];
    var viewportOffset = el.getBoundingClientRect();
    var left = viewportOffset.left;
    setLeftPosition(left)
  }

  return (
    <Paper className="bottomNavigationPaper" elevation={5}>
      <BottomNavigation
        showLabels
        className="bottomNavigationCustom"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          changeMenuOption(newValue);
        }}
      >
        <BottomNavigationAction
          id="Despacho"
          label="Despacho"
          icon={
            <img
              src={value === 0 ? firstIconRed : firstIcon}
              alt="Despacho"
            />
          }
          onClick={() => getPosition('Despacho')}
        />
        <BottomNavigationAction
          id="Inicio"
          label="Inicio"
          icon={
            <img
              src={value === 1 ? secondIconRed : secondIcon}
              
              alt="Inicio"
            />
          }
          onClick={() => getPosition('Inicio')}
        />
        <BottomNavigationAction
          id="Historial"
          label="Historial"
          icon={
              <img
                src={ value === 2 ? thirdIconRed : thirdIcon}
                alt="Historial"
              />
          }
          onClick={() => getPosition('Historial')}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default NavBar;