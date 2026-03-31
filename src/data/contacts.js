import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@zoozu.com",
    sub: "We reply within 24 hours",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+234 801 234 5678",
    sub: "Mon – Sat, 9am – 6pm WAT",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "14 Balogun Street, Lagos Island",
    sub: "Lagos, Nigeria",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Clock,
    title: "Business Hours",
    detail: "Mon – Sat: 9am – 6pm",
    sub: "Sunday: Closed",
    color: "bg-orange-500/10 text-orange-600",
  },
];

export default contactMethods;
