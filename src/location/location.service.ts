import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    try {
      const location = new LocationEntity();
      Object.assign(location, dto);

      if (dto.parentId) {
        const parent = await this.locationRepo.findOne({
          where: { id: dto.parentId },
        });
        if (!parent)
          throw new NotFoundException('error.parent-location-not-found');
        location.parent = parent;
      }

      return await this.locationRepo.save(location);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findAll(): Promise<LocationEntity[]> {
    return this.locationRepo.findTrees();
  }

  async findOne(id: string): Promise<LocationEntity> {
    const node = await this.locationRepo.findOne({
      where: { id },
      relations: ['children', 'parent'],
    });
    if (!node) throw new NotFoundException('error.location-not-found');
    return node;
  }

  async update(id: string, dto: UpdateLocationDto) {
    try {
      const location = await this.locationRepo.findOneBy({ id });
      if (!location) throw new NotFoundException('error.location-not-found');

      if (dto.parentId) {
        if (dto.parentId === id)
          throw new Error('error.cannot-update-parent-to-itself');

        let currentParentId = dto.parentId;
        // Check if the proposed parent is not itself or its descendants
        while (currentParentId) {
          const parentNode = await this.locationRepo.findOne({
            where: { id: currentParentId },
            relations: ['parent'],
          });

          if (!parentNode) break; // If the parent does not exist, stop the loop (allow orphan nodes)
          if (parentNode.id === id) {
            throw new Error('error.cannot-assign-descendant-as-parent');
          }

          currentParentId = parentNode.parent?.id;
        }
        // Check if the new parent exists
        const newParent = await this.locationRepo.findOneBy({
          id: dto.parentId,
        });
        if (!newParent) throw new Error('error.parent-not-found');

        location.parent = newParent;
      }

      Object.assign(location, dto);
      return this.locationRepo.save(location);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    const node = await this.locationRepo.findOne({ where: { id } });
    if (!node) throw new NotFoundException('error.location-not-found');
    await this.locationRepo.remove(node);
  }
}
