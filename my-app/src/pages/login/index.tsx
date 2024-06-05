import React from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../../graphql/mutation";
import { useMutation } from '@apollo/client';
import { LoginValidate } from "../../utils/validationForm";

type LoginType = {
  correo: string;
  password: string;
};

export const LoginPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { getError, getSucces } = useNotification();
  const [loginData, setLoginData] = React.useState<LoginType>({
    correo: '',
    password: '',
  });

  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login) {
        const token = data.login.token; // Asegúrate de que esta línea coincida con la estructura de tu respuesta de GraphQL
        localStorage.setItem('authToken', token); // Guarda el token en localStorage
        getSucces("Login successful");
        navigate('/curso');
      } else {
        getError("Invalid credentials");
      }
    },
    onError: (error) => {
      getError(error.message);
    },
  });

  const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos de login:', loginData); // Verifica los datos capturados
    LoginValidate.validate(loginData)
      .then(() => {
        login({ variables: { correo: loginData.correo, password: loginData.password } });
      })
      .catch((error) => {
        getError(error.message);
      });
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
          <Paper sx={{ 
            padding: "1.2em", 
            borderRadius: "0.5em", 
            backgroundColor: "#fff", 
            position: "relative", 
            boxShadow: '0 5px 80px rgba(0, 0, 0, 0.305)' 
          }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>¡Welcome!</Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                name="correo"
                margin="normal"
                type="email"
                fullWidth
                label="email"
                sx={{ mt: 1.5, mb: 1.5 }}
                onChange={dataLogin}
              />
              <TextField
                name="password"
                margin="normal"
                type="password"
                fullWidth
                label="password"
                sx={{ mt: 1.5, mb: 1.5 }}
                onChange={dataLogin}
              />
              <Button 
                color="primary" 
                fullWidth 
                variant="outlined" 
                sx={{ mt: 1, mb: 1.5, fontSize: "0.8rem", textAlign: "left"}} 
                onClick={() => navigate("recovery")}
              >
                Did you forget your password?
              </Button>
              <Button fullWidth type="submit" variant="contained" sx={{ mb: 1 }}>Login</Button>
              <Button 
                fullWidth 
                variant="text" 
                sx={{ fontSize: "0.8rem", textAlign: "center", color: "#4273f3"}} 
                onClick={() => navigate("register")}
              >
                Create a new Account
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
