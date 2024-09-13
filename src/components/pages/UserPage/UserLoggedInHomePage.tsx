import React from 'react';
import { Box } from '@mui/material';

const UserLoggedInHomePage = () => {
    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
        >
            <h1>Welcome to the User Homepage</h1>
            <p>This page is only accessible to logged-in users.</p>
        </Box>
    );
};

export default UserLoggedInHomePage;
