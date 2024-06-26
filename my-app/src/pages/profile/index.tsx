import React from "react";
import { Container, Paper, Box, Avatar, Typography, Grid } from '@mui/material';
import GoogleCalendarButton from './agendar';

export const Profile: React.FC<{}> = () => {
  // Simular datos de usuario
  const user = {
    name: "Bruno",
    lastname: "Toro",
    rut: "12345678-9",
    profession: "Student",
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Grid container spacing={2}>
        <Grid item sm={1.85}>
          <Paper sx={{ p: 1, borderRadius: '100px' }} elevation={3}>
            <Avatar sx={{ width: 100, height: 100 }}>{user.name?.charAt(0)}</Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper sx={{ p: 2 }} elevation={3}>
            <Typography variant="h6">User Information</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography><strong>Name:</strong> {user.name}</Typography>
              <Typography><strong>Last Name:</strong> {user.lastname}</Typography>
              <Typography><strong>RUT:</strong> {user.rut}</Typography>
              <Typography><strong>Profession:</strong> {user.profession}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <GoogleCalendarButton />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
