import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShowGroupsButton from "../molecules/ShowGroupsButton";

/**
 * AdminHomePage Component
 * - Provides the main dashboard for admin users, allowing them to manage users, view groups, and create new groups.
 */
const AdminHomePage = () => {
    const navigate = useNavigate();

    /**
     * handleManageUsers - Navigates to the user management page when called.
     */
    const handleManageUsers = () => {
        navigate('/users');
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <h1>Welcome to the Admin Dashboard</h1>

            {/* Button to manage users */}
            <Button
                variant="contained"
                onClick={handleManageUsers}
            >
                Manage Users
            </Button>

            {/* Button to show all groups; the admin has access to this */}
            <ShowGroupsButton isAdmin={true} userGroupId={null} />

            {/* Button to create a new group */}
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
