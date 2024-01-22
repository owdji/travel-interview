import { User } from "./user.model";

export type AuthResponse = {
  token: string;
  user: User;
};