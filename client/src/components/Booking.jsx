import React from 'react';
import styled from 'styled-components';

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
      selecting: 0,
      calOpened: false,
      guestSelectOpen: false
    };
  }

  componentDidMount() {
    if (!this.state.listing) {
      // fetch
    }
    // load listing
  }

  render() {
    return (
      <BookingDiv>
        <div>
          232$ per night
        </div>
        <div>
          ***** 123
        </div>
        <hr />
        <div>
          Dates
        </div>
        <SelectorBox>
          Date 1 -&lt; Date 2
        </SelectorBox>
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