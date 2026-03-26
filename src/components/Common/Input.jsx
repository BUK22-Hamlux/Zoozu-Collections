function Input({
  label,
  icon: Icon,
  type = "text",
  value,
  placeholder,
  name,
  onChange,
  error,
  inputMode,
  inputId,
  maxLength,
}) {
  return (
    <div>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-text flex items-center gap-2"
        >
          {Icon && (
            <Icon size={16} className="text-secondary" aria-hidden="true" />
          )}
          {label}
        </label>
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          inputMode={inputMode}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="w-full px-4 py-3 rounded-lg bg-background border border-border-main text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
