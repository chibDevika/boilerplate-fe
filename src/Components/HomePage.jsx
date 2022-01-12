import React from 'react';
import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Signout from './Signout';

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Container className="signout">
            <Signout />
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HomePage;
