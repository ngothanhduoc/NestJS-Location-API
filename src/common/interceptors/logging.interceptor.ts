import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    console.log(`Incoming request: ${request.method} ${request.url}`);
    return next
      .handle()
      .pipe(tap(() => console.log(`Handled in ${Date.now() - now}ms`)));
  }
}
