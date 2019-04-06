import React from 'react';
import styled from 'styled-components';

const GuestSelectDiv = styled.div`
  border-radius: 2px;
  padding:10px;
`;

const GuestTypeRow = styled.div`
  display: flex;

`;


const GuestTypeEntry = ({ type, count, setGuestCount }) => (
  <GuestTypeRow>
    <div>{type}</div>
    <div></div>
    <div>
      <button onClick={() => setGuestCount(type.toLowerCase(), count - 1)}>-</button>
      {count}
      <button onClick={() => setGuestCount(type.toLowerCase(), count + 1)}>+</button>
    </div>
  </GuestTypeRow>
);

const GuestSelect = ({ guests, setGuestCount, close }) => {
  console.log(guests);
  return (
    <GuestSelectDiv>
      <GuestTypeEntry type="Adults" count={guests.adults} setGuestCount={setGuestCount} />
      <GuestTypeEntry type="Children" count={guests.children} setGuestCount={setGuestCount} />
      <GuestTypeEntry type="Infants" count={guests.infants} setGuestCount={setGuestCount} />
      <div onClick={close}>close</div>
    </GuestSelectDiv>
  )
}

export default GuestSelect;