import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Saved", to: "/saved" },
  { label: "Digest", to: "/digest" },
  { label: "Settings", to: "/settings" },
  { label: "Profile", to: "/profile" },
];

const AppNavigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="flex items-center justify-between px-space-4 py-space-2">
        <span className="font-serif text-base font-semibold tracking-tight">
          KodNest
        </span>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-space-3">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="relative pb-1 text-sm font-medium text-muted-foreground transition-colors duration-default ease-in-out hover:text-foreground"
                activeClassName="text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <ul className="md:hidden flex flex-col border-t px-space-4 py-space-2 gap-space-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="block py-2 text-sm font-medium text-muted-foreground transition-colors duration-default ease-in-out hover:text-foreground"
                activeClassName="text-foreground border-l-2 border-primary pl-space-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default AppNavigation;
