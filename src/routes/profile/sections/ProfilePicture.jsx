import React from "react";
import { useRef } from "react";
import ProfileCard from "../../../components/Profile/ProfileCard";
import { useInfo } from "../../../contexts/InfoContext";

function ProfilePicture() {
  const { handleImageChange, profileImage, isUploadingImage } = useInfo();
  const fileInputRef = useRef(null);

  return (
    <div>
      <ProfileCard title="Profile Picture">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-border-main"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div>
            <p className="text-secondary text-sm mb-3">
              Upload a new avatar. Max file size 2MB.
            </p>
            <button
              disabled={isUploadingImage}
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 rounded-lg bg-background border border-border-main text-text font-medium hover:bg-section transition-colors"
            >
              {isUploadingImage ? "Uploading..." : "Update Image"}
            </button>
          </div>
        </div>
      </ProfileCard>
    </div>
  );
}

export default ProfilePicture;
