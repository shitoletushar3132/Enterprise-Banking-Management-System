import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            getHealth: jest.fn().mockReturnValue({
              status: 'ok',
              service: 'EBMS',
              version: '0.1.0',
              uptimeSeconds: 1,
              checks: { mongodb: 'up' },
              timestamp: new Date().toISOString(),
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('delegates health check to service', () => {
    const result = controller.getHealth();
    expect(result.status).toBe('ok');
  });
});
