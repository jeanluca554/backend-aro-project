export interface UserToken {
  access_token: string;
  user: {
    sub: string;
    email: string;
    name: string;
  };
}
