import React from 'react';

function nightCost(costs) {
  return costs.reduce((sum, cost) => sum + cost, 0);
}
function avgCost(costs) {
  return nightCost(costs) / costs.length;
}
const Costs = ({ costs, fees }) => {
  costs = costs || [0];
  fees = fees || {};
  return (
    <div>
      <div>
        <span>{`$${avgCost(costs)} x ${costs.length} nights`}</span>
        <span>{`$${nightCost(costs)}`}</span>
      </div>
      <hr />
      <div>
        <span>Cleaning Fee</span>
        <span>{`$${fees['Cleaning Fee']}`}</span>
      </div>
      <hr />
      <div>
        Service fee
      </div>
      <hr />
      <div>
        Occupancy taxes and fees
      </div>
      <hr />
      <div>
        total: 123
      </div>
    </div>
  );
};


export default Costs;
