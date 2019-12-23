import { SetMetadata } from '@nestjs/common';
import { WRAPPED_NAME } from '../constants';

export const WrappedName = (name: string) => SetMetadata(WRAPPED_NAME, name);
