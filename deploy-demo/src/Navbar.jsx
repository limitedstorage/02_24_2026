import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const version = import.meta.env.VITE_APP_VERSION || "1.0.0";

  // Helper to highlight active links
  const isActive = (path) => location.pathname === path ? "text-blue-400" : "text-gray-300 hover:text-white";

  return (
    <nav className="bg-gray-900 text-white shadow-xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-black tracking-tighter uppercase italic">
            GO COUGS!!!
          </Link>
        </div>

        {/* Links */}
        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <li>
            <Link to="/" className={`${isActive("/")} transition-colors uppercase tracking-wide`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/github/search" className={`${isActive("/github/search")} transition-colors uppercase tracking-wide`}>
              Search
            </Link>
          </li>
          <li className="h-4 w-px bg-gray-700 hidden md:block"></li> {/* Vertical Divider */}
          <li>
            <Link to="/github/users/jimmynono" className={`${isActive("/github/users/jimmynono")} transition-colors`}>
              James
            </Link>
          </li>
          <li>
            <Link to="/github/users/rainycitycoder" className={`${isActive("/github/users/rainycitycoder")} transition-colors`}>
              Chris
            </Link>
          </li>
        </ul>

        {/* App Version Tag */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            v{version}
          </span>
        </div>
      </div>
    </nav>
  );
}