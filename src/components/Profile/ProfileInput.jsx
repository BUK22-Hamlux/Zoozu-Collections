function ProfileInput({
  label,
  icon: Icon,
  type = "text",
  value,
  placeholder,
  name,
  onChange,
  error,
}) {
  // We use the field name as the id so <label htmlFor> and <input id> match.
  // Without this link, clicking the label text does NOT focus the input,
  // and screen readers don't know which label belongs to which input.
  const inputId = `profile-input-${name}`;

  return (
    <div>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-text flex items-center gap-2"
        >
          {/* aria-hidden on icon — the label text already describes the field */}
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
          // aria-invalid signals to screen readers that this field has an error
          aria-invalid={!!error}
          // aria-describedby links the input to its error message element
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="w-full px-4 py-3 rounded-lg bg-background border border-border-main text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>
      {error && (
        // id matches aria-describedby above — screen reader announces this
        // after the field description when the field is focused
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

export default ProfileInput;
