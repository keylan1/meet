import { useState } from 'react';

const NumberOfEvents = () => {
  const [query, setQuery] = useState(32);

  const handleInputChanged = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div id="numbers-events">
      <input
        type="text"
        className="number"
        placeholder="Number of events"
        value={query}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
