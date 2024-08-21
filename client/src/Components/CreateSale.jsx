import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Paper, MenuItem } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const CreateSale = () => {
    const [formData, setFormData] = useState({
        month: '',
        serviceSales: '',
        equipmentSales: '',
        totalSales: '',
        commission: '',
        region: '',
    });

    if (!localStorage.getItem('token')) {
        window.location.href = '/login';
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateSale = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/sales/create-sale`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.error || 'An error occurred');
                return;
            }

            toast.success('Sale created successfully!');
            setFormData({
                month: '',
                serviceSales: '',
                equipmentSales: '',
                totalSales: '',
                commission: '',
                region: '',
            }); 
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    const months = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' },
    ];

    return (
        <>
            <Box
                component={Paper}
                sx={{ padding: 3, maxWidth: 600, margin: 'auto', marginTop: 4 }}
            >
                <Typography variant="h5" gutterBottom>
                    Create Sale
                </Typography>
                <form onSubmit={handleCreateSale}>
                    <TextField
                        label="Month"
                        name="month"
                        select
                        value={formData.month}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    >
                        {months.map((month) => (
                            <MenuItem key={month.value} value={month.value}>
                                {month.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Service Sales"
                        name="serviceSales"
                        type="number"
                        value={formData.serviceSales}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Equipment Sales"
                        name="equipmentSales"
                        type="number"
                        value={formData.equipmentSales}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Total Sales"
                        name="totalSales"
                        type="number"
                        value={formData.totalSales}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Commission"
                        name="commission"
                        type="number"
                        value={formData.commission}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Region"
                        name="region"
                        select
                        value={formData.region}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="south">south</MenuItem>
                        <MenuItem value="north">north</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Create Sale
                    </Button>
                </form>
            </Box>
            <ToastContainer autoClose={1500} />
        </>
    );
};

export default CreateSale;
