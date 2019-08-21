"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("./auth.controller");
exports.authRouter = express_1.default.Router();
exports.authRouter
    .route('/google/callback')
    .get(passport_1.default.authenticate('google'), auth_controller_1.authCheck, (req, res) => {
    res.send('ok');
});
exports.authRouter.route('/google').get(passport_1.default.authenticate('google', {
    scope: ['profile', 'email']
}));
exports.authRouter.route('/local').post(passport_1.default.authenticate('local', {
    successRedirect: '/api/auth/local/callback',
    failureRedirect: '/api/auth/local',
    failureFlash: true
}));
exports.authRouter.route('/local/callback').get((req, res) => {
    res.send('ok');
});
exports.authRouter.route('/logout').get((req, res) => {
    req.logout();
    res.send('ok');
});
exports.authRouter.route('/fb').get(passport_1.default.authenticate('facebook', {
    scope: ['email', 'public_profile']
}));
exports.authRouter.route('/fb/callback').get(auth_controller_1.authCheck, passport_1.default.authenticate('facebook', {
    successRedirect: '/api/auth/fb/callback/2',
    failureRedirect: '/api/auth/fb/'
}));
exports.authRouter.route('/fb/callback/2').get(auth_controller_1.authCheck, (req, res) => {
    res.send('ok');
});
//# sourceMappingURL=auth.restRouter.js.map