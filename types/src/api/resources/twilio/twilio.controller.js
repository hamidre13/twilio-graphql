"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const config_1 = __importDefault(require("../../../config"));
const client = twilio_1.default(config_1.default.accounts.TWILIO_SID, config_1.default.secrets.TWILIO_TOKEN);
exports.twilioController = {};
exports.twilioController.callObjs = [];
exports.twilioController.smsObjs = [];
const numbers = [
    "+16197658862",
    "+19493577693",
    "sip:+14159808090@sip.seodapop.com"
];
exports.twilioController.params = (req, res, next) => {
    req.token = req.params.token;
    next();
};
exports.twilioController.createTwiml = twimlObj => {
    exports.twilioController.callObjs.push(twimlObj);
    return twimlObj;
};
//this function has to be called after the call is done
exports.twilioController.cleanTwiml = (req, res, err) => {
    let i = 0;
    const id = req.params.id;
    console.log(exports.twilioController.callObjs);
    exports.twilioController.callObjs.forEach(obj => {
        if (obj.random === id) {
            exports.twilioController.callObjs.splice(i, 1);
        }
        i++;
    });
    console.log(exports.twilioController.callObjs);
};
exports.twilioController.twiml = (req, res, err) => {
    const id = req.params.id;
    console.log("inside twiml obj");
    console.log(exports.twilioController.callObjs);
    exports.twilioController.callObjs.forEach(obj => {
        if (obj.random === id) {
            res.writeHead(200, { "Content-Type": "text/xml" });
            res.end(obj.value.toString());
        }
    });
    res.status(500).end("Unauthorized");
};
exports.twilioController.queueMusic = (req, res, next, err) => {
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    response.play({}, "https://cdn.seodapop.com/wp-content/uploads/2018/04/MusicOnHold_03-16-2018.mp3");
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
const ActiveCalls = [];
exports.twilioController.agentCallStatus = async (req, res, err) => {
    console.log(req.body.CallStatus);
    if (req.body.CallStatus !== "answered" &&
        req.body.CallStatus !== "completed") {
        const call = ActiveCalls.find(function (call) {
            if (call.confSid === req.params.confSid)
                return call;
        });
        call.noAnswer++;
        if (call.noAnswer == numbers.length) {
            console.log("send the conf to voiceMail");
            const callers = await client
                .conferences(req.params.confSid)
                .participants.list();
            client.calls(callers[0].callSid).update({
                url: config_1.default.siteUrl + "/api/twilio/redirect-voicemail"
            });
        }
    }
    if (req.body.CallStatus === "completed") {
        console.log("call is over");
        const callers = await client
            .conferences(req.params.confSid)
            .participants.list();
        client.calls(callers[0].callSid).update({
            url: config_1.default.siteUrl + "/api/twilio/reject-call"
        });
    }
    res.send("ok");
};
exports.twilioController.conferenceEvents = (req, res, err) => {
    if (req.body.FriendlyName == "CustomerCall" && req.body.SequenceNumber == 1) {
        ActiveCalls.push({
            confSid: req.body.ConferenceSid,
            avilableAgents: numbers.length,
            noAnswer: 0
        });
        for (let i = 0; i < numbers.length; i++) {
            client.calls.create({
                from: "+18002779389",
                to: numbers[i],
                timeout: 15,
                statusCallback: config_1.default.siteUrl +
                    "/api/twilio/agent-call-status/" +
                    req.body.ConferenceSid +
                    "/" +
                    req.body.FriendlyName,
                url: config_1.default.siteUrl +
                    "/api/twilio/verify-available/" +
                    req.body.ConferenceSid +
                    "/" +
                    req.body.FriendlyName
            });
        }
    }
    res.send("ok");
};
exports.twilioController.redirectCallToVoiceMail = (req, res, err) => {
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    response.say("please leave a message after the beep");
    response.record({
        action: config_1.default.siteUrl + "/api/twilio/reject-call"
    });
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
exports.twilioController.rejectCall = (req, res, err) => {
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    response.reject();
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
exports.twilioController.verifyAvailable = async (req, res, err) => {
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    const callers = await client
        .conferences(req.params.confSid)
        .participants.list();
    if (callers.length !== 1) {
        client.calls(req.body.callSid).update({
            url: config_1.default.siteUrl + "/api/twilio/reject-call"
        });
    }
    else {
        response.gather({
            input: "dtmf",
            numDigits: 1,
            action: config_1.default.siteUrl +
                "/api/twilio/call-transfer/" +
                req.params.confSid +
                "/" +
                req.params.friendlyName
        });
    }
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
exports.twilioController.callTransfer = (req, res, err) => {
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    if (req.body.Digits == 1) {
        response.redirect(config_1.default.siteUrl +
            "/api/twilio/bridge-agents/" +
            req.params.confSid +
            "/" +
            req.params.friendlyName);
    }
    else {
        response.reject();
    }
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
exports.twilioController.bridgeAgents = async (req, res, err) => {
    const callers = await client
        .conferences(req.params.confSid)
        .participants.list();
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    if (callers.length === 1) {
        const dial = response.dial({
            hangupOnStar: true,
            action: config_1.default.siteUrl +
                "/api/twilio/modify-call/" +
                req.params.confSid +
                "/" +
                req.params.friendlyName
        });
        dial.conference({ startConferenceOnEnter: true, beep: false }, req.params.friendlyName);
    }
    else {
        response.reject();
    }
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
exports.twilioController.modifyCall = async (req, res, err) => {
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    response.gather({
        input: "dtmf",
        numDigits: 1,
        action: config_1.default.siteUrl +
            "/api/twilio/apply-call-change/" +
            req.params.confSid +
            "/" +
            req.params.friendlyName
    });
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
exports.twilioController.applyCallChange = async (req, res, err) => {
    const option = parseInt(req.body.Digits);
    const callers = await client
        .conferences(req.params.confSid)
        .participants.list();
    switch (option) {
        case 6:
            client
                .conferences(req.params.confSid)
                .participants(callers[0].callSid)
                .update({
                hold: true,
                holdUrl: config_1.default.siteUrl + "/api/twilio/queuemusic"
            });
            break;
        case 7:
            // Get back to conferance
            client
                .conferences(req.params.confSid)
                .participants(callers[0].callSid)
                .update({
                hold: false
            });
            break;
        case 8:
            // Get back to conferance
            client
                .conferences(req.params.confSid)
                .participants(callers[0].callSid)
                .update({
                hold: true,
                holdUrl: ""
            });
            break;
        case 9:
            // Get back to conferance
            client.calls.create({
                from: "+18002779389",
                to: numbers[0],
                timeout: 15,
                url: config_1.default.siteUrl +
                    "/api/twilio/add-manager/" +
                    req.body.CallSid +
                    "/" +
                    req.params.friendlyName
            });
            break;
    }
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    const dial = response.dial({
        hangupOnStar: true,
        action: config_1.default.siteUrl +
            "/api/twilio/modify-call/" +
            req.params.confSid +
            "/" +
            req.params.friendlyName
    });
    dial.conference({ startConferenceOnEnter: true, beep: false }, req.params.friendlyName);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
exports.twilioController.addManager = (req, res, err) => {
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    const dial = response.dial({
        hangupOnStar: true
    });
    dial.conference({
        startConferenceOnEnter: true,
        endConferenceOnExit: false,
        beep: false,
        whisper: req.params.callSid
    }, req.params.friendlyName);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
exports.twilioController.respond = (req, res, err) => {
    console.log("in twilio resp");
    console.log(req.session);
    if (req.params.token === "adfafaFLJRE234324dahlk23h453245fassfasFSD") {
        const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
        const response = new VoiceResponse();
        const gather = response.gather({
            input: "dtmf",
            timeout: 1,
            numDigits: 3,
            action: "/api/twilio/route-call"
        });
        gather.say({ voice: "alice" }, "Para español, presione el número  2");
        gather.play({}, "https://cdn.seodapop.com/wp-content/uploads/2018/04/Greeting_msg.mp3");
        response.redirect("/api/twilio/route-call");
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(response.toString());
    }
    else {
        res.status(500).send("Unauthorized");
    }
};
/*
 * Enqueue happens here then we have to add more attribuites
 */
exports.twilioController.routeCall = (req, res, err) => {
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    if (req.body.Digits == 2) {
        // const attrs = { selected_language: 'en' };
        // response
        //   .enqueue({
        //     workflowSid: 'WW65ac7f23d21920a47aadd5db3b3d0068',
        //     waitUrl: '/api/twilio/queuemusic'
        //   })
        //   .task({}, JSON.stringify(attrs));
        const dial = response.dial();
        dial.conference({
            waitUrl: "/api/twilio/queuemusic",
            endConferenceOnExit: true,
            statusCallback: `${config_1.default.siteUrl}/api/twilio/conference-events`,
            statusCallbackEvent: ["start", "end", "join", "leave", "mute", "hold"]
        }, "CustomerCall");
    }
    else if (req.body.CallSid) {
        const attrs = { selected_language: "en" };
        response
            .enqueue({
            workflowSid: "WW65ac7f23d21920a47aadd5db3b3d0068",
            waitUrl: "/api/twilio/queuemusic"
        })
            .task({}, JSON.stringify(attrs));
    }
    else if (req.body.Digits == 9) {
        response.say("action completed");
    }
    else {
        res.status(500).send("Unauthorized");
    }
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
exports.twilioController.assignCall = async (req, res, err) => {
    console.log(req.body);
    const contactUri = JSON.parse(req.body.WorkerAttributes).contact_uri;
    const reserv = await client.taskrouter.v1
        .workspaces("WS3ce327462db7323629409fc47029f97d")
        .tasks(req.body.TaskSid)
        .reservations(req.body.ReservationSid)
        .update({
        instruction: "conference",
        from: "+18002779389",
        conferenceStatusCallback: `${config_1.default.siteUrl}/api/twilio/conference-events`,
        conferenceStatusCallbackEvent: [
            "start",
            "end",
            "join",
            "leave",
            "mute",
            "hold"
        ]
    });
};
exports.twilioController.postCallTask = (req, res, err) => {
    console.log(req.params);
    client.taskrouter.v1
        .workspaces("WS3ce327462db7323629409fc47029f97d")
        .tasks(req.params.TaskSid)
        .update({
        assignmentStatus: "completed",
        reason: "call is over"
    });
    res.send("ok");
};
exports.twilioController.callNumber = (req, res) => {
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    response.dial().number("+19493577693");
    console.log(response.toString());
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
    console.log(response.toString());
    exports.twilioController.callQueue(req.name, res);
};
exports.twilioController.callQueue = (req, res) => {
    const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
    const response = new VoiceResponse();
    response.dial().queue(req.name);
    console.log(response.toString());
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(response.toString());
};
exports.twilioController.token = (request, response) => {
    const ClientCapability = twilio.jwt.ClientCapability;
    const capability = new ClientCapability({
        accountSid: process.env.TWILIO_SID,
        authToken: process.env.TWILIO_TOKEN
    });
    // console.log(process.env.TWILIO_TWIML_APP_SID)
    capability.addScope(new ClientCapability.OutgoingClientScope({
        applicationSid: process.env.TWILIO_TWIML_APP_SID
    }));
    const token = capability.toJwt();
    // console.log(capability);
    // Include token in a JSON response
    response.send({
        token: token
    });
};
exports.twilioController.voice = (request, response) => {
    const VoiceResponse = twilio.twiml.VoiceResponse;
    let voiceResponse = new VoiceResponse();
    // console.log(request);
    // console.log(process.env.TWILIO_NUMBER);
    voiceResponse.dial({
        callerId: process.env.TWILIO_NUMBER
    }, request.body.number);
    response.type("text/xml");
    response.send(voiceResponse.toString());
};
//# sourceMappingURL=twilio.controller.js.map