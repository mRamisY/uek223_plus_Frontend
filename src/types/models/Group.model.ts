export interface Group {
    id: string;
    name: string;
    motto: string;
    logoUrl: string;
    members: GroupMember[];
}

export interface GroupMember {
    id: string;
    email: string;
}
