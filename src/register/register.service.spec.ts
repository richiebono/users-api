import { TestingModule } from '@nestjs/testing';
import { closeInMongodConnection } from '../utils/test/mongo/mongoose.test.module';
import { RegisterService } from './register.service';
import { registerTestModule } from './register.test.module';

describe('RegisterService', () => {
  let service: RegisterService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await registerTestModule.compile();
    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();    
    await module.close();
  });

});
