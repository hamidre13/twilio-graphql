"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_errors_1 = require("apollo-errors");
exports.WrongCredentialsError = apollo_errors_1.createError('WrongCredentialsError', {
    message: 'The provided credentials are invalid.'
});
exports.tokenExpiredError = apollo_errors_1.createError('TokenExpiredError', {
    message: 'Your seesion is expired.'
});
exports.unauthorizedAccessError = apollo_errors_1.createError('unauthorizedAccessError', {
    message: 'unauthorized'
});
exports.noOptionFoundError = apollo_errors_1.createError('optionNOtFoundError', {
    message: 'There is no option with provided Id'
});
exports.noUserFoundError = apollo_errors_1.createError('userNOtFoundError', {
    message: 'There is no user with provided user-name'
});
exports.noAccountFoundError = apollo_errors_1.createError('AccountNOtFoundError', {
    message: 'There is no account with provided info'
});
exports.noProductFoundError = apollo_errors_1.createError('ProductNOtFoundError', {
    message: 'There is no product with provided info'
});
exports.incorrectEmailError = apollo_errors_1.createError('incorrectEmailError', {
    message: 'Provided email is not correct'
});
//# sourceMappingURL=index.js.map