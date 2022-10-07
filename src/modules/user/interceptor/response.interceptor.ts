import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) =>
        data.map((elem) => ({
          id: elem.id,
          name: elem.name,
          address: {
            street: elem.street,
            city: elem.city,
            country: elem.country,
          },
        })),
      ),
    );
  }
}
