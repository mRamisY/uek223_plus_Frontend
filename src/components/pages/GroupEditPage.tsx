import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import GroupService from '../../Services/GroupService';
import { Group } from '../../types/models/Group.model';

const GroupEditPage = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState<Group>({
        id: '',
        groupName: '',
        groupMotto: '',
        groupLogoUrl: '',
        memberEmails: []
    });
    const navigate = useNavigate();

    // Fetch the group details when groupId changes, and update the state with the fetched data
    useEffect(() => {
        if (groupId) {
            GroupService.getGroup(groupId).then((response) => {
                setGroup(response);
            });
        }
    }, [groupId]);

    // Handle input change in the form fields, updating the group state
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroup({
            ...group,
            [e.target.name]: e.target.value
        });
    };

    // Save the group changes by sending updated data to the API
    const handleSaveGroup = () => {
        GroupService.updateGroup(group).then(() => {
            navigate(`/groups/${groupId}`);
        });
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} maxWidth="500px" margin="auto">
            {/* Form field for editing the group name */}
            <TextField
                label="Group Name"
                name="groupName"
                value={group.groupName}
                onChange={handleInputChange}
                fullWidth
            />
            {/* Form field for editing the group motto */}
            <TextField
                label="Group Motto"
                name="groupMotto"
                value={group.groupMotto}
                onChange={handleInputChange}
                fullWidth
            />
            {/* Form field for editing the group logo URL */}
            <TextField
                label="Group Logo URL"
                name="groupLogoUrl"
                value={group.groupLogoUrl}
                onChange={handleInputChange}
                fullWidth
            />
            {/* Button to save the changes made to the group */}
            <Button variant="contained" color="primary" onClick={handleSaveGroup}>
                Save Changes
            </Button>
        </Box>
    );
};

export default GroupEditPage;
