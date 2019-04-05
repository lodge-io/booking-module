import React from 'react';
import styled from 'styled-components';
import Calendar from './Calendar.jsx';
import moment from 'moment';

const BookingDiv = styled.div`
  width:330px;
  border:1px solid black;
  padding:24px;
`;

const SelectorBox = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  height:30px;
  line-height: 30px;
  padding:7px;
`;

const BookButton = styled.button`
  background-color:red;
  color:white;
  width:100%;
  border-radius: 7px;
  height:40px;
`;

class Booking extends React.Component {
  constructor(props) {
    super(props);
    // invoke api call to get listing data
    this.state = {
      listing: this.props.listing || null,
      loadFailed: false,
      startDate: null,
      endDate: null,
      selecting: -1,
      calOpen: false,
      guestSelectOpen: false,
      guests:{},
      showCost:false
    };
    this.handleStartDateClick = this.handleStartDateClick.bind(this);
    this.handleEndDateClick = this.handleEndDateClick.bind(this);
  }

  componentDidMount() {
    if (!this.state.listing) {
      // fetch
    }
    // load listing
  }

  inputDate(date) {
    const { startDate, endDate, selecting } = this.state;
    if (this.isInvalidDate(date)) {
      this.setState({ selecting: 0 });
      return;
    }
    if (selecting === 0) {
      this.setState({ startDate: date, selecting: 1 });
    } else if (selecting === 1) {
      this.setState({ endDate: date, selecting: 0 });
    }
    if ((startDate && selecting === 1) || (endDate && selecting === 0)) {
      if (this.isInvalidBooking()) {
        this.setState({ endDate: null, selecting: 1 });
      } else {
        this.setState({ calOpen: false });
      }
    }
  }

  isInvalidDate(date) {
    if (date.valueOf() < moment().startOf('day').valueOf()) {
      return true;
    }
    // TODO - implement binary search to speed up
    const { listing, selecting } = this.state;
    const { bookings } = listing;
    if (bookings.length === 0) {
      return false;
    }
    let i = 0;
    while (i + 1 < bookings.length && bookings[i + 1].startDate.valueOf() < date.valueOf()) {
      i += 1;
    }
    if (selecting === 0 && date.valueOf() < bookings[i].endDate.valueOf()) {
      return true;
    } if (selecting === 1 && date.valueOf() <= bookings[i].endDate.valueOf()) {
      return true;
    } if (selecting === -1) {
      return true;
    }
    return false;
  }

  isInvalidBooking() {
    const { listing, startDate, endDate, guests } = this.state;
    const { minBookingLength, maxBookingLength, maxGuests } = listing.requirements;
    const { bookings } = listing;
    if (startDate >= endDate) {
      return true;
    }
    if (minBookingLength && endDate.diff(startDate, 'days') < minBookingLength) {
      return true;
    } 
    if (maxBookingLength && endDate.diff(startDate, 'days') > maxBookingLength) {
      return true;
    }
    if (bookings.length === 0) {
      return false;
    }
    let i = 0;
    while (bookings[i].endDate <= startDate) {
      i += 1;
    }
    if (bookings[i].startDate < endDate) {
      return true;
    }
    return false;
  }

  handleStartDateClick() {
    this.setState({ calOpen: true, selecting: 0 });
  }

  handleEndDateClick() {
    this.setState({ calOpen: true, selecting: 1 });
  }

  render() {
    const { calOpen, listing } = this.state;
    return (
      <BookingDiv>
        <div>
          $
          {listing.price}
          {' '}
          per night
        </div>
        <div>
          ***** 123
        </div>
        <hr />
        <div>
          Dates
        </div>
        <SelectorBox>
          <span className="dateSelectStart" onClick={this.handleStartDateClick} />
          -&lt;
          <span className="dateSelectEnd" onClick={this.handleEndDateClick} />
        </SelectorBox>
        { calOpen ? <Calendar /> : '' }
        <div>
          Guests
        </div>
        <SelectorBox>
          Guests selector
        </SelectorBox>
        <div>
          cost 1
        </div>
        <hr />
        <div>
          cost 2
        </div>
        <hr />
        <div>
          cost 3
        </div>
        <hr />
        <div>
          Total         $123
        </div>
        <BookButton>
          book!
        </BookButton>
      </BookingDiv>
    );
  }
}

export default Booking;