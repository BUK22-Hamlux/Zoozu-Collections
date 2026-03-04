function ReviewCard({ title, children, onEdit }) {
  return (
    <div className="bg-section border border-border-main rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-text">{title}</h3>
        <button
          onClick={onEdit}
          className="text-primary text-sm font-semibold hover:underline"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

export default ReviewCard;
