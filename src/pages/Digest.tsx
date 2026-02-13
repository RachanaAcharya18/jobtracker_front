import { Mail } from "lucide-react";

const Digest = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-space-4 py-space-5">
      <div className="rounded-full border p-space-3 text-muted-foreground">
        <Mail className="h-8 w-8" />
      </div>
      <h1 className="mt-space-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
        Daily Digest
      </h1>
      <p className="mt-space-2 max-w-md text-center text-muted-foreground">
        Your personalized daily job summary will appear here every morning at 9AM.
      </p>
    </div>
  );
};

export default Digest;
