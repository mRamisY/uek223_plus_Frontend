import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import ShowGroupsButton from "../../molecules/ShowGroupsButton";

/**
 * UserLoggedInHomePage Component
 * - Displays the homepage for a logged-in user.
 * - Allows user to view their own information and see available groups.
 */
const UserLoggedInHomePage = () => {
    // Access the active user from context
    const { user } = useContext(ActiveUserContext);

    const navigate = useNavigate();

    return (
        <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
            <h1>Welcome to Your Homepage</h1>

            {/* Button to navigate to user edit page */}
            <Button
                variant="contained"
                onClick={() => navigate(`/useredit/${user?.id}`)}
            >
                View My Information
            </Button>

            {/* ShowGroupsButton allows user to see available groups */}
            <ShowGroupsButton isAdmin={false} userGroupId={user?.id || null} />
        </Box>
    );
};

export default UserLoggedInHomePage;
