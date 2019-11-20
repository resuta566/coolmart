export class User {
  data: {
    id: number;
    type: string;
    name: string;
    email: string;
    access_token?: string;
  }
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
  }
  name: string;
  role_name: string;
  accessToken?: string;
  token_type: string;
}
