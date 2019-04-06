import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { create } from 'domain';


const utcMoment = moment.utc;

const SHORT_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getCurrMonth() {
  return new Date(Date.now()).getMonth();
}

function getCurrYear() {
  return new Date(Date.now()).getFullYear();
}

function getLastMonthDate(month, year) {
  return (new Date(year, month + 1, 0)).getDate();
}

function numToMonth(num) {
  return MONTH_NAMES[num];
}

function getMonthStartWeekday(month, year) {
  return new Date(year, month).getDay();
}

function createDate(year, month, day) {
  const strYear = `${year}`;
  const strMonth = month >= 10 ? `${month + 1}` : `0${month + 1}`;
  const strDay = day >= 10 ? `${day}` : `0${day}`;
  return utcMoment(`${strYear}-${strMonth}-${strDay}`);
}

const CalendarBox = styled.div`
  color: palevioletred;
  padding: 0.25em 0.25em;
  text-align: center;
`;
const TableD = styled.td`
  border: 1px solid green;
  width: 42px; height:42px; 
  background: pink;
  &:hover{
    background-color: blue;
  }
`;

const ArrowSpan = styled.span`
  flex-grow: 1;
  text-align: center;
  border: 1px solid black;
  border-radius: 3px;
  padding-top: 3px;
  padding-bottom: 3px;
`;
const MonthSpan = styled.span`
  flex-grow: 8;
  text-align: center;
`;


const Head = styled.th`
  width: 14%;
  background-color:green;
`;
const Table = styled.table`
  background-color:orange;
  width:100%;
  padding:0px;
  border-collapse: collapse;
`;
const TopRow = styled.span`
  display: flex;
  flex-direction: row;
`;
const TableHolder = styled.div`
  background-color:blue;
  width: 300px;
  padding: 20px;
  border-radius: 3px;

`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { month: getCurrMonth(), year: getCurrYear() };
  }

  nextMonth() {
    this.setState((prevState) => {
      let { month, year } = prevState;
      if (month === 11) {
        month = 0;
        year += 1;
      } else {
        month += 1;
      }
      return { month, year };
    });
  }

  lastMonth() {
    this.setState((prevState) => {
      let { month, year } = prevState;
      if (month === 0) {
        month = 11;
        year -= 1;
      } else {
        month -= 1;
      }
      return { month, year };
    });
  }



  render() {
    const { year, month, hovered } = this.state;
    const { inputDate } = this.props;
    const monthName = numToMonth(month);
    let date = 1;
    const lastDay = getLastMonthDate(month, year);
    const firstDay = getMonthStartWeekday(month, year);
    const table = [];
    let emptyNum = -1;

    while (date <= lastDay) {
      const week = [];
      for (let i = 0; i < 7; i += 1) {
        if ((date === 1 && i < firstDay) || date > lastDay) {
          week.push(<td key={emptyNum} />);
          emptyNum -= 1;
        } else {
          const myDate = date;
          week.push(
            <TableD key={myDate}>
              <CalendarBox
                key={myDate}
                className="a-date"
                onClick={() => {
                  inputDate(createDate(year, month, myDate));
                }
                }
              >
                {myDate}
              </CalendarBox>
            </TableD>,
          );
          date += 1;
        }
      }
      table.push(week);
    }
    return (
      <TableHolder>
        <TopRow>
          <ArrowSpan className="lastMonth" onClick={() => this.lastMonth()}>&lt;</ArrowSpan>
          <MonthSpan className="calTitleSpan">
            {monthName}
            {' '}
            {year}
          </MonthSpan>
          <ArrowSpan className="nextMonth" onClick={() => this.nextMonth()}>&gt;</ArrowSpan>
        </TopRow>
        <Table>
          <tbody>
            <tr key="header">
              {SHORT_DAY_NAMES.map(val => <Head key={val}>{val}</Head>)}
            </tr>
            {table.map((week, i) => <tr key={`weekRow:${i}`}>{week.map(val => val)}</tr>)}
          </tbody>
        </Table>
      </TableHolder>
    );
  }
}

export default Calendar;
