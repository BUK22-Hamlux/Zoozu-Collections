function Button({ text, icon, onClick, type, optionalClassName }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl py-2 px-6 transition-all active:scale-95 ${
        type === "primary"
          ? "bg-primary text-white hover:brightness-110"
          : "text-text hover:bg-section"
      } ${optionalClassName}`}
    >
      {text}
      {icon}
    </button>
  );
}

export default Button;
