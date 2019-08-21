"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productMetaShema = new mongoose_1.default.Schema({
    metaKey: {
        type: String,
        required: true
    },
    metaValue: String,
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
}, { timestamps: true });
productMetaShema.index({ productId: 1, metaKey: 1 }, { unique: true, dropDups: true });
exports.productMeta = mongoose_1.default.model('productMeta', productMetaShema);
const productFileSchema = new mongoose_1.default.Schema({
    productFileName: {
        type: String,
        required: true
    },
    productFileLocation: {
        type: String,
        required: true,
        unique: true
    },
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
}, { timestamps: true });
exports.productFile = mongoose_1.default.model('productFile', productFileSchema);
const productSchema = new mongoose_1.default.Schema({
    productName: {
        type: String,
        required: [true, 'product name  is nessary']
    },
    productSku: {
        type: String
    },
    productDescription: {
        type: String
    },
    productImage: {
        type: String
    },
    productPrice: {
        type: Number
    },
    productQuantity: {
        type: Number
    }
}, { timestamps: true });
exports.productModel = mongoose_1.default.model('product', productSchema);
//# sourceMappingURL=product.model.js.map