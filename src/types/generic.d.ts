export interface authInitialState {
    token?: string;
    profile?: Promise<profile>;
}

export interface post {
    createdAt?: string;
    id?: number;
    message: string;
    profile: profile;
    isLiked: boolean;
    own?: boolean;
    post?: post;
    comment?: post[]
}

export interface user {
    id: number;
    username: string;
    email: string;
    user_follow?: user[];
    profile: profile;
}

export interface profile {
    id: number;
    nickname: string;
    description: string;
    post?: post[];
    user_follow?: user[]
    user?: user;
}

export interface createProfile {
    nickname: string;
    description?: string
}