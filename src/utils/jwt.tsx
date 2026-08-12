import type { Role } from "../types/user";

interface JwtPayload {
  sub: string;     
  email: string;
  role: Role;
  exp: number;       
}

function base64UrlEncode(obj: object): string {
  const json = JSON.stringify(obj);
  return btoa(json).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  return atob(padded);
}

export function createMockJwt(payload: JwtPayload): string {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const fakeSignature = "mocksignature"; 
  return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payloadPart] = token.split(".");
    return JSON.parse(base64UrlDecode(payloadPart)) as JwtPayload;
  } catch {
    return null;
  }
}