"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUseCases = void 0;
class DeleteUserUseCases {
    constructor(logger, userRepository) {
        this.logger = logger;
        this.userRepository = userRepository;
    }
    async execute(id) {
        await this.userRepository.deleteById(id);
        this.logger.log('DeleteUserUseCases execute', `User ${id} have been deleted`);
    }
}
exports.DeleteUserUseCases = DeleteUserUseCases;
//# sourceMappingURL=deleteUser.usecases.js.map