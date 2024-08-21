import React from "react";
import {Container, Typography, Box} from "@mui/material";

function NotFund() {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    textAlign: 'center',
                    padding: '2rem',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    backgroundColor: '#fff'
                }}
            >
                <Box
                    sx={{
                        border: '16px solid #f3f3f3', 
                        borderTop: '16px solid #3498db', 
                        borderRadius: '50%',
                        width: '120px',
                        height: '120px',
                        animation: 'spin 2s linear infinite',
                        marginBottom: '1rem'
                    }}
                />
                <Typography component="h1" variant="h5">
                    404 - Page Not Found
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                    Sorry, the page you are looking for does not exist.
                </Typography>
            </Box>
        </Container>
    );
};

export default NotFund;
