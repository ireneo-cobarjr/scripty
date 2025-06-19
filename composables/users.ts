export interface User {
  username: string;
  id: string | number;
}

export const useUser = () => useState<User | null>("user", () => null);
