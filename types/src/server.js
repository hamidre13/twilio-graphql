"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const api_1 = require("./api");
const config_1 = __importDefault(require("./config"));
const auth_controller_1 = require("./api/resources/auth/auth.controller");
if (process.env.NODE_ENV !== "test") {
    console.log("Db url is:" + config_1.default.db.Url);
}
exports.mongoConfig = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
};
mongoose_1.default.connect(config_1.default.db.Url, exports.mongoConfig);
const app = express_1.default();
/** cors will let use use cross origin cookies for this specisific url*/
app.use(cors_1.default({ origin: "http://localhost:8080", credentials: true }));
app.use(express_session_1.default({
    secret: config_1.default.secrets.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    }
}));
// initialize passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
/** This file has to be changed with our react app*/
app.get("/", function (req, res) {
    res.sendFile("index.html", { root: __dirname + "/public" });
});
/**In playground we have to set the credential as same-origin
    https://github.com/prisma/graphql-playground/issues/748#issuecomment-412524510
*/
app.use("/api", api_1.restRouter);
/* In dev mode docs is available, but in production you will have to login*/
const gqlPath = "/graphql";
if (process.env.NODE_ENV === "development") {
    app.use(gqlPath, auth_controller_1.authCheck);
}
api_1.graphQLServer.applyMiddleware({
    app,
    path: gqlPath
});
exports.default = app;
//# sourceMappingURL=server.js.map