import styled from 'styled-components';
import { colors } from '../theme/colors';
import React, {FormEvent, useEffect, useState} from 'react';
import SelectMenu from '../components/SelectMenu';
import DateTimePicker from '../components/DateTimePicker';
import { nanoid } from '@reduxjs/toolkit';
import { validateEmployee } from '../utils/validation';
import Modal from '../components/Modal';
import {useAppDispatch, useAppSelector} from '../hooks';
import { USA_STATES_DICT } from '../utils/usaStates';
import { UsaStates } from '../types/usaStates';
import { addEmployee } from '../store/appSlice';
import {setEmployees} from "../store/appThunks";
import backgroundImage from '../assets/background-01.svg'

/* Constants */
export const DEPARTMENTS = [
  { value: 0, label: 'Sales' },
  { value: 1, label: 'Marketing' },
  { value: 2, label: 'Engineering' },
  { value: 3, label: 'Human Ressources' },
  { value: 4, label: 'Legal' },
];

export const DEFAULT_DATE = 'mm/dd/yyyy';

/* Types */
export type employeeFields =
  | 'firstName'
  | 'lastName'
  | 'dateOfBirth'
  | 'startDate'
  | 'street'
  | 'city'
  | 'stateName'
  | 'zipCode'
  | 'department';

export type errorsType = {
  [key in employeeFields]?: string;
};

/**
 * View displaying the page where a user can create a new employee
 * through filling a form. Once the form inputs has been validated in
 * the submit handler, our data object representing an employee is added
 * as a new entry to the redux store employees state. Then through the hook
 * useEffect, we persist this update in the indexed DB by dispatching
 * the setEmployee action that will call an async thunk.
 * @constructor
 */
const CreateEmployee = () => {
  const dispatch = useAppDispatch();
  const { employees, employeesNeedUpdate } =
    useAppSelector((state) => state.app);

  // Internal State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(DEFAULT_DATE);
  const [startDate, setStartDate] = useState(DEFAULT_DATE);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [departmentIndex, setDepartmentIndex] = useState(0);

  const [formErrors, setFormErrors] = useState<errorsType>({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      street,
      city,
      state: stateName,
      zipCode,
      department: DEPARTMENTS[departmentIndex].label,
      id: nanoid(),
    };
    // Validate the form values
    const { isValid, errors } = validateEmployee(data);
    // Setting form errors
    if (errors) setFormErrors(errors);
    // Handling valid form
    if (isValid) {
      // Changing the state name to an abbreviation
      data.state.length > 2
        ? (data.state = USA_STATES_DICT[data.state as UsaStates])
        : '';
      // Reset the form fields
      setFirstName('');
      setLastName('');
      setDateOfBirth(DEFAULT_DATE);
      setStartDate(DEFAULT_DATE);
      setStreet('');
      setCity('');
      setStateName('');
      setZipCode('');
      setDepartmentIndex(0);
      // Show the success modal
      setModalVisible(true);

      // Dispatch the new employee entry to the store
      dispatch(addEmployee({ ...data }));
    }
  };

  const resetError: React.FocusEventHandler<HTMLInputElement> = (e) => {
    // Casting the id value of the input (id value should equal a value in the employeeFields type)
    const inputKey = e.currentTarget.id as employeeFields;
    // Access the error if there is one
    if (formErrors[inputKey]) {
      // Reset the input
      e.currentTarget.value = '';
      const tempFormErrors = formErrors;
      // Unset the error attached to the input
      tempFormErrors[inputKey] = undefined;
      setFormErrors({ ...tempFormErrors });
    }
  };

  // Persist the changes made to the employees
  useEffect(() => {
    // Indexed DB has been updated and there is an employee entry in the redux store
    if (employees.length > 0 && employeesNeedUpdate) {
      dispatch(setEmployees(employees))
    }
  }, [employees, employeesNeedUpdate])

  return (
    <PageContainer>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <p>Employee Created!</p>
      </Modal>
      <StyledForm onSubmit={handleSubmit}>
      <Title>Create Employee</Title>
        <StyledLabel htmlFor="firstName">
          First Name
          <StyledInput
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            className={formErrors.firstName ? 'error' : ''}
            onFocus={resetError}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <ErrorMessage>
            {formErrors.firstName ? formErrors.firstName : ''}
          </ErrorMessage>
        </StyledLabel>
        <StyledLabel htmlFor="lastName">
          Last Name
          <StyledInput
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            className={formErrors.lastName ? 'error' : ''}
            onFocus={resetError}
            onChange={(e) => setLastName(e.target.value)}
          />
          <ErrorMessage>
            {formErrors.lastName ? formErrors.lastName : ''}
          </ErrorMessage>
        </StyledLabel>
        <StyledLabel htmlFor="dateOfBirth">
          Date of Birth
          <DateTimePicker
            id="dateOfBirth"
            dateValue={dateOfBirth}
            dateSetter={setDateOfBirth}
            defaultDate={DEFAULT_DATE}
            error={!!formErrors.dateOfBirth}
            focusHandler={resetError}
          />
          <ErrorMessage>
            {formErrors.dateOfBirth ? formErrors.dateOfBirth : ''}
          </ErrorMessage>
        </StyledLabel>
        <StyledLabel htmlFor="department">
          Department
          <SelectMenu
            options={DEPARTMENTS}
            selectedOption={DEPARTMENTS[0].value}
            setSelectedOption={setDepartmentIndex}
            margin="8px 0px 0px 0px"
          />
          <ErrorMessage>
            {formErrors.department ? formErrors.department : ''}
          </ErrorMessage>
        </StyledLabel>
        <StyledLabel htmlFor="startDate">
          Start Date
          <DateTimePicker
            id="startDate"
            dateValue={startDate}
            dateSetter={setStartDate}
            defaultDate={DEFAULT_DATE}
            error={!!formErrors.startDate}
            focusHandler={resetError}
          />
          <ErrorMessage>
            {formErrors.startDate ? formErrors.startDate : ''}
          </ErrorMessage>
        </StyledLabel>
        {/* Address *****/}
        <StyledLabel htmlFor="street">
          Street
          <StyledInput
            type="text"
            name="street"
            id="street"
            value={street}
            className={formErrors.street ? 'error' : ''}
            onFocus={resetError}
            onChange={(e) => setStreet(e.target.value)}
          />
          <ErrorMessage>
            {formErrors.street ? formErrors.street : ''}
          </ErrorMessage>
        </StyledLabel>
        <StyledLabel htmlFor="city">
          City
          <StyledInput
            type="text"
            name="city"
            id="city"
            value={city}
            className={formErrors.city ? 'error' : ''}
            onFocus={resetError}
            onChange={(e) => setCity(e.target.value)}
          />
          <ErrorMessage>{formErrors.city ? formErrors.city : ''}</ErrorMessage>
        </StyledLabel>
        <StyledLabel htmlFor="stateName">
          State
          <StyledInput
            type="text"
            name="stateName"
            id="stateName"
            value={stateName}
            className={formErrors.stateName ? 'error' : ''}
            onFocus={resetError}
            onChange={(e) => setStateName(e.target.value)}
          />
          <ErrorMessage>
            {formErrors.stateName ? formErrors.stateName : ''}
          </ErrorMessage>
        </StyledLabel>
        <StyledLabel htmlFor="zipCode">
          Zip Code
          <StyledInput
            type="text"
            name="zipCode"
            id="zipCode"
            value={zipCode}
            className={formErrors.zipCode ? 'error' : ''}
            onFocus={resetError}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <ErrorMessage>
            {formErrors.zipCode ? formErrors.zipCode : ''}
          </ErrorMessage>
        </StyledLabel>
        <SubmitButton type="submit">Save</SubmitButton>
      </StyledForm>
    </PageContainer>
  );
};

