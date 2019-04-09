import React2 from 'react';
import styled2 from 'styled-components';

const React = window.React || React2;
const styled = window.styled || styled2;

const Row = styled.div`
  display: flex;
`;

const RowItem = styled.div`
  flex-grow:1;
  text-align: ${props => (props.isCost ? 'right' : 'left')}
`;

const CostLine = ({ title, cost, isTotal }) => (
  <div>
    <Row>
      <RowItem isCost={false}>
        {title}
      </RowItem>
      <RowItem className={isTotal ? 'totalBookingCost' : ''} isCost>
        {`$${cost}`}
      </RowItem>
    </Row>
    {isTotal ? '' : <hr />}
  </div>
);

function getTaxRate(taxes) {
  let rate = 0;
  taxes.forEach((tax) => { rate += tax.type === 'percent' ? tax.rate : 0; });
  return rate;
}

function getFlatTax(taxes) {
  let total = 0;

  taxes.forEach((tax) => { total += tax.type === 'flat' ? tax.amount : 0; });

  return total;
}


const Costs = ({
  duration, price, fees, taxes 
}) => {
  const baseStayCost = price * duration;
  const feeArr = [];
  let totalFeeCost = 0;
  Object.keys(fees).forEach((fee) => { feeArr.push([fee, fees[fee]]); totalFeeCost += fees[fee]; });

  const totalTaxCost = parseInt(((baseStayCost + totalFeeCost)
    * getTaxRate(taxes)
    + getFlatTax(taxes)).toFixed(), 10);

  const totalCost = baseStayCost + totalFeeCost + totalTaxCost;
  return (
    <div>
      <CostLine title={`$${price} x ${duration} nights`} cost={baseStayCost} />
      {feeArr.map(fee => (
        <CostLine title={fee[0]} cost={fee[1]} />
      ))}
      <CostLine title="Occupancy Taxes and Fees" cost={totalTaxCost} />
      <CostLine title="Total" cost={totalCost} isTotal />
    </div>
  );
};

export default Costs;
