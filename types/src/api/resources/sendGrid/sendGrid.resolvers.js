"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = __importDefault(require("../../../config"));
mail_1.default.setApiKey(config_1.default.secrets.SENDGRID_API_KEY);
const graphqlMail = (_, args, ctx, info) => { };
exports.sendEmail = async (args) => {
    mail_1.default
        .send(args)
        .then()
        .catch(e => console.error(e));
};
exports.sendGridResolvers = {
    Query: {
        sendEmail: graphqlMail
    }
};
//# sourceMappingURL=sendGrid.resolvers.js.map