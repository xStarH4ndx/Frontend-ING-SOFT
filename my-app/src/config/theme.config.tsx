import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

type ThemeProp = {
    children: JSX.Element
}

export enum themePalette {
    BG = "#fff",
    BLUE = "#1d4ed8",
    FONT_GLOBAL = "'Poppins', sans-serif",
    BLACK = "#00000",
    //Alert Styles
    ERROR_MAIN = "#f44336",
    BG_ERROR_MAIN = "rgba(244,67,54,0.4)",
    SUCCESS_MAIN = "#4caf50",
    BG_SUCCESS_MAIN = "rgba(76, 175, 80, 0.4)",
}

const theme = createTheme({
    palette:{
        mode:"light",
        background:{
            default: themePalette.BG,
        },
        primary:{
            main: themePalette.BLUE,
        },
        text: {
            primary: themePalette.BLACK,
        },
    },
    typography:{
        fontFamily: themePalette.FONT_GLOBAL,
        
    },
    components:{
        MuiButton:{
            defaultProps:{
                style:{
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "9px",
                    transition: "all 0.3s ease",
                    color: "#ffff",
                    cursor: "pointer",
                }
            }
        },
        MuiAlert:{
            defaultProps:{
                style:{
                    borderRadius: "0.8em",
                    fontSize: "1em",
                },
            },
            styleOverrides:{
                standardError:{
                    border:`2px solid ${themePalette.ERROR_MAIN}`,
                    background: themePalette.BG_ERROR_MAIN,
                },
                standardSuccess:{
                    border:`2px solid ${themePalette.SUCCESS_MAIN}`,
                    background: themePalette.BG_SUCCESS_MAIN,
                },
            },
        },
    },
});

export const ThemeConfig: React.FC<ThemeProp> = ({children}) =>{
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};