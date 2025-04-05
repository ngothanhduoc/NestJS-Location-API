import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class SignupDto {
  @ApiProperty({
    example: 'username',
    type: String,
    description: 'Username of the user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'password',
    type: String,
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: UserRole.ADMIN,
    enum: UserRole,
    description: 'Role of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}

export class SignupResponseDto {
  @ApiProperty({
    example: '1159b7af-d848-4533-b17f-80b678c8ffb3',
    description: 'Unique identifier of the user',
  })
  id: string;

  @ApiProperty({
    example: 'username4',
    description: 'Username of the user',
  })
  username: string;

  @ApiProperty({
    example: UserRole.USER,
    enum: UserRole,
    description: 'Role of the user',
  })
  role: UserRole;

  @ApiProperty({
    example: 'JWT token',
    description: 'Access token for authentication',
  })
  access_token: string;
}
