import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { login } from "../../api/authapi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(credentials); // Call login API
      localStorage.setItem('token', "login"); // Save token to local storage
      navigate("/"); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message || "Failed to login");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
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
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Hi, Welcome Back
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Enter your credentials to continue
        </Typography>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <TextField
          label="Email Address / Username"
          name="email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={credentials.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={credentials.password}
          onChange={handleChange}
        />

        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Remember me"
          sx={{ mt: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
        >
          Sign In
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={handleSignupRedirect}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
