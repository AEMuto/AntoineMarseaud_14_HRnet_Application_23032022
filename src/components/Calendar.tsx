import calendar, {
  CURRENT_DATE_STRING,
  getDateISO,
  isSameDay,
  MONTHS,
  WEEK_DAYS,
} from '../utils/calendar';
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
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>
};

/**
 * Our calendar component. It displays an interactive calendar that
 * allows the user to select a date when he clicks on one of the cell,
 * which represents a day.
 * In its core, it is a table where each row represent a week and each column
 * represent one of the day existing in a week.
 * There are controllers in the top (<CalendarHeader/>), that allows the user to easily
 * changes the month, the year or reset the date to the current date.
 * In the <CalendarBody> we map the array we get from the calendar util function,
 * and attach to each DayCell the handleSelectDay handler.
 * For understanding how we make this correct array of dates whatever the month or the year
 * see the explanations in the calendar.ts util function.
 * @param selectedDate
 * @param setSelectedDate
 * @param setCalendarVisible
 * @constructor
 */
const Calendar = ({ selectedDate, setSelectedDate, setCalendarVisible }: CalendarProps) => {
  const currentDate = new Date()
  const initialDate =
    selectedDate === 'mm/dd/yyyy' ? currentDate : getDateISO(selectedDate);

  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());

  const [calendarDisplay, setCalendarDisplay] = useState(
    _.chunk(calendar(selectedMonth + 1, selectedYear), 7),
  );

  useEffect(() => {
    setCalendarDisplay(_.chunk(calendar(selectedMonth + 1, selectedYear), 7));
  }, [selectedMonth, selectedYear]);

  // Handler for the click on a Day cell
  const handleSelectDay = (e: React.MouseEvent<HTMLElement>) => {
    const dateElements = e.currentTarget.getAttribute('data-date')?.split('-');
    if (!dateElements) return;

    const year = dateElements[0];
    const month = dateElements[1];
    const day = dateElements[2];

    setSelectedMonth(parseInt(month, 10) - 1);
    setSelectedYear(parseInt(year, 10));

    setSelectedDate(`${month}/${day}/${year}`);
    setCalendarVisible(false);
  };

  // <CalendarHeader/> handlers
  const resetDate = () => { // Triggered by clicking the Home Icon
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);

    setSelectedDate(CURRENT_DATE_STRING);

  };

  const handleNextMonth = () => { // Triggered by clicking the next arrow icon
    if (selectedMonth === 11) {
      setSelectedMonth(() => 0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handlePrevMonth = () => { // Triggered by clicking the previous arrow icon
    if (selectedMonth === 0) {
      setSelectedMonth(() => 11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
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
          selectedOption={selectedMonth}
          setSelectedOption={setSelectedMonth}
          width="106px"
          height="29px"
          margin="5px"
          padding="6px 8px"
          fontSize="0.85rem"
          fontWeight={700}
          borderRadius="0px"
        />
        <YearInput
          value={selectedYear}
          type="number"
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
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
                {week.map((day) => {
                  const date = new Date(day.join('-'));
                  const isCurrentMonth =
                    parseInt(day[1], 10) - 1 === selectedMonth;
                  const dateISO = getDateISO(selectedDate);
                  const isSelectedDate = isSameDay(date, dateISO);
                  const key = day.join('-');
                  if (isCurrentMonth) {
                    return (
                      <DayCell
                        key={key}
                        data-date={key}
                        className={isSelectedDate ? 'selected' : ''}
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
  margin-top: 0.5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: absolute;
  box-shadow: 0 6px 6px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  background-color: ${colors.white};
  z-index: 2;
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
  &.current {
    color: ${colors.secondary};
    font-weight: 700;
  }
  &.selected,
  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
    font-weight: 700;
  }
`;
