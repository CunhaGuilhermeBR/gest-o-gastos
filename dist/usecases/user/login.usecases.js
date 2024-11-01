"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCases = void 0;
const user_1 = require("../../domain/model/user");
const bcrypt = require("bcrypt");
class LoginUseCases {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(username, password) {
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            return null;
        }
        const match = await bcrypt.compare(password, user.password);
        if (match && user) {
            const up_login = new user_1.UserMWithoutPassword();
            await this.userRepository.updateContent(user._id, up_login);
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
exports.LoginUseCases = LoginUseCases;
//# sourceMappingURL=login.usecases.js.map