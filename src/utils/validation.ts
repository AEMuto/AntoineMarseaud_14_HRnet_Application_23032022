import { DEFAULT_DATE, errorsType } from '../views/CreateEmployee';
import { USA_STATES } from './usaStates';
import {
  DATE_PATTERN,
  HAVE_SPECIAL,
  NAME_PATTERN,
  ZIPCODE_PATTERN,
} from './regexPatterns';
import getYearDuration from './getYearDuration';
import { getDateISO } from './calendar';

/**
 * Function that validate the form in the CreateEmployee view.
 * It checks each entry of the data object we pass as an argument.
 * It returns an object containing a 'isValid' key which is a boolean
 * indicating whether the form is valid or not. In the case there is an
 * error, it also returns an error message value where its key is the
 * corresponding input where the error was found.
 * @param data
 */
export const validateEmployee = (data: { [key: string]: string }) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    startDate,
    street,
    city,
    stateName,
    zipCode,
  } = data;

  const errors: errorsType = {};
  // Check if the fields are empty
  for (let key in data) {
    if (!data[key] || data[key] === DEFAULT_DATE)
      errors[key] = 'Field should not be empty';
  }

  // Check if the field input is valid
  if (!firstName?.match(NAME_PATTERN) && !errors.firstName)
    errors.firstName = 'Employee name should contains only alphabetic letters';
  if (!lastName?.match(NAME_PATTERN) && !errors.lastName)
    errors.lastName = 'Employee name should contains only alphabetic letters';
  if (!dateOfBirth?.match(DATE_PATTERN) && !errors.dateOfBirth)
    errors.dateOfBirth = 'Invalid date format';
  if (!startDate?.match(DATE_PATTERN) && !errors.startDate)
    errors.startDate = 'Invalid date format';
  if (street.match(HAVE_SPECIAL) && !errors.street)
    errors.street = 'Special characters are not accepted';
  if (!city?.match(NAME_PATTERN) && !errors.city)
    errors.city = 'City should contains only alphabetic letters';
  if (!USA_STATES.includes(stateName) && !errors.stateName)
    errors.stateName = "Must be a valid USA's state";
  if (!zipCode.match(ZIPCODE_PATTERN) && !errors.zipCode)
    errors.zipCode = 'Invalid zip code';

  // Verify the date inputs
  if (!errors.dateOfBirth) {
    const age = getYearDuration(getDateISO(dateOfBirth));
    if (age < 18) errors.dateOfBirth = 'Not old enough to be an employee';
    if (age > 65) errors.dateOfBirth = 'This person should be in retirement';
  }

  if (!errors.startDate) {
    const duration = getYearDuration(getDateISO(startDate));
    if (duration > 20)
      errors.startDate = 'The company did not exist at this time';
    if (duration < 0)
      errors.startDate = 'The company cannot recruit into the future';
  }

  // Return an object defining the validation state
  if (Object.entries(errors).length > 0) {
    return { isValid: false, errors: errors };
  } else {
    return { isValid: true };
  }
};
