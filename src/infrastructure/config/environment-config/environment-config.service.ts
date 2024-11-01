import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/database.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
    constructor(private configService: ConfigService) { }

    
    getDatabaseSync(): boolean {
        return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
    }

    getDatabaseUrl(): string {
        return this.configService.get<string>('DATABASE_URL');
    }
}