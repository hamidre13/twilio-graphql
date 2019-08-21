"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    db: {
        Url: process.env.DEVDB
    },
    siteUrl: process.env.siteUrl,
    port: process.env.PORT,
    accounts: {
        TWILIO_TEST_SID: process.env.TWIILIO_TEST_SID,
        TWILIO_SID: process.env.TWILIO_SID,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID
    },
    secrets: {
        JWT_SECRET: process.env.JWT_SECRET,
        TWILIO_TEST_TOKEN: process.env.TWILIO_TEST_TOKEN,
        TWILIO_TOKEN: process.env.TWILIO_TOKEN,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        STRIPE_SECRET: process.env.STRIPE_SECRET,
        SESSION_SECRET: process.env.SESSION_SECRET,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET
    }
};
//# sourceMappingURL=dev.js.map