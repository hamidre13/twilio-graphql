import { readFileSync } from 'fs'
//For some reason it does not consider it as js!
export const twilioType =  readFileSync(__dirname + '/twilio.graphql', 'utf8')
//export * from './twilio.graphql'
export {twilioResolvers } from './twilio.resolvers'
