import express from "express";
import { twilioRouter } from "./resources/twilio";

export const restRouter = express.Router();

restRouter.use("/twilio", twilioRouter);

//TODO I have to write an api error handler for this!!
restRouter.all("*", (req, res) => {
  console.log("not valid route");
  console.log(req.path);
  res.json({ erro: "api call not found" });
});
