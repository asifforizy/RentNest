export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
  phone?: string;
  address?: string;
  role?: "TENANT" | "LANDLORD" | "ADMIN";
}

export interface IloginUser {
  email: string;
  password: string;
}

export interface IUpdate {
  name: string;
  password: string;
  profilePhoto?: string;
  phone?: string;
  address?: string;
  role?: "TENANT" | "LANDLORD" | "ADMIN";
}
