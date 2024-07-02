import React from "react";
import { AppBar, Box, Button, Container, Grid, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo-empresa.png';
import AccountMenu from "./AccountMenu";

export const NavBar: React.FC<{}> = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("authToken");

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ boxShadow: "none", bgcolor: "transparent", width: "100%", left: 0 }}>
                <Toolbar>
                    <Container maxWidth="xl" sx={{ backgroundColor: '#fff', boxShadow: '0 5px 8px rgba(0, 0, 0, 0.205)', justifyContent: "space-between", height: "90px", alignItems: "center", display: "flex", top: "0" }}>
                        <Grid container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item container alignItems="center" xs={4}>
                                <img src={Logo} alt="Logo de la empresa" style={{ maxWidth: "60px", width: "100%", display: "flex" }} />
                                <h2 style={{ color: "#000", fontSize: "1.8rem", fontWeight: "400", marginLeft: "10px" }}>
                                    <span style={{fontWeight:"bold"}}>The</span>English<span style={{ fontWeight: "bold" }}>Workshop</span>
                                </h2>
                            </Grid>
                            <Grid item container alignItems="center" xs={3}>
                                <Stack direction="row" spacing={2}>
                                    {isLoggedIn ? (
                                        <AccountMenu />
                                    ) : (
                                        <>
                                            <Button variant="contained" onClick={() => navigate("login")}>Login</Button>
                                            <Button variant="outlined" style={{color:'#000000', borderRadius:"0.7rem"}} onClick={() => navigate("register")}>Sign Up</Button>
                                        </>
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
