export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
  phone?: string;
  address?: string;
  role?: "TENANT" | "LANDLORD";
}

export interface IloginUser {
  email: string;
  password: string;
}
