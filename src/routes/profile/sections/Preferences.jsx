import { useState } from "react";
import ProfilePreferenceItem from "../../../components/Profile/ProfilePreferenceItem";
import ProfileCard from "../../../components/Profile/ProfileCard";

const PREFS_KEY = "zoozu-preferences";

const DEFAULT_PREFS = {
  emailNotifications: true,
  marketingEmails: false,
  smsNotifications: false,
};

function readPrefs() {
  try {
    const saved = localStorage.getItem(PREFS_KEY);
    return saved ? { ...DEFAULT_PREFS, ...JSON.parse(saved) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

function Preferences() {
  // Lazy initialiser reads from localStorage so preferences survive refresh
  const [prefs, setPrefs] = useState(() => readPrefs());

  const toggle = (key) => {
    setPrefs((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ProfileCard title="Preferences">
      <ProfilePreferenceItem
        label="Email Notifications"
        description="Receive updates about your orders"
        checked={prefs.emailNotifications}
        onChange={() => toggle("emailNotifications")}
      />
      <ProfilePreferenceItem
        label="Marketing Emails"
        description="Receive promotional offers and news"
        checked={prefs.marketingEmails}
        onChange={() => toggle("marketingEmails")}
      />
      <ProfilePreferenceItem
        label="SMS Notifications"
        description="Get text updates for deliveries"
        checked={prefs.smsNotifications}
        onChange={() => toggle("smsNotifications")}
      />
    </ProfileCard>
  );
}

export default Preferences;
