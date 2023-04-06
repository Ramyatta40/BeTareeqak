import React, { useState } from 'react';

import './Rode.css';

function TripRow() {
const [user,] = useState();



    return (
        <div>
<tr>
            <th>Trip ID</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Price</th>
          </tr>
        </div>


    )
}
export default TripRow;