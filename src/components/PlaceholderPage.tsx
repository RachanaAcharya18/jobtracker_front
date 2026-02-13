interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-space-4 py-space-5">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-space-2 text-body text-muted-foreground text-center">
        This section will be built in the next step.
      </p>
    </div>
  );
};

export default PlaceholderPage;
