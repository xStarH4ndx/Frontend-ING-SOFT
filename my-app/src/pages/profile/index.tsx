import React, { useState } from "react";
import { Container, Paper, Box, Avatar, Typography, Grid, Button } from '@mui/material';
import GoogleCalendarButton from './agendar';
import { EnglishWorkshopInfo } from '../../components/workshop/';
import { useQuery } from "@apollo/client";
import { GET_INFORMACION, VERIFICAR_PAGADO } from "../../api/graphql/query";
import Loading from "../../components/Loading/Loading";

export const Profile: React.FC<{}> = () => {
  const { data, loading, error } = useQuery(GET_INFORMACION);
  const { data: dataPago, loading: loadingPago, error: errorPago } = useQuery(VERIFICAR_PAGADO);

  const [showMessage, setShowMessage] = useState(false);

  if (loading || loadingPago) return <Loading />;
  if (error || errorPago) return <p>Error: {error?.message || errorPago?.message}</p>;

  const user = data?.getInformacion;
  const pagado = dataPago?.verificarPago;

  const handleInscribeClick = () => {
    setShowMessage(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Grid container spacing={2}>
        <Grid item sm={1.85}>
          <Paper sx={{ p: 1, borderRadius: '100px' }} elevation={3}>
            <Avatar sx={{ width: 100, height: 100 }}>{user.username?.charAt(0)}</Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper sx={{ p: 2 }} elevation={3}>
            <Typography variant="h6">User Information</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography><strong>Name:</strong> {user.username}</Typography>
              <Typography><strong>Last Name:</strong> {user.lastname}</Typography>
              <Typography><strong>RUT:</strong> {user.rut}</Typography>
              <Typography><strong>Profession:</strong> {user.profesion}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              {pagado ? (
                <GoogleCalendarButton />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  href="https://wa.me/+56948667729"
                  target="_blank"
                >
                  Contact Support
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <EnglishWorkshopInfo showMessage={showMessage} setShowMessage={setShowMessage} />
      </Box>
    </Container>
  );
};

export default Profile;
