import { ApiResponseOptions, ApiResponse } from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { wrappedSchema } from '../utils/wrapped-schema';
import { WrappedName } from './wrapped-name.decorator';

export type ApiWrappedResponseOptions = ApiResponseOptions & {
  name: string;
  modelName: string;
  mediaType?: string;
};

export const ApiWrappedResponse = ({
  name,
  modelName,
  mediaType = 'application/json',
  ...options
}: ApiWrappedResponseOptions) =>
  applyDecorators(
    WrappedName(name),
    ApiResponse({
      ...options,
      content: {
        [mediaType]: wrappedSchema(name, modelName),
      },
    }),
  );

export const ApiWrappedOkResponse = (options: ApiWrappedResponseOptions) =>
  ApiWrappedResponse({ ...options, status: HttpStatus.OK });

export const ApiWrappedCreatedResponse = (options: ApiWrappedResponseOptions) =>
  ApiWrappedResponse({ ...options, status: HttpStatus.CREATED });
