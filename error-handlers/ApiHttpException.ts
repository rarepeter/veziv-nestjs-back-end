import { HttpException, HttpStatus } from '@nestjs/common';

type TExceptionResponseType =
  | 'email_already_registered'
  | 'token_sign_error'
  | 'error_while_creating_user'
  | 'access_forbidden';

interface IHttpExceptionResponse {
  type: TExceptionResponseType;
  message: string;
  solution: string;
}

export class ApiHttpException extends HttpException {
  constructor(
    private readonly data: IHttpExceptionResponse,
    status: HttpStatus,
  ) {
    super(data, status);
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
