import mongoose from 'mongoose'
const smsSchema = new mongoose.Schema({
	date:{
		type:String,
		required:true
	},
	service:{
		type:String
	},
	direction:{
		type:String,
		required:true
	},
	from:{
		type:String,
		required:true
	},
	to:{
		type:String,
		required:true
	},
	NumSeg:{
		type:String,
		required:true
	},
	status:{
		type:String,
		required:true
	},
	media:{
		type:String
	}
},{timestamps:true})
export const smsModel = mongoose.model('sms',smsSchema)

const callSchema = new mongoose.Schema({
	date:{
		type:String,
		required:true
	},
	direction:{
		type:String,
		required:true
	},
	from:{
		type:String,
		required:true
	},
	to:{
		type:String,
		required:true
	},
	type:{
		type:String,
		required:true
	},
	status:{
		type:String,
		required:true
	},
	recording:{
		type:String,

	},
	duration:{
		type:String,
	}
},{timestamps:true})
export const callModel = mongoose.model('call',callSchema)

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
