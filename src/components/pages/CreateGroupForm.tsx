import React, { useState } from 'react';
import { TextField, Button, Box, Avatar, Typography } from '@mui/material';
import GroupService from '../../Services/GroupService';
import { useNavigate } from 'react-router-dom';

/**
 * CreateGroupForm Component
 * - This component provides a form for admin users to create a new group.
 * - The form includes fields for the group's name, motto, and logo URL.
 * - A live preview of the logo is shown when a valid URL is entered.
 */
const CreateGroupForm = () => {
    const [groupData, setGroupData] = useState({
        groupName: '',
        groupMotto: '',
        groupLogoUrl: ''
    });

    // State to hold a preview of the group logo URL
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const navigate = useNavigate();

    /**
     * handleInputChange - Updates the form data when input changes.
     * - If the group logo URL is changed, the logo preview is updated.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGroupData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        // If the user changes the groupLogoUrl, show the new image preview
        if (name === 'groupLogoUrl') {
            setLogoPreview(value);
        }
    };

    /**
     * handleCreateGroup - Sends a request to create the group using GroupService.
     * - Redirects to the admin home page after the group is created.
     */
    const handleCreateGroup = () => {
        const newGroup = {
            ...groupData,
            id: '',
            memberEmails: []
        };

        GroupService.addGroup(newGroup).then(() => {
            navigate('/admin-home');
        });
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} maxWidth="500px" margin="auto">
            <Typography variant="h4">Create New Group</Typography>

            {/* Group Name input field */}
            <TextField
                label="Group Name"
                name="groupName"
                value={groupData.groupName}
                onChange={handleInputChange}
                fullWidth
            />

            {/* Group Motto input field */}
            <TextField
                label="Group Motto"
                name="groupMotto"
                value={groupData.groupMotto}
                onChange={handleInputChange}
                fullWidth
            />

            {/* Group Logo URL input field */}
            <TextField
                label="Group Logo URL"
                name="groupLogoUrl"
                value={groupData.groupLogoUrl}
                onChange={handleInputChange}
                fullWidth
            />

            {/* Show logo preview if a valid URL is provided */}
            {logoPreview && (
                <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
                    <Avatar src={logoPreview} alt="Group Logo Preview" sx={{ width: 100, height: 100 }} />
                    <Typography variant="caption">Logo Preview</Typography>
                </Box>
            )}

            {/* Button to submit the form and create the group */}
            <Button variant="contained" color="primary" onClick={handleCreateGroup}>
                Create Group
            </Button>
        </Box>
    );
};

export default CreateGroupForm;
