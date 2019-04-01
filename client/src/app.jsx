import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// import { findRepos } from 'jest-changed-files';
// console.log('asdf')



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
console.log(Date);
function numToMonth(num) {
  return MONTH_NAMES[num];
}

function getMonthStartWeekday(month, year = 2019) {
  return new Date(year, month).getDate();
}

const CalendarBox = styled.div`
  background: transparent;
  border: 2px solid palevioletred;
  color: palevioletred;
  // margin: 0 1em;
  padding: 0.25em 0.25em;
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

`

const TableHolder = styled.div`
  background-color:blue;
  width: 100%;
`;
const Date = styled.div`
  
`;

class Asdf extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const year = 2019;
    const monthIn = 11;
    let month = MONTH_NAMES[monthIn];
    let date = 1;
    let lastDay = 32;//getLastMonthDate(monthIn, year);
    let firstDay = 4;//getMonthStartWeekday(monthIn, year);
    let table = [];
    
    while(date <= lastDay) {
      let week = [];
      for (let i = 0; i < 7; i++) {
        if ((date === 1 && i < firstDay) || date > lastDay) {
          week.push(<td></td>);
        } else {
          let myDate = date;
          week.push(<td><CalendarBox onMouseOver={()=>console.log(myDate)}>{myDate}</CalendarBox></td>)
          date++;
        }
      }
      table.push(week);
    }
    console.log(table);
    return (
      <TableHolder> 
        {month}
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

ReactDOM.render(<Asdf/>, 
  document.querySelector('#app'));
