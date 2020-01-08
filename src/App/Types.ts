
export interface Mail {
    id: string;
    sectionId: string;
    date: string;
    from: string;
    to: string;
    subject: string;
    content: string;
    isRead: boolean;
    isDeleted: boolean;
}

export interface Section {
    id: string;
    name: string;
    icon: string;
}
