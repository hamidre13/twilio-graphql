"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../src/config"));
const server_1 = require("../src/server");
const user_model_1 = require("../src/api/resources/user/user.model");
const product_model_1 = require("../src/api/resources/product/product.model");
const account_model_1 = require("../src/api/resources/account/account.model");
const option_model_1 = require("../src/api/resources/option/option.model");
//mongoose.Promise = gloabal.promise
const models = {
    user: user_model_1.userModel,
    prodect: product_model_1.productModel,
    account: account_model_1.accountModel,
    option: option_model_1.optionModel
};
const cleanDB = async () => {
    await models.user.deleteMany({});
    await models.prodect.deleteMany({});
    await models.account.deleteMany({});
    await models.option.deleteMany({});
};
const connectToDB = async () => {
    // console.log("connecting to db");
    const connection = await mongoose_1.default.connect(config_1.default.db.Url, server_1.mongoConfig);
    return connection;
};
const disconnectDB = (done = () => { }) => {
    mongoose_1.default.dissconnect(done);
};
const generateMongooseId = () => {
    return mongoose_1.default.Types.ObjectId();
};
exports.dbTools = {
    cleanDB,
    connectToDB,
    disconnectDB,
    generateMongooseId
};
//# sourceMappingURL=db.js.map