import { ApiBodyOptions, ApiBody } from '@nestjs/swagger';
import { wrappedSchema } from '../utils/wrapped-schema';

export type ApiWrappedBodyOptions = ApiBodyOptions & {
  name: string;
  modelName: string;
};

export const ApiWrappedBody = ({
  name,
  modelName,
  ...options
}: ApiWrappedBodyOptions) =>
  ApiBody({ ...options, ...wrappedSchema(name, modelName) });
