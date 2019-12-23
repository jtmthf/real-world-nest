import { SetMetadata } from '@nestjs/common';
import { AUTHENTICATION_MODE } from '../constants';
import { AuthMode } from '../enums';

export const Auth = (mode = AuthMode.Required) =>
  SetMetadata(AUTHENTICATION_MODE, mode);
