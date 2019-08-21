export default {
  siteUrl: process.env.siteUrl,
  port: process.env.PORT,
  accounts: {
    TWILIO_TEST_SID: process.env.TWIILIO_TEST_SID,
    TWILIO_SID: process.env.TWILIO_SID
  },
  secrets: {
    TWILIO_TEST_TOKEN: process.env.TWILIO_TEST_TOKEN,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN
  }
};
