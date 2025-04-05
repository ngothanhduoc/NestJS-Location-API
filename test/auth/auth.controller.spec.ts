import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { UserRole } from '../../src/auth/dto/signup.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should call AuthService.signup with correct parameters', async () => {
      const dto = {
        username: 'testUser',
        password: 'password',
        role: UserRole.USER,
      };
      const result = {
        id: '1',
        username: 'testUser',
        password: 'password',
        role: UserRole.USER,
        access_token: 'token',
      };
      jest.spyOn(service, 'signup').mockResolvedValue(result);

      expect(await controller.signup(dto)).toEqual(result);
      expect(service.signup).toHaveBeenCalledWith(
        dto.username,
        dto.password,
        dto.role,
      );
    });

    it('should throw an error if parameters are invalid', async () => {
      const dto = {
        username: '',
        password: 'short',
        role: UserRole.USER as UserRole, // Ensure role matches the UserRole enum
      };

      jest
        .spyOn(service, 'signup')
        .mockRejectedValue(new Error('Invalid parameters'));

      await expect(controller.signup(dto)).rejects.toThrow(
        'Invalid parameters',
      );
    });
  });

  describe('login', () => {
    it('should call AuthService.login with correct parameters', async () => {
      const dto = { username: 'testUser', password: 'password' };
      const result = { access_token: 'token' };
      jest.spyOn(service, 'login').mockResolvedValue(result);

      expect(await controller.login(dto)).toEqual(result);
      expect(service.login).toHaveBeenCalledWith(dto.username, dto.password);
    });

    it('should throw an error if parameters are invalid', async () => {
      const dto = { username: '', password: '' };

      jest
        .spyOn(service, 'login')
        .mockRejectedValue(new Error('Invalid parameters'));

      await expect(controller.login(dto)).rejects.toThrow('Invalid parameters');
    });
  });
});
