const PaymentMethod = ({ active, onClick, icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
      ${
        active
          ? "border-primary bg-primary/5 text-primary"
          : "border-border-main bg-background text-secondary hover:border-secondary"
      }
    `}
  >
    {icon}
    <span className="text-xs font-bold mt-2">{label}</span>
  </button>
);

export default PaymentMethod;
