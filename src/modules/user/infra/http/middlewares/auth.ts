import { container } from 'tsyringe';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import authConfig from '@config/auth';
import { LocaleError } from '@shared/errors/LocaleError';
import AuthenticateUserService from '@modules/user/services/user/AuthenticateUserService';
import { RoleEnum } from '@modules/user/interfaces/RoleEnum';

interface TokenPayload {
  int: number;
  exp: number;
  sub: string;
}

const authenticateUser = async (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new LocaleError('missingToken');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub: id } = decoded as TokenPayload;
    const authService = container.resolve(AuthenticateUserService);
    req.user = await authService.execute(id);
  } catch {
    throw new LocaleError('invalidToken');
  }
};

export default async function auth(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  await authenticateUser(req);

  next();
}

auth.admin = async (req: Request, _: Response, next: NextFunction) => {
  await authenticateUser(req);

  if (req.user.role !== RoleEnum.admin)
    throw new LocaleError('userNotAuthorized');

  next();
};

auth.user = async (req: Request, _: Response, next: NextFunction) => {
  await authenticateUser(req);

  if (req.user.role !== RoleEnum.user)
    throw new LocaleError('userNotAuthorized');

  next();
};
