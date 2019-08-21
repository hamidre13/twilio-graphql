"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const error_1 = require("./../error");
const auth_controller_1 = require("./../auth/auth.controller");
exports.stripe = require("stripe")(config_1.default.secrets.STRIPE_SECRET);
const createProduct = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.products.create(args.input).then((product, err) => {
        if (err)
            throw new err();
        return product;
    });
};
const createPlan = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.plans.create(args.input).then((plan, err) => {
        if (err)
            throw new err();
        return plan;
    });
};
const getSubscription = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.subscriptions
        .retrieve(args.input.subscription)
        .then((subs, err) => {
        if (err)
            throw new err();
        return subs;
    });
};
const createSubscription = async (_, { input }, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    const subscription = await exports.stripe.subscriptions
        .create({ customer: input.customer, items: input.items })
        .then(err => {
        if (err)
            throw new err();
        return subscription;
    });
    return subscription;
};
const listAllProducts = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.products.list(args.input || {}).then((products, err) => {
        if (err)
            throw new err();
        return products;
    });
};
const listAllPlans = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.plans.list(args.input || {}).then((plans, err) => {
        if (err)
            throw new err();
        return plans;
    });
};
const listAllSubscriptions = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.subscriptions.list(args.input || {}).then((subs, err) => {
        if (err)
            throw new err();
        return subs;
    });
};
const listAllCustomers = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.customers.list(args.input || {});
};
const updatePlan = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    const plan = args.input.plan;
    delete args.input.plan;
    return await exports.stripe.plans.update(plan, args.input);
};
const updateProduct = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    const product = args.input.product;
    delete args.input.product;
    return await exports.stripe.products.update(product, args.input);
};
const updateSubscription = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    const id = args.input.id;
    const customer = args.input.customer;
    delete args.input.id;
    delete args.input.customer;
    return await exports.stripe.subscriptions.update(id, args.input);
};
const updateCustomer = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    if (args.input.email) {
        const meta = await ctx.Models.userMeta
            .find({ customerId: args.input.customer })
            .exec();
        const usr = await ctx.Models.userModel.findById(meta.userId);
        usr.userEmail = args.input.email;
        usr.userName = args.input.email;
        usr.save();
    }
    const customer = args.input.customer;
    delete args.input.customer;
    return await exports.stripe.products.update(customer, args.input);
};
const deleteProduct = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.products.del(args.input.product);
};
const deleteSubscription = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.subscriptions.del(args.input.product);
};
const deletePlan = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.plans.del(args.input.plan);
};
const deleteCustomer = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    return await exports.stripe.customers.del(args.input.customer);
};
exports.stripeResolvers = {
    Query: {
        listAllProducts,
        listAllPlans,
        listAllCustomers,
        listAllSubscriptions
    },
    Mutation: {
        createPlan,
        createProduct,
        createSubscription,
        updateProduct,
        updatePlan,
        updateCustomer,
        updateSubscription,
        deletePlan,
        deleteProduct,
        deleteCustomer,
        deleteSubscription
    }
};
//# sourceMappingURL=stripe.resolvers.js.map