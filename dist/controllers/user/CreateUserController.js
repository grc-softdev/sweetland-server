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
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/user/CreateUserService");
class CreateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                console.warn(req.body);
                const createUserService = new CreateUserService_1.CreateUserService();
                const user = yield createUserService.execute({ name, email, password });
                console.warn("creating user");
                return res.status(201).json(user); // Send a 201 (Created) status code
            }
            catch (error) {
                console.error(error.message);
                // Handle known errors gracefully
                if (error.message === "Email incorrect" || error.message === "User already exists") {
                    return res.status(400).json({ error: error.message });
                }
                // For unexpected errors
                return res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
