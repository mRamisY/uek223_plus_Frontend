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

    useEffect(() => {
        if (groupId) {
            GroupService.getGroup(groupId).then((response) => {
                setGroup(response);
            });
        }
    }, [groupId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroup({
            ...group,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveGroup = () => {
        GroupService.updateGroup(group).then(() => {
            navigate(`/groups/${groupId}`);
        });
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} maxWidth="500px" margin="auto">
            <TextField
                label="Group Name"
                name="groupName"
                value={group.groupName}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Group Motto"
                name="groupMotto"
                value={group.groupMotto}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Group Logo URL"
                name="groupLogoUrl"
                value={group.groupLogoUrl}
                onChange={handleInputChange}
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleSaveGroup}>
                Save Changes
            </Button>
        </Box>
    );
};

export default GroupEditPage;
