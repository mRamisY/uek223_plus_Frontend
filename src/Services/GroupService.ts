import api from '../config/Api';
import { Group } from '../types/models/Group.model';

const GroupService = {
    // Get all groups with pagination
    getAllGroups: (page: number = 1, size: number = 5) => {
        return api.get(`/groups?page=${page}&size=${size}`);
    },

    // Get a group by ID
    getGroup: async (groupId: string): Promise<Group> => {
        const { data } = await api.get<Group>(`/groups/${groupId}`);
        return data;
    },

    // Create a new group (Admins only)
    addGroup: (group: Group) => {
        return api.post('/groups', group);
    },

    // Update a group by ID (Admins only)
    updateGroup: (group: Group) => {
        return api.put(`/groups/${group.id}`, group);
    },

    // Delete a group by ID (Admins only)
    deleteGroup: (groupId: string) => {
        return api.delete(`/groups/${groupId}`);
    },

    // Get group members with pagination
    getGroupMembers: (groupId: string, page: number = 1, size: number = 5) => {
        return api.get(`/groups/${groupId}/members?page=${page}&size=${size}`);
    },

    // Add a user to a group
    addUserToGroup: (groupId: string, userId: string) => {
        return api.post(`/groups/${groupId}/members`, { userId });
    },

    // Remove a user from a group
    removeUserFromGroup: (groupId: string, userId: string) => {
        return api.delete(`/groups/${groupId}/members/${userId}`);
    }
};

export default GroupService;
