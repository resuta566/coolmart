export class User {
  data: {
    id: number;
    type: string;
    name: string;
    email: string;
    access_token?: string;
  };
  user: string;

  name: string;
  email: string;
  phone: string;
  birthdate: string;
  role_name: string;
  accessToken?: string;
  token_type: string;

  // User Birthdate for post method
  month: string;
  date: string;
  year: string;

  gender: number;
  genderId: number;
}
