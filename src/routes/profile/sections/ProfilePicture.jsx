import { useRef } from "react";
import ProfileCard from "../../../components/Profile/ProfileCard";
import { useInfo } from "../../../contexts/InfoContext";
import { useAuth } from "../../../contexts/AuthContext";

function ProfilePicture() {
  const { user } = useAuth();
  const { handleImageChange, profileImage, isUploadingImage } = useInfo();
  const fileInputRef = useRef(null);

  return (
    <div>
      <ProfileCard title="Profile Picture">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={profileImage}
              alt={
                user?.fullName
                  ? `${user.fullName}'s profile picture`
                  : "Your profile picture"
              }
              className="w-24 h-24 rounded-full object-cover border-2 border-border-main"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              aria-label="Upload profile picture"
              className="hidden"
            />
          </div>
          <div>
            <p className="text-secondary text-sm mb-3">
              Upload a new avatar. Max file size 2MB.
            </p>
            <button
              type="button"
              disabled={isUploadingImage}
              onClick={() => fileInputRef.current.click()}
              aria-busy={isUploadingImage}
              className="px-4 py-2 rounded-lg bg-background border border-border-main text-text font-medium hover:bg-section transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
