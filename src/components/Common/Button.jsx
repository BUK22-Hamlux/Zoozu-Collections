function Button({
  text,
  icon,
  onClick,
  type,
  optionalClassName,
  htmlType = "button",
  disabled = false,
}) {
  return (
    <button
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
      // aria-disabled mirrors the disabled state for screen readers
      aria-disabled={disabled}
      className={`rounded-xl py-2 px-6 transition-all active:scale-95 ${
        type === "primary"
          ? "bg-primary text-white hover:brightness-110"
          : "text-text"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${optionalClassName}`}
    >
      {text}
      {/* aria-hidden on icons inside buttons — the button text already
          describes the action; the icon is decorative */}
      {icon && <span aria-hidden="true">{icon}</span>}
    </button>
  );
}

export default Button;
