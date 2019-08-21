"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    db: {
        Url: "mongodb://localhost/seodapopCrmTest"
    },
    port: process.env.PORT,
    accounts: {
        TWILIO_TEST_SID: process.env.TWIILIO_TEST_SID,
        TWILIO_SID: process.env.TWILIO_SID,
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID
    },
    secrets: {
        JWT_SECRET: process.env.JWT_SECRET,
        TWILIO_TEST_TOKEN: process.env.TWILIO_TEST_TOKEN,
        TWILIO_TOKEN: process.env.TWILIO_TOKEN,
        FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
        SESSION_SECRET: process.env.SESSION_SECRET_TEST
    }
};
//# sourceMappingURL=test.js.map