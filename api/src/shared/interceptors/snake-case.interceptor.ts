import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { snakeCase, mapKeys } from "lodash";
import { isArray } from "util";

@Injectable()
export class SnakeCaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(value => {
        const snakeCaseMapper = val => mapKeys(val, (v, k) => snakeCase(k));
        if (isArray(value)) {
          return value.map(v => snakeCaseMapper(v));
        }
        return snakeCaseMapper(value);
      })
    );
  }
}
