function CheckoutSteps({ icon: Icon, label, isActive, isCompleted }) {
  return (
    <div>
      <div className="flex flex-col items-center space-y-2 flex-1 relative">
        <div
          className={`
      w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
      ${
        isActive
          ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20"
          : isCompleted
            ? "bg-success border-success text-white"
            : "bg-section border-border-main text-secondary"
      }
    `}
        >
          <Icon size={20} />
        </div>
        <span
          className={`text-sm font-medium ${isActive ? "text-primary" : "text-secondary"}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default CheckoutSteps;
