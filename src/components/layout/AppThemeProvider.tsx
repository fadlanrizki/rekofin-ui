"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";

type ThemeMode = "light" | "dark";

const getSystemMode = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const getResolvedMode = () => {
      const dataTheme = document.documentElement.getAttribute("data-theme");

      if (dataTheme === "dark" || dataTheme === "light") {
        return dataTheme;
      }

      // TODO: Re-enable system theme when the dark mode is ready
      //   return getSystemMode();
      return "light";
    };

    setMode(getResolvedMode());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const mediaListener = () => {
      if (!document.documentElement.getAttribute("data-theme")) {
        setMode(getSystemMode());
      }
    };

    media.addEventListener("change", mediaListener);

    const observer = new MutationObserver(() => {
      setMode(getResolvedMode());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      media.removeEventListener("change", mediaListener);
      observer.disconnect();
    };
  }, []);

  const theme = useMemo(() => {
    const paletteByMode =
      mode === "dark"
        ? {
            primary: "#121212",
            secondary: "#2ecc71",
            danger: "#e74c3c",
            background: "#121212",
            surface: "#1b1b1b",
            text: "#ffffff",
            textSecondary: "#d1d5db",
            tableHeadText: "#ffffff",
          }
        : {
            primary: "#003366",
            secondary: "#2ecc71",
            danger: "#e74c3c",
            background: "#f9f9f9",
            surface: "#ffffff",
            text: "#2c3e50",
            textSecondary: "#7f8c8d",
            tableHeadText: "#ffffff",
          };

    return createTheme({
      palette: {
        mode,
        primary: {
          main: paletteByMode.primary,
        },
        secondary: {
          main: paletteByMode.secondary,
        },
        error: {
          main: paletteByMode.danger,
        },
        background: {
          default: paletteByMode.background,
          paper: paletteByMode.surface,
        },
        text: {
          primary: paletteByMode.text,
          secondary: paletteByMode.textSecondary,
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
              backgroundColor: paletteByMode.primary,
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            head: {
              color: paletteByMode.tableHeadText,
              fontWeight: 600,
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
