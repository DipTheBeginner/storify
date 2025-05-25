// Counter.tsx
'use client'; // if you're using Next.js app router

import useCounterStore from './store';

const Counter = () => {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div className="p-4">
      <h1>Count: {count}</h1>
      <button onClick={increment} className="mr-2">+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default Counter;
