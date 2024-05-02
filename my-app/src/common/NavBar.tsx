import React from "react";
import { AppBar, Box, Button, Container, Grid, Stack, Toolbar } from "@mui/material";
import Logo from '../assets/images/logo-empresa.png';
import { useNavigate } from "react-router-dom";

export const NavBar: React.FC<{}> = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ boxShadow: "none", bgcolor: "transparent", width: "100%", left: 0 }}>
                <Toolbar>
                    <Container maxWidth="xl" sx={{ backgroundColor: '#fff', boxShadow: '0 5px 80px rgba(0, 0, 0, 0.205)', justifyContent: "space-between", height: "90px", alignItems: "center", display: "flex", top: "0" }}>
                        <Grid container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2} // Espaciado entre los elementos del Grid
                            sx={{ flexGrow: 1 }} // Ocupar todo el espacio disponible hacia los laterales
                        >
                            <Grid item container alignItems="center" xs={3}> {/* Ancho del 50% */}
                                <img src={Logo} alt="Logo de la empresa" style={{ maxWidth: "60px", width: "100%", display: "flex" }} />
                                <h2 style={{ color: "#000", fontSize: "1.8rem", fontWeight: "400", marginLeft: "10px" }}>
                                    English<span style={{ fontWeight: "bold" }}>Workshop</span>
                                </h2>
                            </Grid>
                            <Grid item container alignItems="center" xs={3.8}> {/* Ancho del 50% */}
                                {/* Navegador */}
                                <nav style={{ marginRight: "auto" }}>
                                    <ul style={{ display: "flex", listStyle: "none", padding: 0, fontFamily: 'Poppins, sans-serif', fontSize: "1rem", fontWeight: "bold", cursor: "pointer" }}>
                                        <li style={{ marginRight: "20px" }}><a style={{ fontSize: "1rem", color: "#000000", textDecoration: "none", position: "relative" }} href="/">Inicio</a></li>
                                        <li style={{ marginRight: "20px" }}><a style={{ fontSize: "1rem", color: "#000000", textDecoration: "none", position: "relative" }} href="/">Servicios</a></li>
                                        <li><a style={{ fontSize: "1rem", color: "#000000", textDecoration: "none", position: "relative" }} href="/">Ayuda</a></li>
                                    </ul>
                                </nav>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" onClick={() => navigate("login")}>Login</Button>
                                    <Button variant="outlined">Sing in</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
