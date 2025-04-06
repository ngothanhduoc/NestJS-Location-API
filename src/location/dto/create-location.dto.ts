import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    example: 'Location Name',
    type: String,
    description: 'Name of the location',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'A-01',
    type: String,
    description: 'Location Number',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 100000,
    type: Number,
    description: 'Code of the location',
  })
  @IsNumber()
  @Min(0)
  area: number;

  @ApiPropertyOptional({
    example: 'A-01',
    type: String,
    description: 'ParentId of the location',
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
