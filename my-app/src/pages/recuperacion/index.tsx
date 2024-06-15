import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notification.context";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';

//GraqhQl
import { FORGOT_PASS } from "../../graphql/mutation";
import { useMutation } from "@apollo/client";
import Loading from "../../components/Loading/Loading";
//import { Email } from "@mui/icons-material";

//Control de errores
//import { ForgotPassValidate } from "../../utils/validationForm";

type RecoveryType = {
    email: string;
};

export const RecoveryPage: React.FC<{}> = () => {

    const navigate = useNavigate();
    const { getError, getSucces } = useNotification();

    const [recoveryData, setRecoveryData] = useState<RecoveryType>({
        email: "",
    });


    const [forgotPass, { loading, error, data }] = useMutation(FORGOT_PASS, {
        onCompleted: (data) => {
        if (data.forgotPass) {
            getSucces("A new password has been sent, please check your email.");
            navigate('/login');
        } else {
            getError("Invalid credentials");
        }
        },
        onError: (error) => {
        getError(error.message);
        },
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecoveryData({ ...recoveryData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(recoveryData.email);
        
        try{
            await forgotPass({
                variables:{
                    email:recoveryData.email,
                }
            });
        }catch(e){
            console.log("Correo no encontrado")
        }
        // Aquí podrías enviar los datos a tu servidor para procesar la solicitud de recuperación de contraseña
        // Por ejemplo, puedes llamar a una API para enviar un correo con instrucciones para restablecer la contraseña

    };

    if (loading) return <Loading/>;

    return (
        <Container maxWidth="sm">
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", boxShadow: '0 5px 80px rgba(0, 0, 0, 0.305)' }}>
                        <Typography variant="h4">Recover Password</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                name="email"
                                margin="normal"
                                type="email"
                                fullWidth
                                label="Email"
                                sx={{ mt: 2, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>Send Recovery Email</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
