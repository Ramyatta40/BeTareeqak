import React from 'react';
import './Rode.css';
import TripRow from './TripRow';
function Rode() {
  return (
    <div className="journeyTable">
      <h2>Journey 1</h2>
      <table>
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <TripRow/>
        </tbody>
      </table>
      <button>Start Journey</button>
    </div>
  );
}

export default Rode;
