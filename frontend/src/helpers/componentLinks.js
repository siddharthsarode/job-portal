import {
  FiMenu,
  FiHome,
  FiPlusSquare,
  FiUsers,
  FiClipboard,
  FiUserCheck,
} from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";

export const candidateLinks = [
  { label: "Profile", icon: FiUserCheck, href: "/candidate" },
  { label: "Find Jobs", icon: MdWorkOutline, href: "/jobs" },
  { label: "My Applications", icon: FiClipboard, href: "applications" },
];

export const employerLinks = [
  { label: "Dashboard", icon: FiHome, href: "/employer" },
  { label: "Post Job", icon: FiPlusSquare, href: "post-job" },
  { label: "Posted Jobs", icon: FaListAlt, href: "job-posts" },
  { label: "Applicants", icon: FiUsers, href: "applicants" },
];
