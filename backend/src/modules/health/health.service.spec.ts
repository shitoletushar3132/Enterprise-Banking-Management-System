import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getConnectionToken } from '@nestjs/mongoose';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('EBMS'),
          },
        },
        {
          provide: getConnectionToken(),
          useValue: {
            readyState: 1, // ConnectionStates.connected
          },
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('returns ok when mongodb is connected', () => {
    const result = service.getHealth();

    expect(result.status).toBe('ok');
    expect(result.checks.mongodb).toBe('up');
    expect(result.service).toBe('EBMS');
  });

  it('returns degraded when mongodb is down', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('EBMS'),
          },
        },
        {
          provide: getConnectionToken(),
          useValue: {
            readyState: 0,
          },
        },
      ],
    }).compile();

    const degradedService = module.get<HealthService>(HealthService);
    const result = degradedService.getHealth();

    expect(result.status).toBe('degraded');
    expect(result.checks.mongodb).toBe('down');
  });
});
