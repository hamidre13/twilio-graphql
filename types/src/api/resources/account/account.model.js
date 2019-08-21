"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountMetaShema = new mongoose_1.default.Schema({
    metaKey: {
        type: String,
        required: true
    },
    metaValue: String,
    accountId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "account",
        required: true
    }
}, { timestamps: true });
accountMetaShema.index({ accountId: 1, metaKey: 1 }, { unique: true, dropDups: true });
exports.accountMeta = mongoose_1.default.model("accountMeta", accountMetaShema);
const accountFileSchema = new mongoose_1.default.Schema({
    accountFileName: {
        type: String,
        required: true
    },
    accountFileLocation: {
        type: String,
        required: true,
        unique: true
    },
    accountId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "account",
        required: true
    }
}, { timestamps: true });
exports.accountFile = mongoose_1.default.model("accountFile", accountFileSchema);
exports.validateEmail = function (v) {
    const regx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const result = regx.test(v);
    return result;
};
const accountSchema = new mongoose_1.default.Schema({
    accountEmail: {
        type: String,
        required: [true, "You have to supply a valid email"],
        validate: [exports.validateEmail, "Please provide valid email address"]
    },
    accountName: {
        type: String,
        unique: true,
        required: [true, "account name  is nessary"]
    },
    accountOwner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    accountAddress: {
        type: String
    },
    accountCity: {
        type: String
    },
    accountZipCode: {
        type: Number
    },
    accountState: {
        type: String
    },
    accountBillingAddress: {
        type: String
    },
    accountBillingCity: {
        type: String
    },
    accountBillingZipCode: {
        type: Number
    },
    accountBilingState: {
        type: String
    },
    accountDescription: {
        type: String
    },
    accountPhone: {
        type: String
    }
}, { timestamps: true });
exports.accountModel = mongoose_1.default.model("account", accountSchema);
//# sourceMappingURL=account.model.js.map