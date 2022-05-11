import calendar, { MONTHS, WEEK_DAYS } from '../utils/calendar';
import * as _ from 'lodash'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretLeft,
  faCaretRight,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import SelectMenu from './SelectMenu';
import { colors } from '../theme/colors';

const Calendar = () => {
  const initialDate = new Date()
  const [day, setDay] = useState(initialDate.getDay());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [year, setYear] = useState(initialDate.getFullYear());
  const [calendarDisplay, setCalendarDisplay] = useState(_.chunk(calendar(month + 1, year),7));
  console.table(calendarDisplay)

  useEffect(() => {
    setCalendarDisplay(_.chunk(calendar(month + 1, year),7))
  },[month, year])

  useEffect(() => {
    console.table(calendarDisplay)
  },[calendarDisplay])

  const resetDate = () => {
    setDay(initialDate.getDay())
    setMonth(initialDate.getMonth())
    setYear(initialDate.getFullYear())
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(() => 0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(() => 11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <FontAwesomeIcon icon={faCaretLeft} size="lg" cursor="pointer" onClick={handlePrevMonth}/>
        <FontAwesomeIcon icon={faHouse} cursor="pointer" onClick={resetDate} />
        <SelectMenu
          options={MONTHS}
          selectedOption={month}
          setSelectedOption={setMonth}
          width="120px"
          height="32px"
          margin="5px"
          padding="6px 8px"
          fontSize="1rem"
          fontWeight={700}
          borderRadius="0px"
        />
        <YearInput
          value={year}
          type="number"
          onChange={(e) => setYear(parseInt(e.target.value, 10))}
        />
        <FontAwesomeIcon icon={faCaretRight} size="lg" cursor="pointer" onClick={handleNextMonth}/>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {WEEK_DAYS.map((day, index) => {
              return <th key={`${index}-${day.label}`}>{day.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
        {calendarDisplay.map((week,index) => {
          return <tr key={`week-${index}`}>{
            week.map((day,index) => {
              return <td key={`day-${day[1]}`}>{day[1]}</td>
            })
          }</tr>
        })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
`;

const YearInput = styled.input`
  appearance: none;
  width: 80px;
  height: 32px;
  margin: 5px;
  padding: 6px 8px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0;
  border: 1px solid ${colors.grey};
  &:focus {
    border: 1px solid ${colors.primary};
    outline: 1px solid ${colors.primary};
  }
`;

const CalendarBody = styled.table`
  
`;
