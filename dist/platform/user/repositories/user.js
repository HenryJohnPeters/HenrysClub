"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUser = exports.UserRepository = void 0;
const USERS_TABLE = process.env.USERS_TABLE || "Users";
class UserRepository {
    get(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, exports.mockUser)();
            // const command = new GetCommand({
            //   TableName: USERS_TABLE,
            //   Key: { userId },
            // });
            // const result = await db.send(command);
            // return (result.Item as User) || null;
        });
    }
    getBalance(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return 10;
            // const command = new GetCommand({
            //   TableName: USERS_TABLE,
            //   Key: { userId },
            //   ProjectionExpression: "balance",
            // });
            // const result = await db.send(command);
            // return result.Item?.balance ?? null;
        });
    }
}
exports.UserRepository = UserRepository;
const mockUser = (overrides) => {
    return Object.assign({ id: Math.floor(Math.random() * 1000000), username: `user_${Math.floor(Math.random() * 10000)}`, isActive: Math.random() > 0.5, balance: Math.floor(Math.random() * 5000), createdAt: new Date(), email: `user${Math.floor(Math.random() * 10000)}@example.com`, updatedAt: Math.random() > 0.5 ? new Date() : undefined, lastLogin: Math.random() > 0.5 ? new Date() : undefined, profilePictureUrl: Math.random() > 0.5
            ? `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`
            : undefined, geoIp: Math.random() > 0.5
            ? {
                ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                country: "US",
                region: "California",
                city: "Los Angeles",
                latitude: 34.0522,
                longitude: -118.2437,
            }
            : undefined }, overrides);
};
exports.mockUser = mockUser;
