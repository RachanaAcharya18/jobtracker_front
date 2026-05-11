import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Landing = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      
      <header className="flex items-center justify-between border-b px-space-4 py-space-2">
        <span className="font-serif text-base font-semibold tracking-tight">
          KodNest
        </span>

        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>

          <Link to="/register">
            <Button size="sm">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-space-4">
        <div className="max-w-2xl text-center">
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
            Stop Missing The Right Jobs.
          </h1>

          <p className="mt-space-3 text-body-lg text-muted-foreground mx-auto">
            Precision-matched job discovery delivered daily at 9AM.
          </p>

          <Link to="/login" className="mt-space-4 inline-block">
            <Button size="lg">Start Tracking</Button>
          </Link>
        </div>
      </main>

      <footer className="border-t px-space-4 py-space-3 text-center">
        <p className="text-xs text-muted-foreground">
          Built with the KodNest Premium Build System
        </p>
      </footer>
    </div>
  );
};

export default Landing;