import React from "react";

function ProfilePreferenceItem({ label, description }) {
  return (
    <div>
      <div className="flex items-center justify-between py-3 border-b border-border-main last:border-0">
        <div>
          <p className="font-bold text-text">{label}</p>
          <p className="text-sm text-secondary">{description}</p>
        </div>
        <input
          type="checkbox"
          className="w-5 h-5 accent-primary cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ProfilePreferenceItem;
