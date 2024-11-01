"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserUseCases = void 0;
class GetUserUseCases {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        return await this.userRepository.findById(id);
    }
}
exports.GetUserUseCases = GetUserUseCases;
//# sourceMappingURL=getUser.usecases.js.map