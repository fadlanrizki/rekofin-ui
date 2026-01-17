import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003366",
    },
    secondary: {
      main: "#2ecc71",
    },
    error: {
      main: "#e74c3c",
    },
    background: {
      default: "#f9f9f9",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#003366",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#ffffff",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;