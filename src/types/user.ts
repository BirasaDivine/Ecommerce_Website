export type Role= "PUBLIC" | "USER" | "ADMIN";
export interface User{
    id: string;
    email: string;
    role: Role;
}