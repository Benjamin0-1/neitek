import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Home = () => {
    const [sales, setSales] = useState([]);
    const [commissions, setCommissions] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalCommissions, setTotalCommissions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    if (!localStorage.getItem('token')) {

        window.location.href = '/login';
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [salesResponse, commissionsResponse] = await Promise.all([
                    fetch(`${API_URL}/api/sales/all-sales`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }),
                    fetch(`${API_URL}/api/comission/all-comissions`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                ]);

                if (!salesResponse.ok) {
                    throw new Error('Error fetching sales data');
                }
                if (!commissionsResponse.ok) {
                    throw new Error('Error fetching commissions data');
                }

                const salesData = await salesResponse.json();
                const commissionsData = await commissionsResponse.json();

                setSales(salesData);
                setCommissions(commissionsData);

           
                const totalSalesAmount = salesData.reduce((acc, sale) => acc + parseFloat(sale.totalSales || 0), 0);
                const totalCommissionsAmount = commissionsData.reduce((acc, commission) => acc + parseFloat(commission.totalComission || 0), 0);

                setTotalSales(totalSalesAmount);
                setTotalCommissions(totalCommissionsAmount);
            } catch (error) {
                setError('Error fetching data from the server');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="lg">

            <Box sx={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Welcome !</Typography>
            {/*    <Typography variant="h6">Profile Picture</Typography> */}
            </Box>

 
            <Box sx={{ padding: '2rem 0' }}>
                <Typography variant="h4" gutterBottom>
                    Dashboard Overview
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Sales Summary</Typography>
                                <Typography variant="h6">Total Sales: ${totalSales.toFixed(2)}</Typography>
                                <Typography variant="body1">Recent Sales: ${sales.length > 0 ? parseFloat(sales[sales.length - 1].totalSales || 0).toFixed(2) : 'N/A'}</Typography>
                                <Typography variant="body1">Sales Target: $10000</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Commissions Summary</Typography>
                                <Typography variant="h6">Total Commissions: ${totalCommissions.toFixed(2)}</Typography>
                                <Typography variant="body1">Upcoming Payouts: $300.00</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Sales Table */}
            <Box sx={{ padding: '2rem 0' }}>
                <Typography variant="h4" gutterBottom>
                    Sales Details
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Region</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sales.map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell>{sale.month}</TableCell>
                                    <TableCell>${parseFloat(sale.totalSales || 0).toFixed(2)}</TableCell>
                                    <TableCell>{sale.region}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


            <Box sx={{ padding: '2rem 0' }}>
                <Typography variant="h4" gutterBottom>
                    Commissions Details
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Month</TableCell>
                                <TableCell>Base Commission</TableCell>
                                <TableCell>Service Bonus</TableCell>
                                <TableCell>Equipment Bonus</TableCell>
                                <TableCell>Total Commission</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {commissions.map((commission) => (
                                <TableRow key={commission.id}>
                                    <TableCell>{commission.month}</TableCell>
                                    <TableCell>${parseFloat(commission.baseComission || 0).toFixed(2)}</TableCell>
                                    <TableCell>${parseFloat(commission.serviceBonus || 0).toFixed(2)}</TableCell>
                                    <TableCell>${parseFloat(commission.equipmentBonus || 0).toFixed(2)}</TableCell>
                                    <TableCell>${parseFloat(commission.totalComission || 0).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default Home;
