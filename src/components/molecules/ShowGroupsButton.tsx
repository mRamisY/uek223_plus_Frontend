import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import GroupService from "../../Services/GroupService";
import { Group } from "../../types/models/Group.model";

interface ShowGroupsButtonProps {
    isAdmin: boolean;
    userGroupId: string | null;
}

/**
 * ShowGroupsButton Component
 * - Displays a button to show available groups.
 * - Admin can view all group details, users can only view their own group's details.
 * - Non-group members can join a group.
 */
const ShowGroupsButton: React.FC<ShowGroupsButtonProps> = ({ isAdmin, userGroupId }) => {
    // State to handle dialog visibility
    const [open, setOpen] = useState(false);

    // State to store groups fetched from backend
    const [groups, setGroups] = useState<Group[]>([]);

    // State to handle snackbar visibility when a user tries to access a group they are not a part of
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const navigate = useNavigate();

    // Fetch groups when the component mounts
    useEffect(() => {
        GroupService.getAllGroups().then((response) => {
            setGroups(response.data);
        });
    }, []);

    // Opens the dialog with available groups
    const handleShowGroups = () => {
        setOpen(true);
    };

    // Closes the dialog
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Handles group click:
     * - Admins can view all groups.
     * - Users can only view their own group's details.
     * If the user is not in the group, a snackbar is displayed.
     */
    const handleGroupClick = (groupId: string) => {
        if (isAdmin || groupId === userGroupId) {
            navigate(`/groups/${groupId}`);
        } else {
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            {/* Button to open the dialog and show groups */}
            <Button variant="contained" onClick={handleShowGroups}>
                Show Groups
            </Button>

            {/* Dialog to display the list of groups */}
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>Available Groups</DialogTitle>
                <DialogContent>
                    <List>
                        {groups.map((group) => (
                            <ListItem key={group.id} button onClick={() => handleGroupClick(group.id)}>
                                {/* Avatar to display the group logo */}
                                <ListItemAvatar>
                                    <Avatar src={group.groupLogoUrl} alt={group.groupName} />
                                </ListItemAvatar>
                                {/* Group name and number of members displayed */}
                                <ListItemText
                                    primary={group.groupName}
                                    secondary={`Members: ${group.memberEmails.length}/10`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>

            {/* Snackbar to notify the user if they are not allowed to view a group's details */}
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message="You must join the group first to see its details."
                autoHideDuration={3000}
            />
        </div>
    );
};

export default ShowGroupsButton;
