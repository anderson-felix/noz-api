import movieConfig from '@config/movie';

export type LocaleErrorType =
  | 'invalidToken'
  | 'missingToken'
  | 'tokenExpired'
  | 'invalidLogin'
  | 'userNotAuthorized'
  | 'operationNotPermitted'
  | 'userNotFound'
  | 'emailAlreadyExists'
  | 'contentTypeRequired'
  | 'invalidFileType'
  | 'oldPasswordIsRequired'
  | 'passwordsNotMatch'
  | 'movieNotFound'
  | 'invalidRating'
  | 'movieAlreadyExists';

export const localeErrorLanguage = <const>['pt', 'en'];

export type LocaleErrorLanguage = typeof localeErrorLanguage[number];

export const defaultLocaleErrorLanguage: LocaleErrorLanguage = 'pt';

export type LocaleErrorMessage = Record<LocaleErrorLanguage, string>;

export type LocaleErrorObject = {
  status: number;
  message: LocaleErrorMessage;
};

export const localeErrors: Record<LocaleErrorType, LocaleErrorObject> = {
  invalidToken: {
    status: 401,
    message: {
      pt: 'Token JWT inválido',
      en: 'Invalid JTW token',
    },
  },
  missingToken: {
    status: 401,
    message: {
      pt: 'Token JWT faltando',
      en: 'Missing JWT token',
    },
  },
  tokenExpired: {
    status: 403,
    message: {
      pt: 'Token expirado',
      en: 'Token expired',
    },
  },
  invalidLogin: {
    status: 401,
    message: {
      pt: 'Nome de usuário e/ou senha incorretos',
      en: 'Incorrect username/password combination',
    },
  },
  userNotAuthorized: {
    status: 401,
    message: {
      pt: 'Usuário não autorizado',
      en: 'User not authorized',
    },
  },
  operationNotPermitted: {
    status: 403,
    message: {
      pt: 'Operação não permitida',
      en: 'Operation not permitted',
    },
  },
  userNotFound: {
    status: 404,
    message: {
      pt: 'Usuário não encontrado',
      en: 'User not found',
    },
  },
  emailAlreadyExists: {
    status: 403,
    message: {
      pt: 'Esse e-mail já está cadastrado',
      en: 'This email already register',
    },
  },
  contentTypeRequired: {
    status: 400,
    message: {
      pt: 'O tipo do arquivo é obrigatório',
      en: 'The file content type is required',
    },
  },
  invalidFileType: {
    status: 400,
    message: {
      pt: 'Formato de arquivo inválido',
      en: 'Invalid file format',
    },
  },
  oldPasswordIsRequired: {
    status: 403,
    message: {
      pt: 'A senha antiga é obrigatória para redefinição de senha',
      en: 'Old password is required for password reset',
    },
  },
  passwordsNotMatch: {
    status: 403,
    message: {
      pt: 'As senhas não correspodem',
      en: 'Passwords not match',
    },
  },
  movieNotFound: {
    status: 403,
    message: {
      pt: 'Filme não encontrado',
      en: 'Movie not found',
    },
  },
  invalidRating: {
    status: 401,
    message: {
      pt: `A nota é invalida, escolha um número entre ${movieConfig.rating.min} e ${movieConfig.rating.max}`,
      en: `The rating is invalid, choose a number between ${movieConfig.rating.min} and ${movieConfig.rating.max}`,
    },
  },
  movieAlreadyExists: {
    status: 400,
    message: {
      pt: 'Filme já está cadastrado',
      en: 'Movie already regitered',
    },
  },
};
