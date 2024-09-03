const Select = ({ label, name, value, onChange, children, error }) => {
  return (
    <div>
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange} className={error ? 'input-error' : ''}>
        {children}
      </select>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Select;
