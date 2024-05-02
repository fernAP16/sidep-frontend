import React from 'react'
import * as ROUTES from '../../routes/routes.js';
import { useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import './NavBar.css';

export const NavBarRevisor = (props) => {


    let location = useLocation();

    const {
        value,
        setValue,
        changeMenuOption,
        firstIcon,
        secondIcon,
        firstIconRed,
        secondIconRed
    } = props;

    const [leftPosition, setLeftPosition] = React.useState(0)

    React.useEffect(() => {
        let buttonName = 'Inicio';
        let val = 1;

        switch (location.pathname) {
        case ROUTES.INICIO_REVISOR:
            buttonName = 'Inicio';
            val = 0;
            break;
        case ROUTES.REVISION_REVISOR:
            buttonName = 'Revisión';
            val = 1;
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
            id="Inicio"
            label="Inicio"
            icon={
                <img
                src={value === 0 ? firstIconRed : firstIcon}
                alt="Inicio"
                />
            }
            onClick={() => getPosition('Inicio')}
            />
            <BottomNavigationAction
            id="Revisión"
            label="Revisión"
            icon={
                <img
                src={value === 1 ? secondIconRed : secondIcon}
                
                alt="Revisión"
                />
            }
            onClick={() => getPosition('Revisión')}
            />
        </BottomNavigation>
    </Paper>
    )
}
