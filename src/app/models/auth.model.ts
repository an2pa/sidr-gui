export interface AuthenticationRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role?: string;
}

export interface AuthenticationResponse {
  token: string;
}
