import type { Role } from "../types/user";

export const MOCK_ACCOUNTS: {email:string; password:string; role:Role; id:string}[]=[
    {id: "u1", email: "user@example.com", password: "password123", role: "USER"},
    { id: "u2", email: "admin@example.com", password: "admin123", role: "ADMIN" },
];