"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const randomstring_1 = __importDefault(require("randomstring"));
const config_1 = __importDefault(require("../../../config"));
const sendGrid_resolvers_1 = require("../sendGrid/sendGrid.resolvers");
const forgotLogin = async (obj, args, ctx) => {
    const username = args.input.username;
    if (!username)
        return false;
    const user = await ctx.userModel.findOne({ userName: username });
    if (!user) {
        return false;
    }
    else {
        //TODO:I hve to move template id to config
        const resetHash = randomstring_1.default.generate({
            length: 20,
            charset: "alphanumeric"
        });
        const resetLink = config_1.default.siteUrl + "recover_password/" + resetHash + "/" + user.id;
        console.log(resetLink);
        let meta = {};
        if ((meta = await ctx.userMeta.find({
            metaKey: "paswordRestHash",
            userId: user.id
        }))) {
            console.log(meta[0]);
            meta[0].metaValue = resetHash;
            meta[0].save();
        }
        else {
            meta = await ctx.userMeta.create({
                metaKey: "paswordRestHash",
                metaValue: resetHash,
                userId: user.id
            });
        }
        console.log(meta);
        const emailParameter = {
            personalizations: [
                {
                    to: [
                        {
                            email: user.userEmail
                        }
                    ],
                    subject: "Seodapop CRM Forgot password"
                }
            ],
            from: {
                email: "info@seodapop.com",
                name: "SeodaPop"
            },
            dynamic_template_data: {
                user: {
                    userName: user.userName,
                    passwordLink: resetLink
                }
            },
            tracking_settings: {
                click_tracking: {
                    enable: true
                },
                open_tracking: {
                    enable: true
                }
            },
            footer: {
                enable: false
            },
            template_id: "d-917c852d0b264f19941eb2ce7efa4a25"
        };
        sendGrid_resolvers_1.sendEmail(emailParameter);
        return true;
    }
};
const recoverPassword = async (obj, args, ctx, info) => {
    const hash = args.input.hash;
    const userId = args.input.userId;
    const newPassword = args.input.newPassword;
    let meta = await ctx.userMeta.find({
        metaKey: "paswordRestHash",
        userId: userId
    });
    console.log(meta);
    if (meta) {
        if (meta[0].metaValue === hash) {
            let user = await ctx.userModel.findById(userId);
            if (!user)
                return false;
            meta[0].remove();
            user.password = newPassword;
            user.save();
            return true;
        }
    }
    return false;
};
exports.authResolvers = {
    Query: {
        forgotLogin
    },
    Mutation: {
        recoverPassword
    }
};
//# sourceMappingURL=auth.resolvers.js.map