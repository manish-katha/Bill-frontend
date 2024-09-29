import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useState } from 'react';
import { signup } from '../../api/authapi';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(user); // Call signup API
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      setError(err.message || 'Failed to signup');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff'
        }}
      >
      

        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Create Your Account
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Please fill in the details to sign up
        </Typography>

        {error && <Typography color="error" align="center">{error}</Typography>}

        <TextField
          label="Name"
          name="name"
          fullWidth
          required
          margin="normal"
          value={user.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={user.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={user.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Sign Up
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link component="button" variant="body2" onClick={() => navigate('/login')}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupPage;
