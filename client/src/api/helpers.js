export const isInvalidPhoneNumber = (message) => message['phone_number'];

const stripNonDigits = (value) => value.replace(/\D/g, '');

export const formatUserData = ({ phoneNumber, countryCode }) => ({
  phone_number: stripNonDigits(phoneNumber.value),
  country_code: countryCode.value
});

export const formatVerificationCode = (verificationCode) => ({
  verification_code: verificationCode.value
});

export const formatErrorMessage = (errorText, { status }) => ({
  errorText,
  status
});

export const handleError = ({ response }) =>
  !response || !response.data.message
    ? { error: true, message: 'Unknown error. Please try again.' }
    : { error: true, ...response.data };
