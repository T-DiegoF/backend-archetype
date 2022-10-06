import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from 'src/modules/auth/entities/address.entity';

export interface Response<T> {
  id: number;
  name: string;
  /*  address: {
         city:string,
         country:string
     } */
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        id: data[0].id,
        name: data[0].name,
      })),
    );
  }
}
