import React from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';

//Notificaciones
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";

//GraphQl
import { LOGIN_MUTATION } from "../../graphql/mutation";
import { useMutation } from '@apollo/client';
import { LoginValidate } from "../../utils/validationForm";
import Loading from "../../components/Loading/Loading";


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
        getSucces("Login successful!");
        navigate('/dashboard');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos de login:', loginData); // Verifica los datos capturados
    LoginValidate.validate(loginData)
      .then(() => {
        login({ variables: { correo: loginData.correo, password: loginData.password } });
      })
      .catch((error) => {
        getError(error.message);
      });
      
    try {
      await login({
        variables:{
          email:loginData.correo,
          password: loginData.password
        }
      });
    } catch (e) {
    }
  };

  if (loading) return <Loading/>

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
                sx={{ mt: 1, mb: 1, fontSize: "0.8rem", textAlign: "left"}} 
                onClick={() => navigate("recovery")}
              >
                Did you forget your password?
              </Button>
              <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>Login</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};