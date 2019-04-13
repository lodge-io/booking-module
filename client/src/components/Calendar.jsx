
import moment from 'moment';

const { React } = window;

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
  padding: 0.25em 0.25em;
  text-align: center;
`;
const TableD = styled.td`
  border: 1px solid #EBEBEB;
  width: 42px; height:42px;
  background-color: white;  
  &:hover{
    background-color: #00A699;
  }
`;
TableD.displayName = 'TableD';

const TableDDisabled = styled.td`
  border: 1px solid #EBEBEB;
  width: 42px; height:42px;
  color: #D8D8D8;
`;
TableDDisabled.displayName = 'TableDDisabled';

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
`;
const Table = styled.table`
  width:100%;
  padding:0px;
  border-collapse: collapse;
`;
const TopRow = styled.span`
  display: flex;
  flex-direction: row;
`;
const TableHolder = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 3px;
  user-select: none;
`;

const CalendarDate = ({ year, month, date, available, inputDate, selecting }) => {
  if (available) {
    return (
      <TableD key={date}>
        <CalendarBox
          key={date}
          className="clickableDate"
          onClick={() => {
            inputDate(createDate(year, month, date));
          }
          }
        >
          {date}
        </CalendarBox>
      </TableD>
    );
  }

  return (
    <TableDDisabled key={date}>
      <CalendarBox
        key={date}
      >
        {date}
      </CalendarBox>
    </TableDDisabled>
  );

};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { month: getCurrMonth(), year: getCurrYear() };
    this.isValidDate = this.isValidDate.bind(this);
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

  isValidDate(year, month, day) {
    const { bookings, selecting } = this.props;
    const date = utcMoment(`${year}/${month + 1}/${day}`);
    const now = utcMoment().startOf('day');
    if (date - now < 0) {
      return false;
    }
    if (bookings.length === 0) {
      return true;
    }
    let i = 0;
    if (selecting === 0) {
      while (i < bookings.length && bookings[i].endDate.diff(date) <= 0) { i += 1; }
      if (i === bookings.length) { return true; }
      if (bookings[i].startDate <= date) { return false; }
    } else {
      while (i < bookings.length && bookings[i].endDate.diff(date) < 0) { i += 1; }
      if (i === bookings.length) { return true; }
      if (bookings[i].startDate < date) { return false; }
    }
    return true;
  }

  render() {
    const { year, month } = this.state;
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
            <CalendarDate
              available={(this.isValidDate(year, month, myDate))}
              year={year}
              month={month}
              date={myDate}
              inputDate={inputDate}
            />,
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
