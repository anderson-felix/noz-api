import { enumToArray } from '@shared/utils';

export enum RoleEnum {
  user = 'user',
  admin = 'admin',
}

export const roleEnumArray = enumToArray(RoleEnum);
