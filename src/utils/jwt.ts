import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  iat: number;
  username: string;
  fullName: string;
  role: string;
}

export function decodeToken(token: string) {
  try {
    const decode = jwtDecode<JwtPayload>(token);
    return decode;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function isTokenValid(token: string): boolean {
  const decoded = decodeToken(token);
  const now = Date.now() / 1000;

  if (!decoded) {
    return false;
  }

  return decoded?.exp > now;
}
