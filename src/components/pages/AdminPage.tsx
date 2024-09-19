import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShowGroupsButton from "../molecules/ShowGroupsButton";

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
            <ShowGroupsButton isAdmin={true} userGroupId={null} />
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/admin/create-group')}
                style={{ marginTop: '20px' }}
            >
                Create New Group
            </Button>
        </Box>
    );
};

export default AdminHomePage;
