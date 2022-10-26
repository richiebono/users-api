import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.model';
import { UserService } from '../users/user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class RegisterService {
  
  @Inject(UserService)
  private readonly userService: UserService;

  public async register(registerUserDto: RegisterUserDto): Promise<User> {
    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);
    return this.userService.create(registerUserDto);
  }

}
