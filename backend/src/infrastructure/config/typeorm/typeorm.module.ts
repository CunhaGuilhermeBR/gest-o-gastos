import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): TypeOrmModuleOptions => ({
  type: 'mongodb',
  url: config.getDatabaseUrl(),
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: ['query', 'error'],
  logger: 'advanced-console',
  // ssl: {
  //   rejectUnauthorized: false,
  // },
} as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule { }
