import { createError } from 'apollo-errors';

export const WrongCredentialsError = createError('WrongCredentialsError', {
  message: 'The provided credentials are invalid.'
});

export const tokenExpiredError = createError('TokenExpiredError', {
  message: 'Your seesion is expired.'
});
export const unauthorizedAccessError = createError('unauthorizedAccessError', {
  message: 'unauthorized'
});

export const noOptionFoundError = createError('optionNOtFoundError', {
  message: 'There is no option with provided Id'
});
export const noUserFoundError = createError('userNOtFoundError', {
  message: 'There is no user with provided user-name'
});
export const noAccountFoundError = createError('AccountNOtFoundError', {
  message: 'There is no account with provided info'
});
export const noProductFoundError = createError('ProductNOtFoundError', {
  message: 'There is no product with provided info'
});
export const incorrectEmailError = createError('incorrectEmailError', {
  message: 'Provided email is not correct'
});
