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

    // Fetches group details from the API based on groupId whenever groupId changes
    useEffect(() => {
        if (groupId) {
            GroupService.getGroup(groupId).then((response) => {
                setGroup(response);
            });
        }
    }, [groupId]);

    // Handler for deleting the group, confirms with the user before proceeding
    const handleDeleteGroup = () => {
        if (window.confirm("Are you sure you want to delete this group?")) {
            GroupService.deleteGroup(groupId!).then(() => {
                navigate('/admin-home');
            });
        }
    };

    // Redirects to the group editing page if the group is set
    const handleEditGroup = () => {
        if (group) {
            navigate(`/groups/edit/${group.id}`);
        }
    };

    // Returns a loading indicator until the group details are loaded
    if (!group) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Displays group information including logo, name, and motto */}
            <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
                <Avatar src={group.groupLogoUrl} alt={group.groupName} sx={{ width: 100, height: 100 }} />
                <Typography variant="h4">{group.groupName}</Typography>
                <Typography variant="subtitle1">{group.groupMotto}</Typography>

                {/* Displays a list of group members' emails */}
                <List>
                    {group.memberEmails.map((email) => (
                        <ListItem key={email}>
                            <ListItemText primary={email} />
                        </ListItem>
                    ))}
                </List>

                {/* If the user is an admin, show Edit and Delete buttons */}
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
