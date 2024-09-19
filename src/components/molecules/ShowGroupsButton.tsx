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

const ShowGroupsButton: React.FC<ShowGroupsButtonProps> = ({ isAdmin, userGroupId }) => {
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        GroupService.getAllGroups().then((response) => {
            setGroups(response.data);
        });
    }, []);

    const handleShowGroups = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGroupClick = (groupId: string) => {
        if (isAdmin || groupId === userGroupId) {
            navigate(`/groups/${groupId}`);
        } else {
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleShowGroups}>
                Show Groups
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>Available Groups</DialogTitle>
                <DialogContent>
                    <List>
                        {groups.map((group) => (
                            <ListItem key={group.id} button onClick={() => handleGroupClick(group.id)}>
                                <ListItemAvatar>
                                    <Avatar src={group.groupLogoUrl} alt={group.groupName} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={group.groupName}
                                    secondary={`Members: ${group.memberEmails.length}/10`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>

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
