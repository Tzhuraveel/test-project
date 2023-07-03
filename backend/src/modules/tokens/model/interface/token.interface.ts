export interface ITokenPayload {
  userId: number;
  name: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
