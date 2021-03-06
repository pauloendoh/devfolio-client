import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1E1E1E",
      paper: "#2B2B2B",
    },
    primary: { main: "#3DAC8D", contrastText: "#fff" },
    secondary: { main: "#C862AC" },
    info: { main: "#4E4E4E" },
  },
  typography: {
    // fontFamily: `'Open Sans', sans-serif;`, // imported at index.css
    fontFamily: `'Noto Sans', sans-serif;`, // imported at index.css
    fontSize: 13,
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "#2B2B2B",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "#1E1E1E",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: 32,
          paddingRight: 32,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: { color: "#292929" },
        tooltip: {
          backgroundColor: "#292929",
        },
      },
    },
  },
});

export default theme;
