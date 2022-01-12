import React from 'react';
import '../App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Signin from './Signin';

function LandingPage() {
  return (
    <div className="card">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Please Sign In to Continue!
          </Typography>
          <Container fixed>
            <Signin />
          </Container>
        </CardContent>
      </Card>
    </div>
  );
}

export default LandingPage;
