export interface User {
    role: 'Teacher' | 'Student' | 'CR';
    sid?: string;
    name: string;
    email?: string;
    department: 'CSE' | 'EEE' | 'BBA' | 'LLB';
    session?: string;
}

export interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
    register: (user: User) => void;
    login: (user: User) => void;
    logout: () => void;
    checkIsLoggedIn: () => void;
}

export interface courseResponse {
    id: number;
    name: string;
    code: string;
    department: string;
    credit: number;
    semester: number;
    session: string;
}

export interface scheduleResponse {
    id: number;
    course: number;
    instructor: number;
    day: string;
    start: string;
    end: string;
    room: string;
    session: string;
    department: string;
}

interface Answer {
  id: number;
  content: string;
  answered_by: number;
  userName: string;
  created_at: string;
}

interface Question {
  id: number;
  content: string;
  asked_by: number;
  userName: string;
  created_at: string;
}