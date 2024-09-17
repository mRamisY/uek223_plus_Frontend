import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';

const UserLoggedInHomePage = () => {
    const { user } = useContext(ActiveUserContext);
    const navigate = useNavigate();

    return (
        <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
            <h1>Welcome to Your Homepage</h1>
            <Button
                variant="contained"
                onClick={() => navigate(`/useredit/${user?.id}`)}
            >
                View My Information
            </Button>
        </Box>
    );
};

export default UserLoggedInHomePage;
