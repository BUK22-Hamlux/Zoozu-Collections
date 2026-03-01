import React from "react";

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
  return (
    <div>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <label className="text-sm font-semibold text-text flex items-center gap-2">
          {Icon && <Icon size={16} className="text-secondary" />}
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg bg-background border border-border-main text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default ProfileInput;
