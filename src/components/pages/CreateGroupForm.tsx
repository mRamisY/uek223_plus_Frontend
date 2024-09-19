import React, { useState } from 'react';
import { TextField, Button, Box, Avatar, Typography } from '@mui/material';
import GroupService from '../../Services/GroupService';
import { useNavigate } from 'react-router-dom';

const CreateGroupForm = () => {
    const [groupData, setGroupData] = useState({
        groupName: '',
        groupMotto: '',
        groupLogoUrl: ''
    });
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGroupData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'groupLogoUrl') {
            setLogoPreview(value);
        }
    };

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
            <TextField
                label="Group Name"
                name="groupName"
                value={groupData.groupName}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Group Motto"
                name="groupMotto"
                value={groupData.groupMotto}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Group Logo URL"
                name="groupLogoUrl"
                value={groupData.groupLogoUrl}
                onChange={handleInputChange}
                fullWidth
            />
            {logoPreview && (
                <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
                    <Avatar src={logoPreview} alt="Group Logo Preview" sx={{ width: 100, height: 100 }} />
                    <Typography variant="caption">Logo Preview</Typography>
                </Box>
            )}
            <Button variant="contained" color="primary" onClick={handleCreateGroup}>
                Create Group
            </Button>
        </Box>
    );
};

export default CreateGroupForm;
