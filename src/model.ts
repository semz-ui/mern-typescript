export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}

export interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password2: string;
}

export interface RegisterForm {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface LoginForm {
    email: string;
    password: string;
}