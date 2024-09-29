import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logout } from '../../api/authapi';

const MenuBar = ({ onDrawerToggle }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking for the token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Logout logic
      logout()// Remove token from local storage
      localStorage.removeItem('token')
      setIsLoggedIn(false); // Update state
      navigate('/login'); // Redirect to login page
    } else {
      navigate('/login'); // Navigate to login page
    }
  };

  const handleCreateBill = () => {
    navigate('/create-bill'); // Update with the correct path for creating bills
  };

  const handleViewBill = () => {
    navigate('/list'); // Update with the correct path for viewing bills
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Billing App
        </Typography>
        {/* Create Bill and View Bill buttons on the left side */}
        <Button color="inherit" onClick={handleCreateBill} sx={{ ml: 2 }}>
          Create Bill
        </Button>
        <Button color="inherit" onClick={handleViewBill}>
          List Bill
        </Button>
        {/* Login/Logout button on the right side */}
        <Button color="inherit" onClick={handleLoginLogout} sx={{ marginLeft: 'auto' }}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
