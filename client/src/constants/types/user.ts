export type UserRole = 'admin' | 'candidate' | 'company';

export type AuthState = {
  user: any | null;
  accessToken: string | null;
  isAuthenticated: boolean;
};
export type StateType = {
  auth: AuthState;
};
