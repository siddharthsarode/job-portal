import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition "`}
  >
    <Icon className="text-xl" />
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

export default SidebarLink;
