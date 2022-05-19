import styled from 'styled-components';
import { colors } from '../theme/colors';
import React, { FormEvent, useEffect, useState } from 'react';
import SelectMenu from '../components/SelectMenu';
import DateTimePicker from '../components/DateTimePicker';
import { nanoid } from '@reduxjs/toolkit';
import { validateEmployee } from '../utils/validation';

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

export type employeeForm = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  street: string;
  city: string;
  stateName: string;
  zipCode: string;
  department?: string;
};

export type errorsType = {
  [key in employeeFields]?: string;
};

const CreateEmployee = () => {
  const uuid = nanoid();
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate Inputs. Make a validation function.
    // Switch through each input and validate them
    // thanks to regex. Return an error object where each keys
    // represent an input, and the pair value contains the error message.
    // If and only if there is no mistakes, we can pass the inputs value
    // to...
    const data = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      street,
      city,
      stateName,
      zipCode,
    };
    const { isValid, errors } = validateEmployee(data);
    if (errors) setFormErrors(errors);
    // Validation

  };

  const resetError: React.FocusEventHandler<HTMLInputElement> = (e) => {
    // Reset date default value if present
    if (e.currentTarget.value === DEFAULT_DATE) e.currentTarget.value = '';
    // Delete the error attached to the input
    const inputKey = e.currentTarget.id as employeeFields
    console.log(formErrors[inputKey])
    if (formErrors[inputKey]) {
      const tempFormErrors = formErrors
      tempFormErrors[inputKey] = undefined
      setFormErrors({...tempFormErrors})
    }
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Create Employee</h1>
      <StyledForm onSubmit={handleSubmit}>
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
    </>
  );
};

export default CreateEmployee;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 550;
  padding: 0.6rem;
  border: 3px solid ${colors.primary};
  color: ${colors.dark};
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;
