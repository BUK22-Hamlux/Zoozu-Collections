function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  optionalClassName = "",
}) {
  // id links the <label> to the <input>. Without this, clicking the label
  // text doesn't focus the input, and screen readers lose the association.
  const inputId = name ? `input-${name}` : undefined;

  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-text">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 rounded-lg 
          bg-background border border-text/20 
          text-text placeholder-text/70
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
          transition-all duration-200
          ${optionalClassName}
        `}
      />
    </div>
  );
}

export default Input;
