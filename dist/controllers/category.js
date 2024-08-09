"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = __importDefault(require("../services/category"));
const service = new category_1.default();
class CategoryController {
    async list(req, res) {
        try {
            await service.getAll('');
            res.status(200).json({ message: 'teste' });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = CategoryController;
