import React from "react";
import ProfilePicture from "./sections/ProfilePicture";
import PersonalInfo from "./sections/PersonalInfo";
import ChangePassword from "./sections/ChangePassword";
import Preferences from "./sections/preferences";

function ProfilePage() {
  return (
    <div className="p-6">
      <ProfilePicture />
      <PersonalInfo />
      <ChangePassword />
      <Preferences />
    </div>
  );
}

export default ProfilePage;
