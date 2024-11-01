"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersUseCases = void 0;
class GetUsersUseCases {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute() {
        return await this.userRepository.findAll();
    }
}
exports.GetUsersUseCases = GetUsersUseCases;
//# sourceMappingURL=getUsers.usecases.js.map