import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notification.context";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';

//import { CREAR_USUARIO } from '../../graphql/mutation'
import { REGISTER } from "../../graphql/mutation";
import Loading from "../../components/Loading/Loading";
import { validarRUT } from "../../utils/rutValidator";


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

    const navigate = useNavigate();
    const { getError, getSucces } = useNotification();

    const [registerData, setRegisterData] = useState<RegisterType>({
        username: "",
        lastname: "",
        rut: "",
        profesion: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [register, { loading, error }] = useMutation(REGISTER, {
        onCompleted: () => {
            getSucces('Registration successful!');
            navigate('/login', { replace: true });
        },
        onError: (error) => {
            // Handle specific errors regarding the registration
            if (error.message.includes('RUT already registered')) {
                getError('RUT already registered.');
            } else if (error.message.includes('Email already registered')) {
                getError('Email already registered.');
            } else {
                getError('An unexpected error occurred.');
            }
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            getError("Passwords do not match");
            return;
        }

        if(!validarRUT(registerData.rut)){
            getError("Invalid RUT!");
            return;
        }

        await register({
            variables:{
                username:registerData.username,
                lastname:registerData.lastname,
                rut:registerData.rut,
                profesion:registerData.profesion,
                email: registerData.email,
                password:registerData.password
            }
        });
    };


    if (loading) return <Loading/>;

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
