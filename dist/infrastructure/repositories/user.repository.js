"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseUserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_1 = require("../../domain/model/user");
const user_entity_1 = require("../entities/user.entity");
const mongodb_1 = require("mongodb");
let DatabaseUserRepository = class DatabaseUserRepository {
    constructor(userEntityRepository) {
        this.userEntityRepository = userEntityRepository;
    }
    async updateContent(id, data) {
        data.updated_date = new Date();
        delete data.create_date;
        await this.userEntityRepository.update({
            _id: new mongodb_1.ObjectId(id),
        }, data);
    }
    async insert(user) {
        await this.userEntityRepository.insert(this.toUserEntity(user));
    }
    async findAll() {
        const usersEntity = await this.userEntityRepository.find();
        return usersEntity.map((userEntity) => this.user(userEntity));
    }
    async findById(id) {
        return await this.userEntityRepository.findOne({ where: { _id: new mongodb_1.ObjectId(id) } });
    }
    async findByUsername(email) {
        return await this.userEntityRepository.findOne({ where: { email: email } });
    }
    async deleteById(id) {
        await this.userEntityRepository.delete({ _id: new mongodb_1.ObjectId(id) });
    }
    user(userEntity) {
        const user = new user_1.UserM();
        user._id = userEntity._id;
        user.password = userEntity.password;
        user.email = userEntity.email;
        user.role = userEntity.role;
        user.create_date = userEntity.create_date;
        user.updated_date = userEntity.updated_date;
        return user;
    }
    toUserEntity(user) {
        const userEntity = new user_entity_1.User();
        userEntity._id = new mongodb_1.ObjectId();
        userEntity.email = user.email;
        userEntity.role = user.role;
        userEntity.password = user.password;
        userEntity.create_date = new Date();
        userEntity.updated_date = new Date();
        return userEntity;
    }
};
exports.DatabaseUserRepository = DatabaseUserRepository;
exports.DatabaseUserRepository = DatabaseUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DatabaseUserRepository);
//# sourceMappingURL=user.repository.js.map