import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ResponseLocationDto } from './dto/response-location.dto';
import { ResponseLocationWithChildrenDto } from './dto/response-location-with-children.dto';

@Controller('locations')
@ApiTags('locations')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class LocationController {
  constructor(private readonly service: LocationService) {}

  @Roles('admin')
  @Post()
  @ApiResponse({
    type: ResponseLocationDto,
  })
  create(@Body() dto: CreateLocationDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiResponse({
    type: ResponseLocationWithChildrenDto,
    isArray: true,
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseLocationWithChildrenDto,
    isArray: true,
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Roles('admin')
  @Put(':id')
  @ApiOperation({ summary: 'Update location ID' })
  @ApiResponse({ status: 200, description: 'Update location success' })
  @ApiResponse({
    type: ResponseLocationDto,
  })
  update(@Param('id') id: string, @Body() dto: UpdateLocationDto) {
    return this.service.update(id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
