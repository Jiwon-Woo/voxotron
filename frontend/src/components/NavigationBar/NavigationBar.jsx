import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import './NavigationBar.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const handleClickCreate = () => {
    navigate('/create');
  };
  const handleClickPolls = () => {
    navigate('/poll');
  };

  return (
    <AppBar className="navigation-bar" position="static">
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <MenuItem key="create" onClick={handleClickCreate}>
            <Typography textAlign="center">Create Poll</Typography>
          </MenuItem>
          <MenuItem key="poll" onClick={handleClickPolls}>
            <Typography textAlign="center">View Poll</Typography>
          </MenuItem>
        </Box>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
