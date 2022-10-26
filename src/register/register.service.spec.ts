import { TestingModule } from '@nestjs/testing';
import { closeInMongodConnection } from '../utils/test/mongo/mongoose.test.module';
import { RegisterService } from './register.service';
import { registerTestModule } from './register.test.module';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await registerTestModule.compile();
    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
