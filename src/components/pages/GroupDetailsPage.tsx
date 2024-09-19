import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import GroupService from "../../Services/GroupService";
import { Group } from "../../types/models/Group.model";
import ActiveUserContext from "../../Contexts/ActiveUserContext";

const GroupDetails = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState<Group | null>(null);
    const activeUserContext = useContext(ActiveUserContext);
    const navigate = useNavigate();

    const isAdmin = activeUserContext.checkRole('ADMIN');

    useEffect(() => {
        if (groupId) {
            GroupService.getGroup(groupId).then((response) => {
                setGroup(response);
            });
        }
    }, [groupId]);

    const handleDeleteGroup = () => {
        if (window.confirm("Are you sure you want to delete this group?")) {
            GroupService.deleteGroup(groupId!).then(() => {
                navigate('/admin-home'); // Redirect to admin home after delete
            });
        }
    };

    const handleEditGroup = () => {
        if (group) {
            navigate(`/groups/edit/${group.id}`);
        }
    };

    if (!group) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
                <Avatar src={group.groupLogoUrl} alt={group.groupName} sx={{ width: 100, height: 100 }} />
                <Typography variant="h4">{group.groupName}</Typography>
                <Typography variant="subtitle1">{group.groupMotto}</Typography>

                {/* List group members */}
                <List>
                    {group.memberEmails.map((email) => (
                        <ListItem key={email}>
                            <ListItemText primary={email} />
                        </ListItem>
                    ))}
                </List>

                {/* Only show Edit and Delete buttons if the user is an admin */}
                {isAdmin && (
                    <Box display="flex" gap={2}>
                        <Button variant="contained" color="primary" onClick={handleEditGroup}>
                            Edit Group
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleDeleteGroup}>
                            Delete Group
                        </Button>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default GroupDetails;
