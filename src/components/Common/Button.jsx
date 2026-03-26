function Button({
  text,
  icon: Icon, // 1. Rename 'icon' to 'Icon' (Capitalized)
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
      aria-disabled={disabled}
      className={`rounded-xl py-2 px-6 transition-all active:scale-95 flex items-center justify-center gap-2 ${
        type === "primary"
          ? "bg-primary text-white hover:brightness-110"
          : "text-text border border-border-main" // Added a border for non-primary
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${optionalClassName}`}
    >
      {Icon && <Icon size={20} aria-hidden="true" />}
      <span>{text}</span>
    </button>
  );
}

export default Button;
