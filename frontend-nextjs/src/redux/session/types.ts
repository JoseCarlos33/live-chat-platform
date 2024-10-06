export interface User {
  id: string;
  name: string;
  accessToken: string;
}

export interface Permission {
  id: string;
  name: string;
}
export interface UserRole {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface SessionState {
  loggedUser: User | null;
  loading: boolean;
  dashboardHashParams: string;
  userRole: UserRole | null;
}
