import { RoleEnum } from '../interfaces/RoleEnum';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: RoleEnum;
}
