import React, {useState, useEffect} from "react";
import { Container, Typography, Box, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function Profile() {
    const [userProfile, setUserProfile] = useState({});

    if (!localStorage.getItem("token")) {
        window.location.href = "/login";
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error fetching user profile");
                }

                const data = await response.json();
                setUserProfile(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Personal Information
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>First Name</TableCell>
                                            <TableCell>{userProfile.firstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Last Name</TableCell>
                                            <TableCell>{userProfile.lastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            <TableCell>{userProfile.email}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Profile;
