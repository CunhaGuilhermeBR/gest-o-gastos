import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RouterLoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: LoggerService) { }
    use(req: Request, res: Response, next: NextFunction) {
       this.logger.log('Router',`${req.method} ${req.originalUrl}`);
       next();
    }
}
