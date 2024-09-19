export interface Group {
    id: string;
    groupName: string;
    groupMotto: string;
    groupLogoUrl: string;
    memberEmails: string[];
}


export interface GroupMember {
    id: string;
    email: string;
}
