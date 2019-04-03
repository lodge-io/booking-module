import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';



function getCurrMonth() {
  return new Date(Date.now()).getMonth();
}

function getCurrDay() {
  return new Date(Date.now()).getDay();
}
const WEEK = [0,1,2,3,4,5,6];
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const SHORT_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function numToDay(num) {
  return DAY_NAMES[num];
}


function getLastMonthDate(month, year = 2019) {
  return (new Date(year, month + 1, 0)).getDate();
}

function numToMonth(num) { 
  return MONTH_NAMES[num];
}

function getMonthStartWeekday(month, year = 2019) {
  return new Date(year, month).getDay();
}

const CalendarBox = styled.div`
  color: palevioletred;
  padding: 0.25em 0.25em;
  text-align: center;
`
const TableD = styled.td`
  border: 1px solid green;
  width: 42px; height:42px; 
  background: pink;
  &:hover{
    background-color: blue;
  }
`

const ArrowSpan = styled.span`
  flex-grow: 1;
  text-align: center;
  border: 1px solid black;
  border-radius: 3px;
  padding-top: 3px;
  padding-bottom: 3px;
`
const MonthSpan = styled.span`
  flex-grow: 8;
  text-align: center;
`


const Head = styled.th`
  width: 14%;
  background-color:green;
`;
const Table = styled.table`
  background-color:orange;
  width:100%;
  padding:0px;
  border-collapse: collapse;
`
const TopRow = styled.span`
  display: flex;
  flex-direction: row;
`
const TableHolder = styled.div`
  background-color:blue;
  width: 300px;
  padding: 20px;
  border-radius: 3px;

`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { month: 3, year: 2019};
  }

  nextMonth(){
    let month = this.state.month + 1;
    let year = this.state.year;
    if (month === 12) {
      month = 0;
      year = this.state.year + 1;
    }
    this.setState({ month, year });
  }

  lastMonth(){
    let month = this.state.month - 1;
    let year = this.state.year;
    if (month === -1) {
      month = 11;
      year = this.state.year - 1;
    }
    this.setState({ month, year });
  }

  render(){
    const year = this.state.year;
    let month = MONTH_NAMES[this.state.month];
    let date = 1;
    let lastDay = getLastMonthDate(this.state.month, year);
    let firstDay = getMonthStartWeekday(this.state.month, year);
    let table = [];
    
    while(date <= lastDay) {
      let week = [];
      for (let i = 0; i < 7; i++) {
        if ((date === 1 && i < firstDay) || date > lastDay) {
          week.push(<td></td>);
        } else {
          let myDate = date;
          if (this.state.hovered === date) {
            week.push(<TableD><CalendarBox onMouseOver={()=>console.log(myDate)}>{myDate}</CalendarBox></TableD>);
          } else {
            week.push(<TableD><CalendarBox onMouseOver={()=>console.log(myDate)}>{myDate}</CalendarBox></TableD>);
          }
          date++;
        }
      }
      table.push(week);
    }
    return (
      <TableHolder> 
        <TopRow>
          <ArrowSpan onClick={() => this.lastMonth()}>&lt;</ArrowSpan>
          <MonthSpan>{month} {year}</MonthSpan>
          <ArrowSpan onClick={() => this.nextMonth()}>&gt;</ArrowSpan>
        </TopRow>
        <Table>
          <tr>
            {SHORT_DAY_NAMES.map((val) =>  <Head>{val}</Head> )}
          </tr>
          {table.map(week => <tr>{week.map(val => val)}</tr>)}

        </Table>
      </TableHolder>
    )
  }
}

export default Calendar;