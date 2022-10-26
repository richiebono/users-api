import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { User, UserSchema } from '../users/schemas/user.model';
import { UserService } from '../users/user.service';
import { rootMongooseTestModule } from '../utils/test/mongo/mongoose.test.module';

export const registerTestModule = Test.createTestingModule({
  imports: [
            rootMongooseTestModule(), 
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
          ],
  controllers: [RegisterController],
  providers: [RegisterService, UserService],
});
