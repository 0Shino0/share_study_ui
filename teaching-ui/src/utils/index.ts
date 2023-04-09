import { getToken } from "@/utils/auth";
import { UserInfoMember } from "@/store/user";

/**
 * @param {null} 
 * @return {*}
 */
export function getTokenData(): UserInfoMember | null {
  let token: string | null = getToken();

  if (token === null) return token;
  let data = JSON.parse(token);
  return data;
}