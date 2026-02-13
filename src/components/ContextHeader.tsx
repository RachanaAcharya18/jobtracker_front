interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="px-space-4 py-space-4 border-b">
      <h1 className="text-3xl font-semibold tracking-tight leading-tight font-serif">{headline}</h1>
      <p className="mt-space-1 text-body text-muted-foreground">{subtext}</p>
    </section>
  );
};

export default ContextHeader;
