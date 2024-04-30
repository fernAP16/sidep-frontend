import { createTheme } from "@mui/material/styles";
import { BLACK, GREEN, ORANGE, PRIMARY, WHITE } from "../../constants/colors";

const theme = createTheme({
  palette: {
    background: {
      default: WHITE,
    },
    primary: {
      main: PRIMARY,
      contrastText: WHITE,
    },
    danger: {
      main: ORANGE,
      contrastText: WHITE,
    },
    warning: {
      main: ORANGE,
      contrastText: WHITE,
    },
    login: {
      main: WHITE,
    },
    access: {
      main: GREEN,
      contrastText: WHITE,
    },
    antiAccess:{
      main: WHITE,
      contrastText: GREEN,
    },
    exit: {
      main: PRIMARY,
      contrastText: WHITE,
    },
    action: {
      main: BLACK,      
      secondary: WHITE,
      contrastText: WHITE,      
    }
  }
});

theme.typography.h1 = {
  fontSize: "32",
  fontFamily: "Roboto",
  fontWeight: "bold"
};

theme.typography.h2 = {
  fontSize: "24",
  fontFamily: "Roboto",
  fontWeight: "bold"
};

theme.typography.h3 = {
  fontSize: "18",
  fontFamily: "Roboto",
  fontWeight: 600
};

theme.typography.h4 = {
  fontSize: "16",
  fontFamily: "Roboto",
  fontWeight: 600
};

theme.typography.h5 = {
  fontSize: "14",
  fontFamily: "Roboto",
  fontWeight: 600
};

theme.typography.h6 = {
  fontSize: "10",
  fontFamily: "Roboto",
  fontWeight: 600
};

theme.typography.body1 = {
  fontSize: "14",
  fontFamily: "Roboto",
  fontWeight: 600
};

theme.typography.body2 = {
  fontSize: "14",
  fontFamily: "Roboto"
};

theme.typography.button = {
  fontSize: "16",
  fontFamily: "Roboto",
  fontWeight: 600
};

theme.components.MuiBottomNavigationAction = {
  styleOverrides: {
    root: {
      font: (theme) => theme.typography.h6,
      color: WHITE,
      minWidth:"65px"
    },
  },
};

export default theme;
