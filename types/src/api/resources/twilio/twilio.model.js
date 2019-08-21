"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const smsSchema = new mongoose_1.default.Schema({
    date: {
        type: String,
        required: true
    },
    service: {
        type: String
    },
    direction: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    NumSeg: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    media: {
        type: String
    }
}, { timestamps: true });
exports.smsModel = mongoose_1.default.model('sms', smsSchema);
const callSchema = new mongoose_1.default.Schema({
    date: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    recording: {
        type: String,
    },
    duration: {
        type: String,
    }
}, { timestamps: true });
exports.callModel = mongoose_1.default.model('call', callSchema);
// const twilioSchema = new mongoose.Schema({
// 	date:{
// 		type:String,
// 		required:true
// 	},
// 	direction:{
// 		type:String,
// 		required:true
// 	},
// 	from:{
// 		type:String,
// 		required:true
// 	},
// 	to:{
// 		type:String,
// 		required:true
// 	},
// 	content:{
// 		type:String,
// 		required:true
// 	}
// },{timestamps:true})
// export const twilioModel = mongoose.model('twilio',twilioSchema)
//# sourceMappingURL=twilio.model.js.map