import styled from 'styled-components';
import { colors } from '../theme/colors';
import React, { FormEvent, useState } from 'react';
import SelectMenu from '../components/SelectMenu';
import Calendar from "../components/Calendar";

const CreateEmployee = () => {
  const departments = [
    { value: 0, label: 'Sales' },
    { value: 1, label: 'Marketing' },
    { value: 2, label: 'Engineering' },
    { value: 3, label: 'Human Ressources' },
    { value: 4, label: 'Legal' },
  ];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [startDay, setStartDay] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [zipCode, setZipCode] = useState(0);
  const [department, setDepartment] = useState(departments[0].value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate Inputs. Make a validation function.
    // Switch through each input and validate them
    // thanks to regex. Return an error object where each keys
    // represent an input, and the pair value contains the error message.
    // If and only if there is no mistakes, we can pass the inputs value
    // to...
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Create Employee</h1>
      <Calendar />
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="firstName">
          First Name
          <StyledInput
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </StyledLabel>
        <StyledLabel htmlFor="lastName">
          Last Name
          <StyledInput
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </StyledLabel>
        <StyledLabel htmlFor="dateOfBirth">
          Date of Birth
          <StyledInput
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />
        </StyledLabel>
        <StyledLabel htmlFor="department">
          Department
          <SelectMenu
            options={departments}
            selectedOption={departments[0].value}
            setSelectedOption={setDepartment}
          />
        </StyledLabel>
        <StyledLabel htmlFor="startDate">
          Start Date
          <StyledInput
            type="date"
            name="startDate"
            id="startDate"
            value={startDay}
            onChange={(e) => setStartDay(e.target.value)}
          />
        </StyledLabel>
        {/* Address *****/}
        <StyledLabel htmlFor="street">
          Street
          <StyledInput
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </StyledLabel>
        <StyledLabel htmlFor="city">
          City
          <StyledInput
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </StyledLabel>
        <StyledLabel htmlFor="state">
          State
          <StyledInput
            type="text"
            name="state"
            id="state"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
        </StyledLabel>
        <StyledLabel htmlFor="zipCode">
          Zip Code
          <StyledInput
            type="number"
            name="zipCode"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(+e.target.value)}
          />
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
  border: 1px solid #bbb;
  border-radius: 5px;
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
