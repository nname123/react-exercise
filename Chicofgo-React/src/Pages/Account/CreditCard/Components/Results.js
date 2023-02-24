import React, { useState } from 'react';
import Card from 'react-credit-cards-2';

function Results(props) {
  const { data } = props;
  const [isFrontOfCardVisible, setIsFrontOfCardVisible] = useState(true);

  function toggleCardFlip(e) {
    e.preventDefault();
    setIsFrontOfCardVisible(!isFrontOfCardVisible);
  }

  return (
    <div className="mt-3">
      {/* <h4>Submitted: </h4> */}
      {/* <div>{JSON.stringify(data)}</div> */}
      <div className="mt-3 cursor-pointer" onClick={toggleCardFlip}>
        <Card
          cvc={data.cvc || ''}
          expiry={data.expiry || ''}
          name={data.name || ''}
          number={data.cardNumber || ''}
          focused={isFrontOfCardVisible ? 'number' : 'cvc'}
        />
      </div>
      {/* <div className="text-center">
        <button className="btn btn-info mt-3" onClick={toggleCardFlip}>
          Toggle Card
        </button>
      </div> */}
    </div>
  );
}

export default Results;
