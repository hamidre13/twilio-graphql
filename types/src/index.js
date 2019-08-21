"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./config"));
const server_1 = __importDefault(require("./server"));
const server = http_1.default.createServer(server_1.default);
let currentApp = server_1.default;
server.listen(config_1.default.port, () => {
    console.log('server listening on port ' + config_1.default.port);
});
if (module.hot) {
    module.hot.accept(['./server'], () => {
        server.removeListener('request', currentApp);
        server.on('request', server_1.default);
        currentApp = server_1.default;
    });
}
//# sourceMappingURL=index.js.map