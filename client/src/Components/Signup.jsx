import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'; 

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.error || 'An error occurred');
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            toast.success('Signup successful!');
            setTimeout(() => {
                navigate('/login'); 
            }, 1500);
            
        } catch (error) {
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
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >
                    <TextField
                        label="First Name"
                        name="firstName"
                        variant="outlined"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        variant="outlined"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '1rem' }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
            <ToastContainer autoClose={1500} />
        </Container>
    );
}

export default Signup;
