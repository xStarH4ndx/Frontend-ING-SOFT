import React from "react";
import { Button, Container, Grid, Paper, Avatar, Typography, Box, Divider } from '@mui/material';
import { HeaderComponent } from "../../components";

export const HomePage: React.FC<{}> = () => {
    return (
        <Container maxWidth="xl">
            <HeaderComponent 
                title="Welcome!" 
                description="Connect Through Language"
                element={<Button fullWidth variant="contained">View More</Button>}
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ display: 'flex', padding: '16px', alignItems: 'center' }}>
                        <Avatar 
                            alt="Administrator" 
                            src="/path-to-profile-pic.jpg" // Reemplaza con la ruta de la foto de perfil
                            style={{ width: 200, height: 200, marginRight: '30px' }}
                        />
                        <Box>
                            <Typography variant="h5">Name:</Typography>
                            <Typography variant="h5">Profession:</Typography>
                            <Typography variant="h5">Description:</Typography>
                            <Typography variant="body1" color="textSecondary">
                                Esta es una breve descripción personal del administrador. Aquí puedes incluir información relevante sobre su experiencia y habilidades.
                            </Typography>
                        </Box>
                    </Paper>
                    <Divider sx={{mt:2}}/>
                </Grid>
                <Grid>

                </Grid>
            </Grid>
        </Container>
    );
};
