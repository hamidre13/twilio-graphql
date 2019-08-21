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
const user_functions_1 = require("./user.functions");
const mongoose_1 = __importDefault(require("mongoose"));
const getOne = async (obj, args, ctx) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4))) {
        throw new error_1.unauthorizedAccessError();
    }
    const user = await user_functions_1.userFunctions.getOneById(args.input.id);
    if (!user) {
        throw new error_1.noUserFoundError();
    }
    return user;
};
const getAll = async (obj, args, ctx) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4))) {
        throw new error_1.unauthorizedAccessError();
    }
    const total = await ctx.Models.userModel.countDocuments({}, (err, count) => {
        if (err) {
            throw new err();
        }
        return count;
    });
    const users = ctx.Models.userModel
        .find({})
        .skip(args.input.offset)
        .limit(args.input.limit)
        .exec();
    return { users, total };
};
const createUser = async (obj, args, ctx) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4))) {
        throw new error_1.unauthorizedAccessError();
    }
    const user = ctx.Models.userModel.create(args.input);
    return user;
};
const checkUserName = async (obj, args, ctx) => {
    const user = await ctx.Models.userModel.find({
        userName: args.input.userName
    });
    if (user.length !== 0) {
        return true;
    }
    else {
        return false;
    }
};
const updateUser = async (obj, args, ctx) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4))) {
        throw new error_1.unauthorizedAccessError();
    }
    auth_controller_1.authCheckGraph(ctx.req, ctx.res);
    const userId = args.input.id;
    const user = await ctx.Models.userModel
        .findById(userId)
        .then((res) => {
        if (!res) {
            throw new error_1.noUserFoundError();
        }
        else {
            return res;
        }
    })
        .catch(err => {
        return {
            id: 0,
            err: 500
        };
    });
    if (!user.err) {
        lo.merge(user, args.input);
        return user.save();
    }
    return user;
};
const deleteUser = async (obj, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4))) {
        throw new error_1.unauthorizedAccessError();
    }
    const userId = args.input.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        return {
            id: userId,
            err: 500
        };
    }
    const user = await ctx.Models.userModel
        .findById(userId)
        .then((res) => {
        if (!res) {
            return {
                id: 0,
                err: 404
            };
        }
        else {
            // TODO: All the orders and meta information should be removed as well
            ctx.Models.userMeta.deleteMany({ userId: res._id + "" });
            return ctx.Models.userModel.findByIdAndRemove(userId);
        }
    })
        .catch(err => {
        return {
            id: 0,
            err: 500
        };
    });
    if (!user.err) {
        user.err = 0;
    }
    if (user.err !== 0) {
        user.id = args.input.id;
    }
    return user;
};
exports.userResolvers = {
    Query: {
        getUser: getOne,
        getAllUsers: getAll,
        isUser: checkUserName
    },
    Mutation: {
        createUser,
        updateUser,
        deleteUser
    }
};
//# sourceMappingURL=user.resolvers.js.map