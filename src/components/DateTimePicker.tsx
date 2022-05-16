import styled from 'styled-components';
import Calendar from './Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { colors } from '../theme/colors';
import React, { useRef, useState } from 'react';
import * as _ from 'lodash';

const DateTimePicker = () => {
  const dateInput = React.useRef<HTMLInputElement | null>(null);
  const initialDate = new Date();
  const initialDateString = [
    _.padStart(`${initialDate.getMonth() + 1}`, 2, '0'),
    _.padStart(`${initialDate.getDate()}`, 2, '0'),
    _.padStart(`${initialDate.getFullYear()}`, 4, '0'),
  ].join('/');

  const [date, setDate] = useState('mm/dd/yyyy');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    console.log(
      'Date input unfocused, new date value is : ',
      e.currentTarget.value,
    );
    setDate(e.currentTarget.value);

  };

  const handleFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
    console.log('Date input focused : Reset default value');
    e.currentTarget.value = '';

  };

  const handleCalendarIconClick = (e:React.MouseEvent) => {
    e.preventDefault()
    if (!dateInput.current) return
    // Focus on the date input
    dateInput.current?.focus();
    // Toggle Calendar
    setCalendarVisible(!calendarVisible)

  };

  return (
    <>
      <DateInputContainer>
        <DateInput
          type="text"
          defaultValue={date}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={dateInput}
        />
        <FontAwesomeIcon icon={faCalendar} onClick={handleCalendarIconClick} />
      </DateInputContainer>
      {calendarVisible && <Calendar />}
    </>
  );
};

export default DateTimePicker;

const DateInputContainer = styled.div`
  display: inline-flex;
  align-items: center;
  margin-top: 0.5rem;
  min-width: 180px;
  width: 180px;
  padding: 13.5px 12px;
  text-align: left;
  font-size: 0.85rem;
  border: 1px solid ${colors.grey};
  border-radius: 5px;
  &:focus-within {
    outline-offset: 0;
    outline: rgb(16, 16, 16) auto 1px;
  }
`;

const DateInput = styled.input`
  font-family: monospace;
  width: 100%;
  appearance: none;
  border: none;
  outline: none;
`;
