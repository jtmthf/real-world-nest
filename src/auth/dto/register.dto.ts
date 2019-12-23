import { IsEmail, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @Length(1, 16)
  username!: string;

  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;
}
