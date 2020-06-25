import axios from 'axios';

import { LoginReqType, LoginResType } from '../types';

const USER_API_URL = 'https://api.marktube.tv/v1/me';

export default class UserService {
  public static async login({
    email,
    password,
  }: LoginReqType): Promise<string> {
    const response = await axios.post<LoginResType>(USER_API_URL, {
      email,
      password,
    });
    return response.data.token;
  }

  public static async logout(token: string): Promise<void> {
    await axios.delete(USER_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
