import { useState, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import ProfileCard from "../../../components/Profile/ProfileCard";
import BouncingDots from "../../../components/Common/BouncingDots";
import toast from "react-hot-toast";

function ProfilePicture() {
  const { user, profileImage, updateProfileImage } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB.");
      return;
    }

    try {
      setIsUploading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const imageUrl = URL.createObjectURL(file);
      updateProfileImage(imageUrl);
      toast.success("Profile picture updated.");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ProfileCard title="Profile Picture">
      <div className="flex items-center gap-6">
        <img
          src={profileImage}
          alt={
            user?.name
              ? `${user.name}'s profile picture`
              : "Your profile picture"
          }
          loading="eager"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover border-2 border-border-main"
        />
        <div>
          <p className="text-secondary text-sm mb-3">
            Upload a new avatar. Max file size 2MB.
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            aria-label="Upload profile picture"
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current.click()}
            aria-busy={isUploading}
            className="min-w-[130px] flex items-center justify-center px-4 py-2 rounded-lg bg-background border border-border-main text-text font-medium hover:bg-section transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? <BouncingDots size={7} /> : "Update Image"}
          </button>
        </div>
      </div>
    </ProfileCard>
  );
}

export default ProfilePicture;
