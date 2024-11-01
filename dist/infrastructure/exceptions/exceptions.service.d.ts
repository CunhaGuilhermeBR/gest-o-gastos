import { IException, IFormatExceptionMessage } from '../../domain/exceptions/exceptions.interface';
export declare class ExceptionsService implements IException {
    BadRequestException(data: IFormatExceptionMessage): void;
    InternalServerErrorException(data?: IFormatExceptionMessage): void;
    ForbiddenException(data?: IFormatExceptionMessage): void;
    UnauthorizedException(data?: IFormatExceptionMessage): void;
    NotFoundException(data?: IFormatExceptionMessage): void;
}
