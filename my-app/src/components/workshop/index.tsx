import React from "react";
import { Paper, Box, Typography, Grid, Button } from '@mui/material';
import sesionOnlineImage from '../../assets/images/sesionOnline.jpg'; // Importa la imagen aquí

interface EnglishWorkshopInfoProps {
  showMessage: boolean;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EnglishWorkshopInfo: React.FC<EnglishWorkshopInfoProps> = ({ showMessage, setShowMessage }) => {
  const handleInscribeClick = () => {
    setShowMessage(true);
  };

  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <img
            src={sesionOnlineImage} // Ruta de la imagen importada
            alt="Sesión online"
            style={{ width: '100%', borderRadius: '10px' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleInscribeClick}
            >
              Buy Now!
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Box sx={{ textAlign: 'justify' }}>
            <Typography variant="h6" gutterBottom>
              Unleash Your English and Accomplish Your Goals with Our Specialized Workshop!
            </Typography>
            <Typography gutterBottom>
              Do you yearn to master English to propel your career, fully savor your travels, or communicate confidently in any setting?
            </Typography>
            <Typography gutterBottom>
              Our personalized English workshop presents you with 24 dynamic and participatory classes, meticulously designed to enhance your fluency and confidence in the language through real-life scenarios such as job interviews, presentations, journeys, and more.
            </Typography>
            <Typography>
              Embrace this exceptional opportunity to empower your English and unlock new possibilities.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {showMessage && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            p: 2,
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
            boxShadow: 3,
            zIndex: 9999,
          }}
        >
          <Typography variant="body1">
            Email: the.english.workshop.2024@gmail.com
          </Typography>
          <Typography variant="body1">
            Subject: Workshop Registration
          </Typography>
          <Typography variant="body1">
            Message: I want to register for the English workshop, I need more information
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowMessage(false)}
            sx={{ mt: 1 }}
          >
            Close
          </Button>
        </Paper>
      )}
    </Paper>
  );
};
