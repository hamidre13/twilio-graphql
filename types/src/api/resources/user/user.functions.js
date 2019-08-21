"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
const mongoose_1 = __importDefault(require("mongoose"));
exports.userFunctions = Object.create(null);
exports.userFunctions.getOneById = async (id) => {
    if (mongoose_1.default.Types.ObjectId.isValid(id)) {
        const res = await user_model_1.userModel.findById(id);
        return res;
    }
    return null;
};
//# sourceMappingURL=user.functions.js.map