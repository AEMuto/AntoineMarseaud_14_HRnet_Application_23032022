import styled from 'styled-components';
import Calendar from './Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { colors } from '../theme/colors';
import React, { useEffect, useRef, useState } from 'react';
import { dateInputParser } from '../utils/calendar';

type DateTimePickerProps = {
  id: string;
  defaultDate: string;
  dateValue: string;
  dateSetter: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  focusHandler: React.FocusEventHandler<HTMLInputElement>
}

const DateTimePicker = ({id, defaultDate, dateSetter, dateValue, error, focusHandler}:DateTimePickerProps) => {
  const dateInput = useRef<HTMLInputElement | null>(null);

  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    // Parse input value
    const dateInput = dateInputParser(e.currentTarget.value);
    dateSetter(dateInput);
    e.currentTarget.value = dateInput;
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
    dateInput.current.value = dateValue;
  }, [dateValue]);

  return (
    <DateInputContainer>
      <DateInputWrapper className={error ? 'error' : ''}>
        <DateInput
          type="text"
          defaultValue={defaultDate}
          onBlur={handleBlur}
          onFocus={focusHandler}
          ref={dateInput}
          id={id}
        />
        <FontAwesomeIcon icon={faCalendar} onClick={handleCalendarIconClick} />
      </DateInputWrapper>
      {calendarVisible && (
        <Calendar
          selectedDate={dateValue}
          setSelectedDate={dateSetter}
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
  &.error {
    border: 1px solid ${colors.danger};
  }
`;

const DateInput = styled.input`
  font-family: monospace;
  width: 100%;
  appearance: none;
  border: none;
  outline: none;
`;
