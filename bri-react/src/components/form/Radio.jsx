const Radio = ({ label, name, options, value, onChange, error }) => {
  return (
    <div>
      <label>{label}</label>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={onChange}
          />
          {option}
        </div>
      ))}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Radio;
