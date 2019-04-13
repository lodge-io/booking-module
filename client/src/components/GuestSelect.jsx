const { React } = window;

const GuestSelectDiv = styled.div`
  border-radius: 2px;
  padding:10px;
`;

const GuestTypeRow = styled.div`
  display: flex;
  padding:10px;
`;

const GuestRowElement = styled.div`
  width:33%;
`;

const RoundButton = styled.button`
  border-radius:15px;
  background-color:white;
  color:#00777B;
  border: 1px solid #00777B;
  width:30px;
  height:30px;
`;

const CloseElement = styled.div`
  text-align:right;
  color: #00777B;
  &:hover{
    text-decoration: underline;
  }
`;


const GuestTypeEntry = ({ type, count, setGuestCount }) => (
  <GuestTypeRow>
    <GuestRowElement>{type}</GuestRowElement>
    <GuestRowElement />
    <GuestRowElement>
      <RoundButton type="button" onClick={() => setGuestCount(type.toLowerCase(), count - 1)}>-</RoundButton>
      {`  ${count}  `}
      <RoundButton type="button" onClick={() => setGuestCount(type.toLowerCase(), count + 1)}>+</RoundButton>
    </GuestRowElement>
  </GuestTypeRow>
);

const GuestSelect = ({ guests, setGuestCount, close }) => {
  return (
    <GuestSelectDiv>
      <GuestTypeEntry type="Adults" count={guests.adults} setGuestCount={setGuestCount} />
      <GuestTypeEntry type="Children" count={guests.children} setGuestCount={setGuestCount} />
      <GuestTypeEntry type="Infants" count={guests.infants} setGuestCount={setGuestCount} />
      <CloseElement onClick={close}>close</CloseElement>
    </GuestSelectDiv>
  );
};



export default GuestSelect;
