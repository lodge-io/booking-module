import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Calendar from './Calendar.jsx';
import Costs from './Price.jsx';
import Review from './Review.jsx';

const utcMoment = moment.utc;

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
  padding-left: 15px;
  display: flex;
  flex-direction: row;
  `;

const DateSelect = styled.div`
  min-width:33%;
  width: 33%;
  border-radius: 3px;
  background-color: ${props => (props.selected ? 'blue' : 'white')}
`;

const MiddleArrow = styled.div`
  width: 33%;
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
      id: this.props.id || null,
      loadFailed: false,
      startDate: null,
      endDate: null,
      selecting: -1,
      calOpen: false,
      guestSelectOpen: false,
      guests: {},
      showCost:false
    };
    this.handleStartDateClick = this.handleStartDateClick.bind(this);
    this.handleEndDateClick = this.handleEndDateClick.bind(this);
    this.inputDate = this.inputDate.bind(this);
  }

  componentDidMount() {
    if (!this.state.listing) {
      fetch(`/listings/${this.state.id}`)
        .then(res => res.json())
        .then(listing => this.setState({ listing }));
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
      if ((selecting === 1 && this.isInvalidBooking(startDate, date))
        || (selecting === 0 && this.isInvalidBooking(date, endDate))) {
        this.setState({ endDate: null, selecting: 1 });
      } else {
        this.setState({ calOpen: false, selecting: -1 });
      }
    }
  }

  isInvalidDate(date) {
    if (date.valueOf() < utcMoment().startOf('day').valueOf()) {
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

  isInvalidBooking(startDate, endDate) {
    const { listing, guests } = this.state;
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
    const {
      calOpen, listing, selecting, startDate, endDate, failed,
    } = this.state;
    if (failed) {
      return <div>Load failed!</div>;
    }
    if (!listing) {
      return <div>listing loading</div>;
    }
    const {avgReview, numReviews } = listing.reviews;
    return (
      <BookingDiv>

        <div>
          $
          {listing ? listing.price : ' '}
          {' '}
          per night
        </div>
        <div>
          <Review avgReview={avgReview} numReviews={numReviews} />
        </div>
        <hr />
        <div>
          Dates
        </div>
        <SelectorBox>
          <DateSelect className="dateSelectStart" selected={selecting === 0} onClick={this.handleStartDateClick}> 
            {startDate ? startDate.format('MM/DD/YYYY') : ''}
          </DateSelect>
          <MiddleArrow>-&gt;</MiddleArrow>
          <DateSelect className="dateSelectEnd" selected={selecting === 1} onClick={this.handleEndDateClick}> 
            {endDate ? endDate.format('MM/DD/YYYY') : ''}
          </DateSelect>
        </SelectorBox>
        { calOpen
          ? (
            <Calendar
              inputDate={this.inputDate}
              startDate={startDate}
              endDate={endDate}
              minBookingLength={listing.minBookingLength}
            />
          )
          : '' }
        <div>
          Guests
        </div>
        <SelectorBox>
          Guests selector
        </SelectorBox>
        {(startDate && endDate) && <Costs />}
        <BookButton>
          book!
        </BookButton>
      </BookingDiv>
    );
  }
}

export default Booking;