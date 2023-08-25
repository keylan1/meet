const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const handleInputChanged = (e) => {
    const value = e.target.value;

    let errorText;
    if (isNaN(value) || value <= 0 || value > 100) {
      errorText = 'Invalid number of events.';
    } else {
      errorText = '';
      setCurrentNOE(value);
    }
    setErrorAlert(errorText);
  };

  return (
    <div id="number-of-events">
      <label for="number">Adjust # of events</label>
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
