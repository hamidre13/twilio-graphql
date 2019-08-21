"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lo = __importStar(require("lodash"));
const error_1 = require("../error");
const getOne = async (obj, args, ctx, info) => {
    const product = await ctx.Models.productModel.findById(args.input.id).exec();
    if (!product) {
        throw new error_1.noProductFoundError();
    }
    ;
    return product;
};
const allProducts = async (obj, args, ctx, info) => {
    const total = await ctx.Models.productModel.count({}, (err, count) => {
        return count;
    });
    const products = ctx.Models.productModel
        .find({})
        .skip(args.input.offset)
        .limit(args.input.limit)
        .exec();
    return { products, total };
};
const createProduct = (obj, args, ctx, info) => {
    const product = ctx.Models.productModel.create(args.input);
    return product;
};
const updateProduct = async (obj, args, ctx, info) => {
    const productId = args.input.id;
    const product = await ctx.productModel
        .findById(productId)
        .then((res) => {
        if (!res) {
            throw new error_1.noProductFoundError();
        }
        else {
            return res;
        }
    })
        .catch((err) => {
        throw new error_1.noProductFoundError();
    });
    lo.merge(product, args.input);
    return product.save();
};
const deleteProduct = async (obj, args, ctx, info) => {
    const productId = args.input.id;
    const product = await ctx.productModel
        .findById(productId)
        .then(res => {
        if (!res) {
            throw new error_1.noProductFoundError();
        }
        else {
            return res.remove().then((removed) => {
                console.log(removed._id);
                return {
                    id: removed._id,
                    err: 0
                };
            });
        }
    })
        .catch((err) => {
        throw new error_1.noProductFoundError();
    });
    product.id = args.input.id;
    return product;
};
const singleUpload = (obj, args, ctx, info) => {
    // file Infor
    const file = args.input.file;
    console.log(args);
};
const readProductFiles = (obj, args, ctx, info) => {
    console.log(args);
};
exports.productResolvers = {
    Query: {
        getProduct: getOne,
        getAllProducts: allProducts
    },
    Mutation: {
        createProduct,
        updateProduct,
        deleteProduct
    }
};
//# sourceMappingURL=product.resolvers.js.map