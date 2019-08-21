"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../error");
const auth_controller_1 = require("../auth/auth.controller");
const twilio_resolvers_1 = require("../twilio/twilio.resolvers");
const stripe_resolvers_1 = require("../stripe/stripe.resolvers");
const createUser = async (args, ctx) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    const user = {
        userName: args.input.email,
        userEmail: args.input.email,
        password: args.input.password
    };
    delete args.input.password;
    return await ctx.userModel.create(user);
};
const createUserMeta = async (args, ctx) => { };
const createCustomer = async (_, args, ctx, info) => {
    if (!(await auth_controller_1.authCheckGraph(ctx.req, 4)))
        throw new error_1.unauthorizedAccessError();
    let user;
    let customer;
    try {
        user = await createUser(args, ctx);
    }
    catch (e) {
        throw e;
    }
    try {
        customer = await stripe_resolvers_1.stripe.customers.create(args.input);
    }
    catch (e) {
        ctx.userModel
            .findById(user._id + "")
            .remove()
            .exec();
        throw e;
    }
    const twAccount = await twilio_resolvers_1.createTwilioSubAccount(args.input.email);
    console.log(twAccount);
    await ctx.userMeta.create([
        {
            metaKey: "customerId",
            metaValue: customer.id,
            userId: user._id + ""
        },
        {
            metaKey: "customerPhone",
            metaValue: customer.shipping.phone,
            userId: user._id + ""
        },
        {
            metaKey: "customerName",
            metaValue: customer.shipping.name,
            userId: user._id + ""
        },
        {
            metaKey: "role",
            metaValue: "customer",
            userId: user._id + ""
        },
        {
            metaKey: "twilio_auth",
            metaValue: twAccount.authToken,
            userId: user._id + ""
        },
        {
            metaKey: "twilio_sid",
            metaValue: twAccount.sid,
            userId: user._id + ""
        }
    ]);
    return customer;
};
exports.singupResolvers = {};
//# sourceMappingURL=signup.resolvers.js.map