"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCases = void 0;
class UpdateUserUseCases {
    constructor(logger, userRepository) {
        this.logger = logger;
        this.userRepository = userRepository;
    }
    async execute(id, data) {
        await this.userRepository.updateContent(id, data);
        this.logger.log('UpdateUserUseCases execute', `User ${id} have been updated`);
    }
}
exports.UpdateUserUseCases = UpdateUserUseCases;
//# sourceMappingURL=updateUser.usecases.js.map