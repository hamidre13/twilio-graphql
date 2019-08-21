"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    db: {
        Url: process.env.DB,
    },
    siteUrl: process.env.siteUrl,
    port: process.env.PORT,
    accounts: {
        TWILIO_TEST_SID: process.env.TWIILIO_TEST_SID,
        TWILIO_SID: process.env.TWILIO_SID
    },
    secrets: {
        JWT_SECRET: process.env.JWT_SECRET,
        TWILIO_TEST_TOKEN: process.env.TWILIO_TEST_TOKEN,
        TWILIO_TOKEN: process.env.TWILIO_TOKEN
    }
};
//# sourceMappingURL=prod.js.map