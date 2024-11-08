import { useState } from 'react';

const Counter = () => {
  const [number, setNumber] = useState(10);
  
  const onIncrease = () => setNumber((prev) => prev + 1);
  
  const onDecrease = () => setNumber((prev) => prev - 1);
  
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default Counter;