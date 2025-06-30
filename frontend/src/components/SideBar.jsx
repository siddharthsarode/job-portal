import { FiLogOut } from "react-icons/fi";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SideBar = ({ actionLinks, isOpen, toggleSidebar }) => {
  const { user, setUser } = useAuth();

  const logout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("User can be logout");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside
      className={`fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out 
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 border-b border-ternary">
        <h1 className="text-xl font-bold text-primary">JobPortal</h1>
        <button
          className="md:hidden text-dark text-2xl"
          onClick={toggleSidebar}
        >
          ✕
        </button>
      </div>

      <nav className="p-4 flex flex-col gap-2">
        {actionLinks?.map((item, idx) => (
          <SidebarLink
            key={idx}
            to={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}
        <div
          onClick={logout}
          className="flex items-center gap-3 text-dark cursor-pointer p-3 rounded-lg hover:bg-primary/10 transition"
        >
          <FiLogOut className="text-xl" />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
