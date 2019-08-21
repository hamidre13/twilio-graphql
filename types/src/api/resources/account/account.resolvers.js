"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const auth_controller_1 = require("../auth/auth.controller");
const error_1 = require("../error");
const getOne = async (obj, args, ctx) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkForHexRegExp.test(args.input.id))
        throw new error_1.noAccountFoundError();
    const account = await ctx.accountModel.findById(args.input.id).exec();
    if (!account)
        throw new error_1.noAccountFoundError();
    return account;
};
const allAccounts = async (obj, args, ctx) => {
    const total = await ctx.accountModel.countDocuments({}, (err, count) => {
        if (err)
            throw new err();
        return count;
    });
    const accounts = ctx.accountModel
        .find({})
        .skip(args.input.offset)
        .limit(args.input.limit)
        .exec();
    return { accounts, total };
};
const createAccount = async (obj, args, ctx) => {
    const user = await ctx.userModel
        .findOne({ userName: args.input.accountOwner })
        .exec();
    if (!user)
        throw new error_1.noUserFoundError();
    args.input.accountOwner = user.id;
    const account = await ctx.accountModel.create(args.input);
    return account;
};
const updateAccount = async (obj, args, ctx) => {
    const accountId = args.input.id;
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkForHexRegExp.test(args.input.id))
        throw new error_1.noAccountFoundError();
    let account = await ctx.accountModel
        .findById(accountId)
        .then(function (account, accountId) {
        if (!account) {
            return {
                id: 0,
                err: 404
            };
        }
        else {
            return account;
        }
    })
        .catch(function (err) {
        return {
            id: 0,
            err: 500
        };
    });
    if (!account.err) {
        lodash_1.default.merge(account, args.input);
        return account.save();
    }
    return account;
};
const deleteAccount = async (obj, args, ctx) => {
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkForHexRegExp.test(args.input.id))
        throw new error_1.noAccountFoundError();
    const accountId = args.input.id;
    let account = await ctx.accountModel
        .findById(accountId)
        .then(function (account, accountId) {
        if (!account) {
            throw new error_1.noAccountFoundError();
        }
        else {
            return account.remove().then(function (removed) {
                return {
                    id: removed.id,
                    err: 0
                };
            });
        }
    })
        .catch(function (err) {
        throw new error_1.noAccountFoundError();
    });
    if (account.err != 0) {
        account.id = args.input.id;
    }
    return account;
};
const singleAccountFileUpload = (_, args, ctx, info) => {
    //file Infor
    const file = args.input.file;
    console.log(args);
};
const readAccountFiles = () => { };
exports.accountResolvers = {
    Query: {
        getAccount: getOne,
        getAccountFiles: readAccountFiles,
        getAllAccounts: allAccounts
    },
    Mutation: {
        createAccount,
        updateAccount,
        deleteAccount,
        singleAccountFileUpload
    }
};
//# sourceMappingURL=account.resolvers.js.map