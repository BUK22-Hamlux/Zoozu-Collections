function Input({ type = "text", placeholder, optionalClassName, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`border border-border-main rounded-xl py-2 px-4 bg-background outline-none focus:border-primary transition-all ${optionalClassName}`}
    />
  );
}

export default Input;
