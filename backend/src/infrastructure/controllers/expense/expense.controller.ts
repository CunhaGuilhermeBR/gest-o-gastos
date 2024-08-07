import { Body, Controller, Delete, Get, HttpCode, Inject, NotFoundException, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ExpensePresenter } from './expense.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { ExpenseDto } from './expense.dto';
import { GetExpenseUseCases } from '../../../usecases/expense/getExpense.usecases';
import { GetExpensesUseCases } from '../../../usecases/expense/getExpenses.usecases';
import { UpdateExpenseUseCases } from '../../../usecases/expense/updateExpense.usecases';
import { DeleteExpenseUseCases } from '../../../usecases/expense/deleteExpense.usecases';
import { AddExpenseUseCases } from '../../../usecases/expense/addExpense.usecases';
import { ObjectId } from 'typeorm';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { AggregateExpenseUseCases } from '../../../usecases/expense/aggregate.usecases';

@Controller('expense')
@ApiTags('expense')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ExpensePresenter)
export class ExpenseController {
  constructor(
    private readonly exceptionsService: ExceptionsService,
    @Inject(UsecasesProxyModule.GET_EXPENSE_USECASES_PROXY)
    private readonly getExpenseUsecaseProxy: UseCaseProxy<GetExpenseUseCases>,
    @Inject(UsecasesProxyModule.GET_EXPENSES_USECASES_PROXY)
    private readonly getAllExpenseUsecaseProxy: UseCaseProxy<GetExpensesUseCases>,
    @Inject(UsecasesProxyModule.PUT_EXPENSE_USECASES_PROXY)
    private readonly updateExpenseUsecaseProxy: UseCaseProxy<UpdateExpenseUseCases>,
    @Inject(UsecasesProxyModule.DELETE_EXPENSE_USECASES_PROXY)
    private readonly deleteExpenseUsecaseProxy: UseCaseProxy<DeleteExpenseUseCases>,
    @Inject(UsecasesProxyModule.POST_EXPENSE_USECASES_PROXY)
    private readonly addExpenseUsecaseProxy: UseCaseProxy<AddExpenseUseCases>,
    @Inject(UsecasesProxyModule.GET_AGGREGATE_EXPENSE_USECASES_PROXY)
    private readonly aggregateMonthExpenseUsecaseProxy: UseCaseProxy<AggregateExpenseUseCases>,
  ) {}

  @Get('expense')
  @ApiResponseType(ExpensePresenter, false)
  async getExpense(@Query('id') id: ObjectId) {
    const expense = await this.getExpenseUsecaseProxy.getInstance().execute(id);
    if (!expense) {
      this.exceptionsService.NotFoundException();
    }
    return new ExpensePresenter(expense);
  }

  @Get('expenses')
  @ApiResponseType(ExpensePresenter, true)
  async getExpenses(@Query('user_id') user_id: ObjectId) {
    const expenses = await this.getAllExpenseUsecaseProxy.getInstance().execute(user_id);
    return expenses.map((expense) => new ExpensePresenter(expense));
  }

  @Get('aggregate')
  @ApiResponseType(ExpensePresenter, true)
  async getValueByMonth(@Query('user_id') user_id: ObjectId) {
    return await this.aggregateMonthExpenseUsecaseProxy.getInstance().execute(user_id);
  }

  @Put('expense')
  @ApiResponseType(ExpensePresenter, true)
  async updateExpense(@Query('id') id: ObjectId, @Body() updateExpenseDto: ExpenseDto) {
    await this.updateExpenseUsecaseProxy.getInstance().execute(id, updateExpenseDto);
    return;
  }

  @Delete('expense')
  @ApiResponseType(ExpensePresenter, true)
  async deleteExpense(@Query('id') id: ObjectId) {
    await this.deleteExpenseUsecaseProxy.getInstance().execute(id);
    return;
  }

  @Post('expense')
  @ApiResponseType(ExpensePresenter, true)
  async addExpense(@Body() addExpenseDto: ExpenseDto) {
    await this.addExpenseUsecaseProxy.getInstance().execute(addExpenseDto);
    return;
  }
}
