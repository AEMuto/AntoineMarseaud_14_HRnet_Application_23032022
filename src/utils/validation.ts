import {
  DEFAULT_DATE,
  employeeForm,
  errorsType,
} from '../views/CreateEmployee';
import { USA_STATES } from './usaStates';
import {DATE_PATTERN, HAVE_SPECIAL, NAME_PATTERN, ZIPCODE_PATTERN} from './regexPatterns';

export const validateEmployee = (data: employeeForm) => {
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
  // Check if the field is empty
  if (!firstName) errors.firstName = 'Field should not be empty';
  if (!lastName) errors.lastName = 'Field should not be empty';
  if (!dateOfBirth || dateOfBirth === DEFAULT_DATE)
    errors.dateOfBirth = 'Field should not be empty';
  if (!startDate || startDate === DEFAULT_DATE)
    errors.startDate = 'Field should not be empty';
  if (!street) errors.street = 'Field should not be empty';
  if (!city) errors.city = 'Field should not be empty';
  if (!stateName) errors.stateName = 'Field should not be empty';
  if (!zipCode) errors.zipCode = 'Field should not be empty';

  // Check if the field input is valid
  console.log(!firstName?.match(NAME_PATTERN))
  if (!firstName?.match(NAME_PATTERN) && !errors.firstName)
    errors.firstName = 'Employee name should contains only alphabetic letters';
  if (!lastName?.match(NAME_PATTERN) && !errors.lastName)
    errors.lastName = 'Employee name should contains only alphabetic letters';
  if (!dateOfBirth?.match(DATE_PATTERN) && !errors.dateOfBirth)
    errors.dateOfBirth = 'Invalid date format';
  if (!startDate?.match(DATE_PATTERN) && !errors.startDate) errors.startDate = 'Invalid date format';
  if (street.match(HAVE_SPECIAL) && !errors.street) errors.street = 'Special characters are not accepted';
  if (!city?.match(NAME_PATTERN) && !errors.city)
    errors.city = 'City should contains only alphabetic letters';
  if (!USA_STATES.includes(stateName) && !errors.stateName) errors.stateName = "Must be a valid USA's state";
  if (!zipCode.match(ZIPCODE_PATTERN) && !errors.zipCode) errors.zipCode = 'Invalid zip code';

  // Return an object defining the validation state
  if (Object.entries(errors).length > 0) {
    return { isValid: false, errors: errors };
  } else {
    return { isValid: true };
  }
};
