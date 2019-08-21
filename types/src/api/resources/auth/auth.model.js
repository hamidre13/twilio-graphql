"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ["active", "inactive"]
    },
    Token: {
        type: String
    },
    expires: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.authModel = mongoose_1.default.model("auth", authSchema);
//# sourceMappingURL=auth.model.js.map