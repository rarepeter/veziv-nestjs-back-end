import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthDto {
  @MaxLength(320)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(16)
  @IsString()
  @IsNotEmpty()
  password: string;
}
