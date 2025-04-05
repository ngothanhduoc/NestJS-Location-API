import { ApiProperty } from '@nestjs/swagger';

export class ResponseLocationDto {
  @ApiProperty({
    example: '7c46a0e3-c321-4a0c-bcbb-bcb94c0e3d46',
    description: 'Unique identifier of the location',
  })
  id: string;

  @ApiProperty({
    example: 'Building B',
    description: 'Name of the location',
  })
  name: string;

  @ApiProperty({
    example: 'B',
    description: 'Code of the location',
  })
  code: string;

  @ApiProperty({
    example: 1000000,
    description: 'Area of the location',
  })
  area: number;

  @ApiProperty({
    example: '2025-04-04T07:30:58.451Z',
    description: 'Creation timestamp of the location',
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-04-04T07:30:58.451Z',
    description: 'Last update timestamp of the location',
  })
  updatedAt: string;
}
