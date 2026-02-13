import { ReactNode } from "react";

interface WorkspaceLayoutProps {
  primary: ReactNode;
  secondary: ReactNode;
}

const WorkspaceLayout = ({ primary, secondary }: WorkspaceLayoutProps) => {
  return (
    <div className="flex flex-1 gap-space-3 overflow-hidden px-space-4 py-space-4">
      <main className="flex-[7] min-w-0 overflow-y-auto">{primary}</main>
      <div className="flex-[3] min-w-[280px] max-w-[380px] overflow-y-auto">{secondary}</div>
    </div>
  );
};

export default WorkspaceLayout;
