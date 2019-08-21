import express from "express";
import { twilioController } from "./twilio.controller";

export const twilioRouter = express.Router();
twilioRouter.route("/hold-music").get(twilioController.queueMusic);
twilioRouter.route("/token").get(twilioController.token);

twilioRouter.route("/voice").post(twilioController.voice);

twilioRouter.route("/reject-call").post(twilioController.rejectCall);
twilioRouter
  .route("/modify-call/:confSid/:friendlyName")
  .post(twilioController.modifyCall);
twilioRouter
  .route("/redirect-voicemail")
  .post(twilioController.redirectCallToVoiceMail);
twilioRouter
  .route("/agent-call-status/:confSid/:friendlyName")
  .post(twilioController.agentCallStatus);
twilioRouter
  .route("/verify-available/:confSid/:friendlyName")
  .post(twilioController.verifyAvailable);
twilioRouter
  .route("/add-manager/:callSid/:friendlyName")
  .post(twilioController.addManager);

twilioRouter
  .route("/bridge-agents/:confSid/:friendlyName")
  .post(twilioController.bridgeAgents);
twilioRouter
  .route("/call-transfer/:confSid/:friendlyName")
  .post(twilioController.callTransfer);
twilioRouter
  .route("/apply-call-change/:confSid/:friendlyName")
  .post(twilioController.applyCallChange);
twilioRouter.route("/route-call").post(twilioController.routeCall);
twilioRouter.route("/assign-call").post(twilioController.assignCall);
// twilioRouter
//   .route('/call-agent/:TaskSid/:resvSid')
//   .post(twilioController.callAgent);
twilioRouter
  .route("/post-call-task/:TaskSid")
  .post(twilioController.postCallTask);
twilioRouter
  .route("/conference-events")
  .post(twilioController.conferenceEvents);

twilioRouter
  .route("/twiml/:id")
  .post(twilioController.twiml)
  .get(twilioController.twiml);

twilioRouter
  .route("/cleantwiml/:id")
  .post(twilioController.cleanTwiml)
  .get(twilioController.cleanTwiml);
// twilioRouter.param('token', twilioController.params);
twilioRouter
  .route("/first/:token")
  .get(twilioController.respond)
  .post(twilioController.respond);
twilioRouter
  .route("/first")
  .get(twilioController.respond)
  .post(twilioController.respond);
