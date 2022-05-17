import styled from 'styled-components';
import Calendar from './Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { colors } from '../theme/colors';
import React, { useEffect, useRef, useState } from 'react';
import { dateInputParser } from '../utils/validation';

const DateTimePicker = () => {
  const dateInput = useRef<HTMLInputElement | null>(null);

  const [selectedDate, setSelectedDate] = useState('mm/dd/yyyy');
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    // Parse input value
    const dateInput = dateInputParser(e.currentTarget.value);
    setSelectedDate(dateInput);
    e.currentTarget.value = dateInput;
  };

  const handleFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
    // Reset default value if present
    if (e.currentTarget.value === 'mm/dd/yyyy') e.currentTarget.value = '';
    // Otherwise, do nothing
    else return;
  };

  const handleCalendarIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!dateInput.current) return;
    // Focus on the date input
    dateInput.current?.focus();
    // Toggle Calendar
    setCalendarVisible(!calendarVisible);
  };

  useEffect(() => {
    if (!dateInput.current) return;
    dateInput.current.value = selectedDate;
  }, [selectedDate]);

  return (
    <DateInputContainer>
      <DateInputWrapper>
        <DateInput
          type="text"
          defaultValue={selectedDate}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={dateInput}
        />
        <FontAwesomeIcon icon={faCalendar} onClick={handleCalendarIconClick} />
      </DateInputWrapper>
      {calendarVisible && (
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setCalendarVisible={setCalendarVisible}
        />
      )}
    </DateInputContainer>
  );
};

export default DateTimePicker;

const DateInputContainer = styled.div`
  position: relative;
`;

const DateInputWrapper = styled.div`
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
