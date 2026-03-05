import React from "react";
import ProfilePreferenceItem from "../../../components/Profile/ProfilePreferenceItem";
import ProfileCard from "../../../components/Profile/ProfileCard";

function Preferences() {
  return (
    <div>
      <ProfileCard title="Preferences">
        <ProfilePreferenceItem
          label="Email Notifications"
          description="Receive updates about your orders"
        />
        <ProfilePreferenceItem
          label="Marketing Emails"
          description="Receive promotional offers and news"
        />
        <ProfilePreferenceItem
          label="SMS Notifications"
          description="Get text updates for deliveries"
        />
      </ProfileCard>
    </div>
  );
}

export default Preferences;
