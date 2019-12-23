require('ts-node/register');
const { ConfigService } = require('./src/shared/services/config.service.ts');

const configService = ConfigService.initSync();

module.exports = {
  ...configService.typeOrmOptions,
  cli: {
    migrationsDir: 'src/migrations',
  },
};
