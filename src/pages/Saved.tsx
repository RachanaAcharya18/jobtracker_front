import { Bookmark } from "lucide-react";

const Saved = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-space-4 py-space-5">
      <div className="rounded-full border p-space-3 text-muted-foreground">
        <Bookmark className="h-8 w-8" />
      </div>
      <h1 className="mt-space-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
        Saved Jobs
      </h1>
      <p className="mt-space-2 max-w-md text-center text-muted-foreground">
        Jobs you bookmark will appear here. Save roles that interest you to review later.
      </p>
    </div>
  );
};

export default Saved;
