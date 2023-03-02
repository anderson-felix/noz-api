import User from '../infra/typeorm/entities/User';
import { RoleEnum } from '../interfaces/RoleEnum';

export interface IFormattedUser {
  id: string;
  name: string;
  role: RoleEnum;
  email: string;
}

type FuncType = (user: User) => IFormattedUser;

export const formatUserEntity: FuncType = user => ({
  id: user.id,
  name: user.name,
  role: user.role,
  email: user.email,
});
