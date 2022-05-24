import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MaxLength(128)
  password: string;

  @ApiProperty()
  @MaxLength(128)
  firstname: string;

  @ApiProperty()
  @MaxLength(128)
  lastname: string;
}
