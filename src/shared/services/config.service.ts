import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  validateOrReject,
  validateSync,
  IsObject,
  IsString,
} from 'class-validator';
import { parse } from 'dotenv';
import { promises as fs, readFileSync } from 'fs';
import { SnakeNamingStrategy } from '../../common/snake-naming.strategy';
import parseVariables = require('dotenv-parse-variables');

export class ConfigService {
  private env: Record<string, any>;

  private constructor(source: string | Buffer = '') {
    const env = parse(source);
    Object.assign(env, process.env);
    this.env = parseVariables(env);
  }

  @IsString()
  get nodeEnv() {
    return this.env.NODE_ENV || 'development';
  }

  get jwtSecret() {
    return this.env.JWT_SECRET;
  }

  get jwtExpiration() {
    return this.env.JWT_EXPIRATION;
  }

  @IsObject()
  get typeOrmOptions(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../../**/*.entity{.ts,.js}'];
    const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'postgres',
      host: this.env.POSTGRES_HOST,
      port: this.env.POSTGRES_PORT,
      username: this.env.POSTGRES_USERNAME,
      password: this.env.POSTGRES_PASSWORD,
      database: this.env.POSTGRES_DATABASE,
      migrationsRun: true,
      logging: this.nodeEnv === 'development',
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  static async init() {
    let source: Buffer | undefined;
    try {
      source = await fs.readFile(envPath());
    } catch {
      Logger.warn(`Unable to read file ${envPath()}`);
    }
    const configService = new ConfigService(source);
    await validateOrReject(configService);

    return configService;
  }

  static initSync() {
    let source: Buffer | undefined;
    try {
      source = readFileSync(envPath());
    } catch {
      Logger.warn(`Unable to read file ${envPath()}`);
    }
    const configService = new ConfigService(source);
    const errors = validateSync(configService);
    if (errors.length) {
      throw errors;
    }

    return configService;
  }
}

function envPath() {
  return `.env.${process.env.NODE_ENV || 'development'}`;
}
