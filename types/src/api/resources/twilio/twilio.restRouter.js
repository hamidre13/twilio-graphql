"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const twilio_controller_1 = require("./twilio.controller");
exports.twilioRouter = express_1.default.Router();
exports.twilioRouter.route('/hold-music').get(twilio_controller_1.twilioController.queueMusic);
exports.twilioRouter.route('/token').get(twilio_controller_1.twilioController.token);
exports.twilioRouter.route('/voice').post(twilio_controller_1.twilioController.voice);
exports.twilioRouter.route('/reject-call').post(twilio_controller_1.twilioController.rejectCall);
exports.twilioRouter
    .route('/modify-call/:confSid/:friendlyName')
    .post(twilio_controller_1.twilioController.modifyCall);
exports.twilioRouter
    .route('/redirect-voicemail')
    .post(twilio_controller_1.twilioController.redirectCallToVoiceMail);
exports.twilioRouter
    .route('/agent-call-status/:confSid/:friendlyName')
    .post(twilio_controller_1.twilioController.agentCallStatus);
exports.twilioRouter
    .route('/verify-available/:confSid/:friendlyName')
    .post(twilio_controller_1.twilioController.verifyAvailable);
exports.twilioRouter
    .route('/add-manager/:callSid/:friendlyName')
    .post(twilio_controller_1.twilioController.addManager);
exports.twilioRouter
    .route('/bridge-agents/:confSid/:friendlyName')
    .post(twilio_controller_1.twilioController.bridgeAgents);
exports.twilioRouter
    .route('/call-transfer/:confSid/:friendlyName')
    .post(twilio_controller_1.twilioController.callTransfer);
exports.twilioRouter
    .route('/apply-call-change/:confSid/:friendlyName')
    .post(twilio_controller_1.twilioController.applyCallChange);
exports.twilioRouter.route('/route-call').post(twilio_controller_1.twilioController.routeCall);
exports.twilioRouter.route('/assign-call').post(twilio_controller_1.twilioController.assignCall);
// twilioRouter
//   .route('/call-agent/:TaskSid/:resvSid')
//   .post(twilioController.callAgent);
exports.twilioRouter
    .route('/post-call-task/:TaskSid')
    .post(twilio_controller_1.twilioController.postCallTask);
exports.twilioRouter
    .route('/conference-events')
    .post(twilio_controller_1.twilioController.conferenceEvents);
exports.twilioRouter
    .route('/twiml/:id')
    .post(twilio_controller_1.twilioController.twiml)
    .get(twilio_controller_1.twilioController.twiml);
exports.twilioRouter
    .route('/cleantwiml/:id')
    .post(twilio_controller_1.twilioController.cleanTwiml)
    .get(twilio_controller_1.twilioController.cleanTwiml);
// twilioRouter.param('token', twilioController.params);
exports.twilioRouter
    .route('/first/:token')
    .get(twilio_controller_1.twilioController.respond)
    .post(twilio_controller_1.twilioController.respond);
exports.twilioRouter
    .route('/first')
    .get(twilio_controller_1.twilioController.respond)
    .post(twilio_controller_1.twilioController.respond);
//# sourceMappingURL=twilio.restRouter.js.map