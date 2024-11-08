export interface User {
    role: 'Teacher' | 'Student' | 'CR';
    sid?: string;
    name: string;
    email?: string;
    department: 'CSE' | 'EEE' | 'BBA' | 'LLB';
    session?: string;
    password: string;
    token: string;
}

export interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
    register: (user: User) => void;
    login: (user: User) => void;
    logout: () => void;
    checkIsLoggedIn: () => void;
}