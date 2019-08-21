"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const twilio_1 = require("./resources/twilio");
const auth_1 = require("./resources/auth");
exports.restRouter = express_1.default.Router();
// restRouter.use("/user",userRouter)
exports.restRouter.use('/twilio', twilio_1.twilioRouter);
exports.restRouter.use('/auth', auth_1.authRouter);
//TODO I have to write an api error handler for this!!
exports.restRouter.all('*', (req, res) => {
    console.log('not valid route');
    console.log(req.path);
    res.json({ erro: 'api call not found' });
});
//# sourceMappingURL=restRouter.js.map