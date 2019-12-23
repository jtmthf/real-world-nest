import { getSchemaPath } from '@nestjs/swagger';

export function wrappedSchema(name: string, modelName: string) {
  return {
    schema: {
      type: 'object',
      properties: {
        [name]: { $ref: getSchemaPath(modelName) },
      },
      required: [name],
    },
  };
}
