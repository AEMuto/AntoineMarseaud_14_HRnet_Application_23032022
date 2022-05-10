import calendar, {
  getYearsRange,
  MONTHS,
  WEEK_DAYS,
  YEARS,
} from '../utils/calendar';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretLeft,
  faCaretRight,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import SelectMenu from './SelectMenu';

const Calendar = () => {
  const [day, setDay] = useState(new Date().getDay());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarDisplay, setCalendarDisplay] = useState();
  console.log('Month is: ', MONTHS[month - 1].value, MONTHS[month - 1].label);
  console.table(getYearsRange());

  // console.log(calendar(5, 2022));
  return (
    <CalendarContainer>
      <CalendarHeader>
      <FontAwesomeIcon icon={faCaretLeft} size="lg" />
      <FontAwesomeIcon icon={faHouse} />
      <SelectMenu
        options={MONTHS}
        selectedOption={MONTHS[month - 2].value}
        setSelectedOption={setMonth}
        width="112px"
      />
      <SelectMenu
        options={YEARS}
        selectedOption={72}
        setSelectedOption={setYear}
        width="80px"
      />
      <FontAwesomeIcon icon={faCaretRight} size="lg" />
      </CalendarHeader>
      <CalendarBody>
        <thead>
        <tr>
          {WEEK_DAYS.map((day,index) => {
            return <th key={`${index}-${day.label}`}>{day.label}</th>
          })}
        </tr>
        </thead>
        <tbody>

        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
`

const CalendarBody = styled.table`

`