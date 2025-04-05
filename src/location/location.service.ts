import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from './location.entity';
import { TreeRepository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepo: TreeRepository<LocationEntity>,
  ) {}

  async create(dto: CreateLocationDto): Promise<LocationEntity> {
    const location = new LocationEntity();
    Object.assign(location, dto);

    if (dto.parentId) {
      const parent = await this.locationRepo.findOne({
        where: { id: dto.parentId },
      });
      if (!parent) throw new NotFoundException('Parent location not found');
      location.parent = parent;
    }

    return await this.locationRepo.save(location);
  }

  async findAll(): Promise<LocationEntity[]> {
    return this.locationRepo.findTrees();
  }

  async findOne(id: string): Promise<LocationEntity> {
    const node = await this.locationRepo.findOne({
      where: { id },
      relations: ['children', 'parent'],
    });
    if (!node) throw new NotFoundException('Location not found');
    return node;
  }

  async update(id: string, dto: UpdateLocationDto) {
    const location = await this.locationRepo.findOneBy({ id });
    if (!location) throw new NotFoundException('Location not found');

    Object.assign(location, dto);
    return this.locationRepo.save(location);
  }

  async remove(id: string): Promise<void> {
    const node = await this.locationRepo.findOne({ where: { id } });
    if (!node) throw new NotFoundException('Location not found');
    await this.locationRepo.remove(node);
  }
}
