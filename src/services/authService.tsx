import { MOCK_ACCOUNTS } from "../mocks/users";
import type { User } from "../types/user";
import { createMockJwt } from "../utils/jwt";


export async function login (email:string , password:string ) : Promise<{token:string ; user :User}>{
    const account=MOCK_ACCOUNTS.find((a) => a.email === email && a.password === password);
    if (!account){
        throw new Error("Invalid email or password")
    }
    const token = createMockJwt({
        sub: account.id,
        email : account.email,
        role : account.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
    });
    return {token , user : {id: account.id , email:account.email,role:account.role}};
}