"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lo = __importStar(require("lodash"));
const error_1 = require("../error");
const auth_controller_1 = require("../auth/auth.controller");
const mongoose_1 = __importDefault(require("mongoose"));
const createOption = async (obj, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 5))) {
        throw new error_1.unauthorizedAccessError();
    }
    const option = ctx.Models.optionModel.create(args.input);
    return option;
};
/**
 * Get one option with the option Key
 */
const getOneOption = async (obj, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 5))) {
        throw new error_1.unauthorizedAccessError();
    }
    const option = await ctx.Models.optionModel.find({
        optionId: args.input.optionKey
    });
    if (!option[0]) {
        throw new error_1.noOptionFoundError();
    }
    return option[0];
};
const getAllOptions = async (obj, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 5))) {
        throw new error_1.unauthorizedAccessError();
    }
    const total = await ctx.Models.optionModel.countDocuments({}, (err, count) => {
        if (err) {
            throw new err();
        }
        return count;
    });
    const options = await ctx.Models.optionModel
        .find({})
        .skip(args.input.offset)
        .limit(args.input.limit)
        .exec();
    return { options, total };
};
const updateOption = async (obj, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 5))) {
        throw new error_1.unauthorizedAccessError();
    }
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkForHexRegExp.test(args.input.id)) {
        throw new error_1.noOptionFoundError();
    }
    const id = args.input.id;
    const option = await ctx.Models.optionModel
        .findById(id)
        .then((res) => {
        if (!res) {
            throw new error_1.noOptionFoundError();
        }
        else {
            return res;
        }
    })
        .catch(err => {
        throw new error_1.noOptionFoundError();
    });
    if (!option.err) {
        lo.merge(option, args.input);
        return option.save();
    }
    return option;
};
const deleteOption = async (obj, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 5))) {
        throw new error_1.unauthorizedAccessError();
    }
    const optionId = args.input.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(optionId)) {
        return {
            id: optionId,
            err: 500
        };
    }
    const option = await ctx.Models.optionModel
        .findById(optionId)
        .then((res) => {
        if (!res) {
            return {
                id: optionId,
                err: 404
            };
        }
        else {
            return ctx.Models.optionModel.findByIdAndRemove(optionId);
        }
    })
        .catch(err => {
        return {
            id: optionId,
            err: 500
        };
    });
    if (!option.err) {
        option.err = 0;
    }
    if (option.err !== 0) {
        option.id = args.input.id;
    }
    return option;
};
exports.optionResolvers = {
    Query: {
        getOption: getOneOption,
        getAllOptions
    },
    Mutation: {
        createOption,
        updateOption,
        deleteOption
    }
};
//# sourceMappingURL=option.resolvers.js.map