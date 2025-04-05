import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from '../../src/location/location.controller';
import { LocationService } from '../../src/location/location.service';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call LocationService.create with correct parameters', async () => {
      const dto = { name: 'Building A', code: 'A', area: 1000 };
      const result = {
        id: '1',
        ...dto,
        children: [],
        parent: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should throw an error if parameters are invalid', async () => {
      const dto = { name: '', code: '', area: -100 };

      jest.spyOn(service, 'create').mockImplementation(() => {
        return Promise.reject(new Error('Invalid parameters'));
      });

      await expect(controller.create(dto)).rejects.toThrow(
        'Invalid parameters',
      );
    });
  });

  describe('findAll', () => {
    it('should call LocationService.findAll', async () => {
      const result = [
        {
          id: '1',
          name: 'Building A',
          code: 'A',
          area: 1000,
          children: [],
          parent: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call LocationService.findOne with correct parameters', async () => {
      const id = '1';
      const result = {
        id,
        name: 'Building A',
        code: 'A',
        area: 1000,
        children: [],
        parent: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an error if ID is invalid', async () => {
      const id = '';

      jest.spyOn(service, 'findOne').mockImplementation(() => {
        return Promise.reject(new Error('error.invalid-id'));
      });

      await expect(controller.findOne(id)).rejects.toThrow('error.invalid-id');
    });
  });

  describe('update', () => {
    it('should call LocationService.update with correct parameters', async () => {
      const id = '1';
      const dto = { name: 'Building A Updated', code: 'A', area: 1200 };
      const result = {
        id,
        ...dto,
        children: [],
        parent: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });

    it('should throw an error if parameters are invalid', async () => {
      const id = '1';
      const dto = { name: '', code: '', area: -100 };

      jest.spyOn(service, 'update').mockImplementation(() => {
        return Promise.reject(new Error('Invalid parameters'));
      });

      await expect(controller.update(id, dto)).rejects.toThrow(
        'Invalid parameters',
      );
    });
  });

  describe('remove', () => {
    it('should call LocationService.remove with correct parameters', async () => {
      const id = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove(id)).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an error if ID is invalid', async () => {
      const id = '';

      jest.spyOn(service, 'remove').mockImplementation(() => {
        return Promise.reject(new Error('error.invalid-id'));
      });

      await expect(controller.remove(id)).rejects.toThrow('error.invalid-id');
    });
  });
});
