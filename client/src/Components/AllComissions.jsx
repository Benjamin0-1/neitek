import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function AllComissions() {
    const [commissions, setCommissions] = useState([]);

    if (!localStorage.getItem("token")) {
        window.location.href = "/login";
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/comission/all-comissions`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    toast.error("Error fetching commissions data");
                    return;
                }

                const data = await response.json();
                setCommissions(data);
            } catch (error) {
                toast.error("Error fetching data from the server");
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                All Commissions
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Month</TableCell>
                            <TableCell>Base Commission</TableCell>
                            <TableCell>Service Bonus</TableCell>
                            <TableCell>Equipment Bonus</TableCell>
                            <TableCell>Total Commission</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Sales ID</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {commissions.map((comission) => (
                            <TableRow key={comission.id}>
                                <TableCell>{comission.id}</TableCell>
                                <TableCell>{comission.month}</TableCell>
                                <TableCell>{comission.baseComission}</TableCell>
                                <TableCell>{comission.serviceBonus}</TableCell>
                                <TableCell>{comission.equipmentBonus}</TableCell>
                                <TableCell>{comission.totalComission}</TableCell>
                                <TableCell>{comission.userId}</TableCell>
                                <TableCell>{comission.salesId}</TableCell>
                                <TableCell>{new Date(comission.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{new Date(comission.updatedAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
        </Container>
    );
}

export default AllComissions;
