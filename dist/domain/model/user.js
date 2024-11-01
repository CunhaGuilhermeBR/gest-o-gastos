"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserM = exports.UserMWithoutPassword = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
class UserMWithoutPassword {
}
exports.UserMWithoutPassword = UserMWithoutPassword;
class UserM extends UserMWithoutPassword {
}
exports.UserM = UserM;
//# sourceMappingURL=user.js.map