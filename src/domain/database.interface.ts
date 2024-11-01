export interface DatabaseConfig {
  getDatabaseSync(): boolean;
  getDatabaseUrl(): string;
}