import React from 'react';
import { Container, Grid, Paper, Box, Typography, Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleUserManagementClick = () => {
    navigate('/profileAdmin');
  };

  const handleAttendanceClick = () => {
    navigate('/asistencia');
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "80vh" }}
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
            padding: "2em",
            borderRadius: "0.5em",
            backgroundColor: "#fff",
            position: "relative",
            boxShadow: '0 5px 80px rgba(0, 0, 0, 0.305)'
          }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>Teacher Activity Center</Typography>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Tooltip title="Here you can manage the access to the user's courses." arrow>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3}}
                  onClick={handleUserManagementClick}
                >
                  Manage Users
                </Button>
              </Tooltip>
              <Tooltip title="View attendance of all users." arrow>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3 }}
                  onClick={handleAttendanceClick}
                >
                  View Attendance
                </Button>
              </Tooltip>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