export default CreateEmployee;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 555px) {
    background-image: url(${backgroundImage});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`

const Title = styled.h1`
  grid-area: title;
  margin: 1rem;
  justify-self: start;
`

const StyledForm = styled.form`
  display: grid;
  grid-template-areas:
    'title'
    'firstName'
    'lastName'
    'dateOfBirth'
    'department'
    'startDate'
    'street'
    'city'
    'stateName'
    'zipCode'
    'submitButton';
  place-items: center;
  
  text-align: center;
  @media (min-width: 555px) {
    text-align: left;
    grid-template-areas:
    'title title'
    'firstName lastName'
    'dateOfBirth department'
    'startDate street'
    'city stateName'
    'zipCode zipCode'
    'submitButton submitButton';
    place-items: center;
    place-content: center;
    outline: ${colors.grey} solid 1px;
    border-radius: 5px;
    padding: 1rem;
    margin: auto;
    background-color: ${colors.white};
    box-shadow: 0 6px 6px 4px rgba(0, 0, 0, 0.2);
  }
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 0.8rem;
`;

const StyledInput = styled.input`
  margin-top: 0.5rem;
  min-width: 180px;
  width: 180px;
  padding: 13.5px 12px;
  text-align: left;
  font-size: 0.85rem;
  border: 1px solid ${colors.grey};
  border-radius: 5px;
  &.error {
    border: 1px solid ${colors.danger};
  }
`;

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: ${colors.danger};
  min-height: 14px;
`;

const SubmitButton = styled.button`
  grid-area: submitButton;
  font-size: 1.2rem;
  font-weight: 550;
  padding: 0.6rem;
  border: 3px solid ${colors.primary};
  color: ${colors.dark};
  background-color: transparent;
  cursor: pointer;
  margin: 1.5rem;
  &:hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;
