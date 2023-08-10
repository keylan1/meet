const NumberOfEvents = ({ setCurrentNOE }) => {
  const handleInputChanged = (e) => {
    const value = e.target.value;
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <input
        type="text"
        className="number"
        placeholder="Number of events"
        defaultValue={32}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
