import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';

export interface HealthStatus {
  status: 'ok' | 'degraded';
  service: string;
  version: string;
  uptimeSeconds: number;
  checks: {
    mongodb: 'up' | 'down';
  };
  timestamp: string;
}

@Injectable()
export class HealthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  getHealth(): HealthStatus {
    const mongoState = this.connection.readyState === ConnectionStates.connected ? 'up' : 'down';

    return {
      status: mongoState === 'up' ? 'ok' : 'degraded',
      service: this.configService.get<string>('app.name', 'EBMS'),
      version: '0.1.0',
      uptimeSeconds: Math.floor(process.uptime()),
      checks: {
        mongodb: mongoState,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
