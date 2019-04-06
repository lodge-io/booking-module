import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
`;

const RowItem = styled.div`
  flex-grow:1;
  text-align: ${props => (props.isCost ? 'right' : 'left')}
`;

const CostLine = ({title, cost, isTotal}) => (
  <div>
    <Row>
      <RowItem isCost={false}>
        {title}
      </RowItem>
      <RowItem isCost={true}>
        {`$${cost}`}
      </RowItem>
    </Row>
    {isTotal ? '' : <hr />}
  </div>
)


function nightCost(costs) {
  return costs.reduce((sum, cost) => sum + cost, 0);
}
function avgCost(costs) {
  return nightCost(costs) / costs.length;
}

function getTaxRate(taxes) {
  let rate = 0;
  for (let tax of taxes) {
    if (tax.type === 'percent') {
      rate += tax.rate;
    }
  }
  return rate;
}

function getFlatTax(taxes) {
  let total = 0;
  for (let tax of taxes) {
    if (tax.type === 'flat') {
      total += tax.amount;
    }
  }
  return total;
}


const Costs = ({ duration, price, fees, taxes }) => {
  const baseStayCost = price * duration;
  const feeArr = [];
  let totalFeeCost = 0;

  for (let fee in fees) {
    console.log(fee, 'is name');
    feeArr.push([fee, fees[fee]]);
    totalFeeCost += fees[fee];
  }
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
      <CostLine title="Total" cost={totalCost} isTotal={true}/>
    </div>
  );
};


export default Costs;
