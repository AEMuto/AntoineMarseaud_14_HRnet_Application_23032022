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
  focusHandler: React.FocusEventHandler<HTMLInputElement>;
};

/**
 * Our Date Picker component. It emulates the features presents on the
 * original jquery plugin that we were using.
 * It contains an input allowing the user
 * to manually enter a date. When the focus on the input is lost,
 * the input value is then passed to the util function dateInputParser
 * which will correct the input if there is an error (meaning that the value is
 * either of the wrong format - not following the mm/dd/yyyy pattern - or is
 * an invalid date - 45/99/0001).
 * A calendar icon is present. It allows the user to set a date by using an interactive
 * calendar, when he clicks on it. See the <Calendar /> component for more explanations.
 * @param id
 * @param defaultDate
 * @param dateSetter
 * @param dateValue
 * @param error
 * @param focusHandler
 * @constructor
 */
const DateTimePicker = ({
  id,
  defaultDate,
  dateSetter,
  dateValue,
  error,
  focusHandler,
}: DateTimePickerProps) => {

  // Reference for the <DateInput />. It is needed for knowing
  // if it is focused or not.
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    // Parse input value
    const dateInput = dateInputParser(e.currentTarget.value);
    dateSetter(dateInput);
    e.currentTarget.value = dateInput;
  };

  const handleCalendarIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!dateInputRef.current) return;
    // Focus on the date input
    dateInputRef.current?.focus();
    // Toggle Calendar visibility
    setCalendarVisible(!calendarVisible);
  };

  // We need to set the DateInput value to the current value when it is updated
  // by using the interactive calendar.
  useEffect(() => {
    if (!dateInputRef.current) return;
    dateInputRef.current.value = dateValue;
  }, [dateValue]);

  return (
    <DateInputContainer>
      <DateInputWrapper className={error ? 'error' : ''}>
        <DateInput
          type="text"
          defaultValue={defaultDate}
          onBlur={handleBlur}
          onFocus={focusHandler}
          ref={dateInputRef}
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
