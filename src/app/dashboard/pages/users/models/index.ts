export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    token: string;
    role: string;
  }
  
  export interface CreateUserData {
    name: string;
    surname: string;
    email: string;
    password: string;
    token: string;
    role: string;
  }
  
  export interface UpdateUserData {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    token?: string;
    role?: string;
  }
  