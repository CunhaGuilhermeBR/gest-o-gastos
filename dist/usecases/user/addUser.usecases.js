"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserUseCases = void 0;
const user_1 = require("../../domain/model/user");
const bcrypt = require("bcrypt");
class AddUserUseCases {
    constructor(logger, userRepository, exceptionsService) {
        this.logger = logger;
        this.userRepository = userRepository;
        this.exceptionsService = exceptionsService;
    }
    async execute(email, password, role) {
        const exists = await this.userRepository.findByUsername(email);
        if (exists) {
            return this.exceptionsService.BadRequestException({
                message: 'Já existe um usuário com esse email'
            });
        }
        ;
        const user = new user_1.UserM();
        user.password = await bcrypt.hash(password, 10);
        user.email = email;
        user.role = role || user_1.UserRole.USER;
        await this.userRepository.insert(user);
        this.logger.log('AddUserUseCases execute', 'New user have been inserted');
    }
}
exports.AddUserUseCases = AddUserUseCases;
//# sourceMappingURL=addUser.usecases.js.map