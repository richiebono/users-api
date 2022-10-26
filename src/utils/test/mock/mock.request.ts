import { Request } from 'express';
import { createMock } from '@golevelup/ts-jest';
import { UserDto } from '../../../users/dto/user.dto';

export const mockRequestObject = () => {
    return createMock<Request>({
      user: {} as UserDto
    });
  };