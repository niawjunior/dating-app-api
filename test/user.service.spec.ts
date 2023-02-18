import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../src/user/user.service';
import { User } from '../src/user/user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user = new User();
      user.email = 'test@example.com';
      user.password = 'password';

      const savedUser = new User();
      savedUser.id = 1;
      savedUser.email = 'test@example.com';
      savedUser.password = 'password';

      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

      const createdUser = await userService.createUser(
        user.email,
        user.password,
      );

      expect(createdUser).toEqual(savedUser);
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });
  });
});
