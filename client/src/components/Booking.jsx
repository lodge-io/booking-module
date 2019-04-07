import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Calendar from './Calendar.jsx';
import Costs from './Costs.jsx';
import Review from './Review.jsx';
import GuestSelect from './GuestSelect.jsx';

const utcMoment = moment.utc;

const BookingDiv = styled.div`
  width:330px;
  border:1px solid black;
  padding:24px;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important;
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
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important;
  `;

const DateSelect = styled.div`
  min-width:40%;
  width: 40%;
  border-radius: 3px;
  background-color: ${props => (props.selected ? '#99EDE6' : 'white')}
`;

const MiddleArrow = styled.svg`
  height: 24px;
  width: 24px;
  display: block; 
  fill: currentcolor;
  width: 20%;
`;

const BookButton = styled.button`
  margin-top: 20px;
  background-color:#FF5A5F;
  color:white;
  width:100%;
  border-radius: 7px;
  height:40px;
`;

class Booking extends React.Component {
  constructor(props) {
    super(props);
    const { listing, id } = this.props;
    // invoke api call to get listing data
    this.state = {
      listing: listing || null,
      id: id || null,
      loadFailed: false,
      startDate: null,
      endDate: null,
      selecting: -1,
      calOpen: false,
      guestSelectOpen: false,
      guests: { adults: 1, children: 0, infants: 0 },

    };
    this.handleStartDateClick = this.handleStartDateClick.bind(this);
    this.handleEndDateClick = this.handleEndDateClick.bind(this);
    this.inputDate = this.inputDate.bind(this);
    this.closeGuestSelect = this.closeGuestSelect.bind(this);
    this.setGuestCount = this.setGuestCount.bind(this);
    this.toggleGuestSelect = this.toggleGuestSelect.bind(this);
  }

  componentDidMount() {
    const { listing, id } = this.state;
    if (!listing) {
      fetch(`/listings/${id}`)
        .then(res => res.json())
        .then((newListing) => {
          newListing.bookings.forEach((booking) => {
            const a = booking;
            a.endDate = utcMoment(booking.endDate);
            a.startDate = utcMoment(booking.startDate);
            return a;
          });
          this.setState({ listing: newListing });
        })
        .catch(() => this.setState({ loadFailed: true }));
    }
    // load listing
  }

  setGuestCount(type, count) {
    const { guests, listing } = this.state;
    if (typeof guests[type] !== 'undefined') {
      if (type === 'infants') {
        guests.infants = Math.max(0, Math.min(count, 5));
        this.setState({ guests });
      } else {
        const { maxGuests } = listing.requirements;
        if (type === 'adults') {
          guests.adults = Math.max(1, Math.min(count, maxGuests || 16 - guests.children));
          this.setState({ guests });
        } else if (type === 'children') {
          guests.children = Math.max(0, Math.min(count, maxGuests || 16 - guests.adults));
          this.setState({ guests });
        }
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
    if (startDate === null || endDate === null) {
      return true;
    }
    const { listing } = this.state;
    const { minBookingLength, maxBookingLength } = listing.requirements;
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

  toggleGuestSelect() {
    const { guestSelectOpen } = this.state;
    this.setState({ guestSelectOpen: !guestSelectOpen });
  }

  closeGuestSelect() {
    this.setState({ guestSelectOpen: false });
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

  render() {
    const {
      calOpen, listing, selecting, startDate, endDate, loadFailed, guestSelectOpen, guests,
    } = this.state;
    if (loadFailed) {
      return <div>Load failed!</div>;
    }
    if (!listing) {
      return <div>listing loading</div>;
    }
    const { avgReview, numReviews } = listing.reviews;
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
          <MiddleArrow viewBox="0 0 24 24" focusable="false">
            <path d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0 .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0 -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15 6.15h-21.79a.5.5 0 0 0 -.5.5z" fillRule="evenodd" />
          </MiddleArrow>
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
              bookings={listing.bookings}
              selecting={selecting}
            />
          )
          : '' }
        <div>
          Guests
        </div>
        <SelectorBox onClick={this.toggleGuestSelect}>
          {`${guests.adults + guests.children} guests`}
          {guests.infants ? `, ${guests.infants} infants` : ''}

        </SelectorBox>
        {guestSelectOpen
          ? (
            <GuestSelect
              guests={guests}
              setGuestCount={this.setGuestCount}
              close={this.closeGuestSelect}
            />
          )
          : ''}

        {(startDate && endDate)
          ? (
            <Costs
              duration={endDate.diff(startDate, 'days')}
              price={listing.price}
              fees={listing.fees}
              taxes={listing.taxes}
            />
          )
          : ''}
        <BookButton>
          Book!
        </BookButton>
      </BookingDiv>
    );
  }
}

export default Booking;
