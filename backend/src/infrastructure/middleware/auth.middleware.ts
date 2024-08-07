import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ExceptionsService } from '../exceptions/exceptions.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly exceptionService: ExceptionsService) { }
    use(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization === process.env.AUTH_TOKEN) {
            next();
        } else {
            return this.exceptionService.UnauthorizedException();
        };
    };
}
