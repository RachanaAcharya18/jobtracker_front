import { Outlet } from "react-router-dom";
import AppNavigation from "@/components/AppNavigation";

const AppShell = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppNavigation />
      <Outlet />
    </div>
  );
};

export default AppShell;
