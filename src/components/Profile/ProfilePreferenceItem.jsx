function ProfilePreferenceItem({ label, description }) {
  // Unique id needed so <label htmlFor> correctly targets this specific checkbox.
  // Without it, clicking the label text does NOT toggle the checkbox.
  const checkboxId = `pref-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div>
      <div className="flex items-center justify-between py-3 border-b border-border-main last:border-0">
        <div>
          {/* htmlFor connects this label to the checkbox below */}
          <label
            htmlFor={checkboxId}
            className="font-bold text-text cursor-pointer"
          >
            {label}
          </label>
          <p className="text-sm text-secondary">{description}</p>
        </div>
        <input
          id={checkboxId}
          type="checkbox"
          // aria-label provides a fuller description than just the label text
          aria-label={`${label}: ${description}`}
          className="w-5 h-5 accent-primary cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ProfilePreferenceItem;
