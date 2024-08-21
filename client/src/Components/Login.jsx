import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.error || 'An error occurred');
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            toast.success('Login successful!');
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        } catch (error) {
            console.error('Login error:', error); 
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    backgroundColor: '#fff'
                }}
            >
                <Typography component="h1" variant="h5" sx={{ marginBottom: '1rem' }}>
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '1rem' }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
            <ToastContainer autoClose={1500} />
        </Container>
    );
};

export default Login;