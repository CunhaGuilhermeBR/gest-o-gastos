import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/database.interface';
export declare class EnvironmentConfigService implements DatabaseConfig {
    private configService;
    constructor(configService: ConfigService);
    getDatabaseSync(): boolean;
    getDatabaseUrl(): string;
}
