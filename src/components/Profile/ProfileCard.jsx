import React from "react";

function ProfileCard({ title, children, className = "" }) {
  return (
    <div>
      <div
        className={`bg-section border border-border-main rounded-xl p-6 mb-6 shadow-sm ${className}`}
      >
        {title && <h3 className="text-xl font-bold text-text mb-6">{title}</h3>}
        {children}
      </div>
    </div>
  );
}

export default ProfileCard;
