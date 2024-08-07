import { UserRepository } from '../../domain/repositories/user.inteface.repository';
import { ILogger } from '../../domain/logger/logger.interface';
import { ExpenseM } from '../../domain/model/expense';
import { ExpenseRepository } from '../../domain/repositories/expense.interface.repository';
import { ExpenseDto } from '../../infrastructure/controllers/expense/expense.dto';
import { ExceptionsService } from '../../infrastructure/exceptions/exceptions.service';

export class AddExpenseUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly expenseRepository: ExpenseRepository,
        private readonly userRepository: UserRepository,
        private readonly exceptionsService: ExceptionsService
    ) { }

    async execute(data: ExpenseDto): Promise<void> {
        const existUser = await this.userRepository.findById(data.user_id);
        if (!existUser) {
            return this.exceptionsService.NotFoundException();
        };
        if (data.value === 0) {
            return this.exceptionsService.BadRequestException({
                message: 'O valor não pode ser 0'
            })
        }
        const expense = new ExpenseM();
        expense.user_id = data.user_id;
        expense.name = data.name;
        expense.value = Number(data.value);
        expense.type = data.type;
        expense.transaction_date = data.transaction_date;

        await this.expenseRepository.insert(expense);
        this.logger.log('AddExpenseUseCases execute', 'New expense has been inserted');
    }
}
