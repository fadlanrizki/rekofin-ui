import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  iat: number;
  username: string;
  fullName: string;
  role: string;
}

export function decodeToken(token: string) {
  const decode = jwtDecode<JwtPayload>(token)
  
  return decode;
}

export function isTokenValid(token: string): boolean {
  const decoded = decodeToken(token);
  const now = Date.now() / 1000;
  return decoded.exp > now;
}
