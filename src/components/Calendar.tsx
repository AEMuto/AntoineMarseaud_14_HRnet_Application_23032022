import calendar, { isSameDay, MONTHS, WEEK_DAYS } from '../utils/calendar';
import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import SelectMenu from './SelectMenu';
import { colors } from '../theme/colors';

type CalendarProps = {
  selectedDate: Date
}

const Calendar = ({selectedDate}:CalendarProps) => {
  const initialDate = new Date();
  const [currentDate, setCurrentDate] = useState()
  const [currentDay, setCurrentDay] = useState(initialDate.getDate());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [calendarDisplay, setCalendarDisplay] = useState(
    _.chunk(calendar(currentMonth + 1, currentYear), 7),
  );
  //console.table(calendarDisplay);

  useEffect(() => {
    setCalendarDisplay(_.chunk(calendar(currentMonth + 1, currentYear), 7));
  }, [currentMonth, currentYear]);

  useEffect(() => {
    //console.table(calendarDisplay);
  }, [calendarDisplay]);

  const handleSelectDay = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.getAttribute('data-date'));
  };

  const resetDate = () => {
    setCurrentDay(initialDate.getDay());
    setCurrentMonth(initialDate.getMonth());
    setCurrentYear(initialDate.getFullYear());
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(() => 0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(() => 11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="lg"
          cursor="pointer"
          className="icon-arrow-left"
          onClick={handlePrevMonth}
        />
        <FontAwesomeIcon
          icon={faHouse}
          cursor="pointer"
          onClick={resetDate}
          className="icon-home"
        />
        <SelectMenu
          options={MONTHS}
          selectedOption={currentMonth}
          setSelectedOption={setCurrentMonth}
          width="106px"
          height="29px"
          margin="5px"
          padding="6px 8px"
          fontSize="0.85rem"
          fontWeight={700}
          borderRadius="0px"
        />
        <YearInput
          value={currentYear}
          type="number"
          onChange={(e) => setCurrentYear(parseInt(e.target.value, 10))}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          size="lg"
          cursor="pointer"
          className="icon-arrow-right"
          onClick={handleNextMonth}
        />
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {WEEK_DAYS.map((day, index) => {
              return (
                <WeekHeading key={`${index}-${day.label}`}>
                  {day.label}
                </WeekHeading>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {calendarDisplay.map((week, index) => {
            return (
              <WeekRow key={`week-${index}`}>
                {week.map((day, index) => {
                  const date = new Date(day.join('-'));
                  const isCurrentMonth =
                    parseInt(day[1], 10) - 1 === currentMonth;
                  const isCurrentDay = isSameDay(date, initialDate);
                  const key = day.join('-');
                  if (isCurrentMonth) {
                    return (
                      <DayCell
                        key={key}
                        data-date={key}
                        className={isCurrentDay ? 'active' : ''}
                        onClick={handleSelectDay}>
                        {day[2]}
                      </DayCell>
                    );
                  } else {
                    return (
                      <DayCell
                        key={key}
                        data-date={key}
                        className="inactive"
                        onClick={handleSelectDay}>
                        {day[2]}
                      </DayCell>
                    );
                  }
                })}
              </WeekRow>
            );
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon-home:hover,
  .icon-arrow-left:hover,
  .icon-arrow-right:hover {
    color: ${colors.primary};
  }
`;

const WeekHeading = styled.th`
  font-size: 0.85rem;
  line-height: 2;
  font-weight: 500;
  min-width: 37px;
  padding: 3px;
`;

const YearInput = styled.input`
  appearance: none;
  width: 80px;
  height: 29px;
  margin: 5px;
  padding: 6px 8px;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 0;
  border: 1px solid ${colors.grey};
  &:focus {
    border: 1px solid ${colors.primary};
    outline: 1px solid ${colors.primary};
  }
`;

const CalendarBody = styled.table`
  border-collapse: separate;
`;

const WeekRow = styled.tr``;

const DayCell = styled.td`
  cursor: pointer;
  height: 37px;
  font-size: 0.8rem;
  text-align: center;
  border-radius: 50%;
  padding: 4px;
  &.inactive {
    color: ${colors.grey};
  }
  &.active,
  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
    font-weight: 700;
  }
`;
