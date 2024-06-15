import React, { useState } from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';

type RegisterType = {
    username: string;
    lastname: string;
    rut: string;
    profesion: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterPage: React.FC<{}> = () => {
    const [registerData, setRegisterData] = useState<RegisterType>({
        username: "",
        lastname: "",
        rut: "",
        profesion: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        console.log(registerData);
        //ACÁ SE MANDAN LOS DATOS AL SERVER

        


    };

    return (
        <Container maxWidth="sm">
            <Grid container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                {/* Círculo superior derecho */}
                <div style={{ 
                    position: "absolute", 
                    top: "-350px", 
                    right: "-350px", 
                    width: "800px", 
                    height: "800px", 
                    borderRadius: "50%", 
                    backgroundColor: "#fd5f30", 
                    zIndex: -1 
                }}></div>
                {/* Círculo inferior izquierdo */}
                <div style={{ 
                    position: "absolute", 
                    bottom: "-350px", 
                    left: "-350px", 
                    width: "800px", 
                    height: "800px", 
                    borderRadius: "50%", 
                    backgroundColor: "#4273f3", 
                    zIndex: -1 
                }}></div>
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", boxShadow: '0 5px 80px rgba(0, 0, 0, 0.305)' }}>
                        
                        <Typography variant="h4" align="center">Create Account</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        sx={{ mt: 2, mb: 1.5 }}
                                        name="username"
                                        label="Name"
                                        fullWidth
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        sx={{ mt: 2, mb: 1.5 }}
                                        name="lastname"
                                        label="Last Name"
                                        fullWidth
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        sx={{ mt: 1.5, mb: 1.5 }}
                                        name="rut"
                                        label="Rut"
                                        fullWidth
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        sx={{ mt: 1.5, mb: 1.5 }}
                                        name="profesion"
                                        label="Profession"
                                        fullWidth
                                        required
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                name="email"
                                type="email"
                                fullWidth
                                label="Email"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="password"
                                type="password"
                                fullWidth
                                label="Password"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="confirmPassword"
                                type="password"
                                fullWidth
                                label="Confirm password"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>Sing Up</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
