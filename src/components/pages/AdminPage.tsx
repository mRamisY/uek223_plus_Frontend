import React from 'react';
import { Box, Typography } from '@mui/material';

const AdminPage = () => {
    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
        >
            <Typography variant="h1">Admin Page</Typography>
            <Typography>This page is only accessible to Admins.</Typography>
        </Box>
    );
};

export default AdminPage;
