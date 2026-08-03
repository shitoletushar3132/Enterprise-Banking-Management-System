import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;
    const startedAt = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const durationMs = Date.now() - startedAt;
          this.logger.log(`${method} ${url} ${durationMs}ms`);
        },
        error: (error: unknown) => {
          const durationMs = Date.now() - startedAt;
          const message = error instanceof Error ? error.message : 'Unknown error';
          this.logger.warn(`${method} ${url} ${durationMs}ms — ${message}`);
        },
      }),
    );
  }
}
