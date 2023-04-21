import { HttpException, HttpStatus } from '@nestjs/common';

type TExceptionResponseType =
  | 'email_already_registered'
  | 'token_sign_error'
  | 'error_while_creating_user'
  | 'access_forbidden'
  | 'failed_db_fetch'
  | 'failed_db_entity_creation'
  | 'failed_db_entity_modification'
  | 'internal_server_error'
  | 'invalid_credentials'
  | 'token_invalid';

interface IHttpExceptionResponse {
  type: TExceptionResponseType;
  message: string;
  solution: string;
}

export class ApiHttpException extends HttpException {
  constructor(data: IHttpExceptionResponse, statusCode: HttpStatus) {
    super({ statusCode, ...data }, statusCode);
  }
}

export class InvalidTokenHttpException extends ApiHttpException {
  constructor() {
    super(
      {
        type: 'token_invalid',
        message: 'Access forbidden.',
        solution: 'Login to access.',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class ForbiddenHttpException extends ApiHttpException {
  constructor() {
    super(
      {
        type: 'access_forbidden',
        message: 'Access forbidden.',
        solution: 'Login to access.',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class InvalidCredentialsHttpException extends ApiHttpException {
  constructor() {
    super(
      {
        type: 'invalid_credentials',
        message: 'You have provided invalid credentials.',
        solution: 'Try again.',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class FailedDbFetchHttpException extends ApiHttpException {
  constructor() {
    super(
      {
        type: 'failed_db_fetch',
        message: 'Failed fetching the data from the database.',
        solution: 'Try again later.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class FailedDbEntityCreationHttpException extends ApiHttpException {
  constructor() {
    super(
      {
        type: 'failed_db_entity_creation',
        message: 'Failed creating a database entity.',
        solution: 'Try again later.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class FailedDbEntityModificationHttpException extends ApiHttpException {
  constructor() {
    super(
      {
        type: 'failed_db_entity_modification',
        message: 'Failed modifying a database entity.',
        solution: 'Try again later.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
