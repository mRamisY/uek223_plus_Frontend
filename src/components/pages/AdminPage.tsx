import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {
    const navigate = useNavigate();

    const handleManageUsers = () => {
        navigate('/users');
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <h1>Welcome to the Admin Dashboard</h1>
            <Button
                variant="contained"
                onClick={handleManageUsers}
            >
                Manage Users
            </Button>
        </Box>
    );
};

export default AdminHomePage;
