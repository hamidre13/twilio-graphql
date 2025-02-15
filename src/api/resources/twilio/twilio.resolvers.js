import _ from "lodash";
import Twilio from "twilio";
import randomstring from "randomstring";
import config from "../../../config";
import { twilioController } from "./twilio.controller";

import { unauthorizedAccessError } from "../error";

const client = Twilio(config.accounts.TWILIO_SID, config.secrets.TWILIO_TOKEN);
const searchNumberLocal = async (_, args, ctx, info) => {
  const nums = await client
    .availablePhoneNumbers("US")
    .local.list(args.input)
    .then(data => {
      return data;
    });
  return nums;
};
const searchNumberTollFree = async (_, args, ctx, info) => {
  if (!(await authCheckGraph(ctx.req, 4))) throw new unauthorizedAccessError();
  const nums = await client
    .availablePhoneNumbers("US")
    .tollFree.list(args.input)
    .then(data => {
      return data;
    });
  return nums;
};
const getNumber = async (_, args, ctx, info) => {
  try {
    const num = await client.incomingPhoneNumbers.create({
      phoneNumber: args.input.number
    });
    console.log(num);
    if (num.phoneNumber) return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const deleteNumber = async (_, args, ctx, info) => {
  try {
    client
      .incomingPhoneNumbers(args.input.sid)
      .remove()
      .then(incoming_phone_number => console.log(incoming_phone_number.sid))
      .done();
    return true;
  } catch (e) {
    return false;
  }
};
export const createTwilioSubAccount = async name => {
  const client = new Twilio(
    config.accounts.TWILIO_SID,
    config.secrets.TWILIO_TOKEN
  );
  return await client.api.accounts.create({ friendlyName: name });
};
const makeCall = async (_, args, context, info) => {
  //TODO:verify the input args values
  //verifyUser(context.user)
  const twimlObj = {};
  const random = randomstring.generate();
  twimlObj.random = random;
  twimlObj.url = config.siteUrl + "api/twilio/twiml/" + random;

  const VoiceResponse = Twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  const dial = response.dial({
    callerId: args.input.callerId,
    action: config.siteUrl + "api/twilio/cleantwiml/" + random
  });
  twimlObj.value = response;
  dial.number(args.input.to);
  twilioController.createTwiml(twimlObj);
  console.log(twimlObj.url);
  client.calls
    .create({
      url: twimlObj.url,
      from: args.input.callerId,
      to: args.input.from
    })
    .then(call => console.log(call.sid))
    .done();
};

const makeSms = async (_, args, ctx, info) => {
  const smsObj = await twilioController.createTwiml(
    args.input.to,
    args.input.senderId
  );
};

async function asyncForEach(array, callBack) {
  for (let index = 0; index < array.length; index++) {
    await callBack(array[index], index, array);
  }
}
const getRecordingsForCalls = async calls => {
  for (let i = 0; i < calls.length; i++) {
    await client.recordings.list({ callSid: calls[i].sid }).then(records => {
      if (records.length > 0)
        calls[i].recording_url = records[0].uri.replace(".json", ".wave");
      else calls[i].recording_url = "";
    });
  }
  return calls;
};
const getCallLog = async (no_, args, ctx, info) => {
  let callLog = {};
  callLog._payload = {};
  callLog._payload.calls = [];
  if (args.input && args.input.sid) {
    await client
      .calls(args.input.sid)
      .fetch()
      .then(call => callLog._payload.calls.push(call))
      .done();
  } else {
    // await client.calls.each(args.input, call => callLog.push(call));
    if (args.input.getPage) {
      callLog = await client.calls.getPage(
        "https://api.twilio.com" + args.input.url
      );
    } else {
      callLog = await client.calls.page(args.input);
    }
  }
  const result = callLog._payload;
  result.calls = await getRecordingsForCalls(result.calls);

  return result;
};
const listNumbers = async (_, args, context, info) => {
  try {
    const nums = await client.incomingPhoneNumbers.list();
    return nums;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const createWorkspace = async (_, args, ctx, info) => {};
const getRecording = async (no_, args, ctx, info) => {
  let recordingLog = await client.recordings.list();
  if (args.input) {
    recordingLog = _.filter(recordingLog, args.input);
  }
  return recordingLog;
};
const getAllSubAccounts = async (_, args, ctx, info) => {
  const res = {
    limit: 0,
    offset: 0,
    subAccountsArray: []
  };
  let flag = true;
  await client.api.accounts.list(args.input).then(accounts => {
    res.subAccountsArray = accounts;
  });
  return res;
};
const changeSubAccountStatus = async (_, args, ctx, info) => {
  const res = await client.api
    .accounts(args.input.sid)
    .update({ status: args.input.status });
  console.log(res);
  return res;
};
const getSubAccountUSage = async (_, args, ctx, info) => {
  //TODO
};
export const twilioResolvers = {
  Query: {
    makeCall,
    makeSms,
    getCallLog,
    getRecording,
    getNumber,
    searchNumberLocal,
    searchNumberTollFree,
    deleteNumber,
    listNumbers,
    getAllSubAccounts
  }
};
