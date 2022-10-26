import { TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { loginTestModule } from './login.test.module'
import { closeInMongodConnection } from '../utils/test/mongo/mongoose.test.module';

describe('LoginService', () => {
  let service: LoginService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await loginTestModule.compile();
    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();    
    await module.close();
  });
  
});