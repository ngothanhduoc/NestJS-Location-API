import { ApiProperty } from '@nestjs/swagger';

export class ResponseLocationWithChildrenDto {
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

  @ApiProperty({
    type: [ResponseLocationWithChildrenDto],
    description: 'Nested child locations',
    example: [
      {
        id: '758f602c-5a6b-440b-87de-45d771f33bdb',
        name: 'Car Park',
        code: 'A-CarPark',
        area: 80620,
        createdAt: '2025-04-04T06:55:27.595Z',
        updatedAt: '2025-04-04T06:55:27.595Z',
        children: [],
      },
      {
        id: '8d22b9c6-959a-4426-836b-6a59843c7d97',
        name: 'Level 01',
        code: 'A-01',
        area: 100920,
        createdAt: '2025-04-04T06:56:22.556Z',
        updatedAt: '2025-04-04T07:22:57.223Z',
        children: [],
      },
    ],
  })
  children: ResponseLocationWithChildrenDto[];

  @ApiProperty({
    type: [ResponseLocationWithChildrenDto],
    description: 'Nested child locations',
    example: [
      {
        id: '758f602c-5a6b-440b-87de-45d771f33bdb',
        name: 'Car Park',
        code: 'A-CarPark',
        area: 80620,
        createdAt: '2025-04-04T06:55:27.595Z',
        updatedAt: '2025-04-04T06:55:27.595Z',
        children: [],
      },
      {
        id: '8d22b9c6-959a-4426-836b-6a59843c7d97',
        name: 'Level 01',
        code: 'A-01',
        area: 100920,
        createdAt: '2025-04-04T06:56:22.556Z',
        updatedAt: '2025-04-04T07:22:57.223Z',
        children: [],
      },
    ],
  })
  parent: ResponseLocationWithChildrenDto[];
}
