export interface AuthResponse {

  success: boolean;

  message: string;

  user?: {
    id: number;
    username: string;
    email: string;
  };
}