import React, { useState, useRef } from "react";
import { Button, Container, Grid, Paper, Avatar, Typography, Box, Divider } from '@mui/material';
import { HeaderComponent } from "../../components";
import { EnglishWorkshopInfo } from "../../components/workshop";

export const HomePage: React.FC<{}> = () => {
    const [showMessage, setShowMessage] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleViewMoreClick = () => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    };

    return (
        <Container maxWidth="xl">
            <HeaderComponent 
                title="Welcome!" 
                description="Connect Through Language"
                element={<Button fullWidth variant="contained" onClick={handleViewMoreClick}>View More</Button>}
                contentRef={contentRef}
            />
            <Container maxWidth="md" sx={{ mt: 5 }} ref={contentRef}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{ display: 'flex', padding: '16px', alignItems: 'center', borderRadius: 30}}>
                            <Avatar 
                                alt="Sandra Raggi" 
                                src="/teacher.jpg" // Reemplaza con la ruta de la foto de perfil
                                style={{ width: 200, height: 200, marginRight: '30px' }}
                            />
                            <Box>
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h6" fontWeight="bold" mr={1}>Name:</Typography>
                                    <Typography variant="h6">Sandra Raggi</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Typography variant="h6" fontWeight="bold" mr={1}>Profession:</Typography>
                                    <Typography variant="h6">English teacher</Typography>
                                </Box>
                                <Divider/>
                                <Box>
                                    <Typography variant="body1" color="textSecondary" style={{ textAlign: 'justify' }}>
                                        Professor of English with 40 years of experience. Master in University Pedagogy. Mainly dedicated to helping people who need to 
                                        improve their oral communication. The courses I teach are personalized. The thematic contents are selected 
                                        according to the students' interests and each of the courses contains concepts, teaching methods and pedagogical 
                                        techniques that allow students to achieve effective communication in English.
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                        <Divider sx={{ mt: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <EnglishWorkshopInfo showMessage={showMessage} setShowMessage={setShowMessage} />
                    </Grid>
                </Grid>
                <Divider sx={{mt:8}}/>
            </Container>
        </Container>
    );
};

export default HomePage;
