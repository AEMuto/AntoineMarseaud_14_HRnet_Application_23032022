import { DATE_PATTERN } from './calendar';
import { DEFAULT_DATE } from '../views/CreateEmployee';
import { USA_STATES } from './usaStates';

export const NAME_PATTERN = new RegExp('/\\p{Alphabetic}{2,}/', 'gu');
export const ZIPCODE_PATTERN = new RegExp('/(^\d{4}?\d$|^\d{4}?\d-\d{4}$)/','gm')

type employeeFields =
  | 'firstName'
  | 'lastName'
  | 'dateOfBirth'
  | 'startDate'
  | 'street'
  | 'city'
  | 'state'
  | 'zipCode'
  | 'department';

type employeeForm = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
};

type errorsType = {
  [key in employeeFields]?: string;
};

export const validateEmployee = (data: employeeForm) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    startDate,
    street,
    city,
    state,
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
  if (!state) errors.state = 'Field should not be empty';
  if (!zipCode) errors.zipCode = 'Field should not be empty';

	// Check if the field input is valid
  if (!firstName?.match(NAME_PATTERN))
    errors.firstName = 'Employee name should contains only alphabetic letters';
  if (!lastName?.match(NAME_PATTERN))
    errors.lastName = 'Employee name should contains only alphabetic letters';
  if (!dateOfBirth?.match(DATE_PATTERN))
    errors.dateOfBirth = 'Invalid date format';
  if (!startDate?.match(DATE_PATTERN)) errors.startDate = 'Invalid date format';
  if (!city?.match(NAME_PATTERN))
    errors.city = 'City should contains only alphabetic letters';
  if (!USA_STATES.includes(state))
    errors.state = "Must be a valid USA's state";
	if (!zipCode.match(ZIPCODE_PATTERN)) errors.zipCode = 'Invalid zip code';

};
