import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

const LegalLayout = ({ title, children }: LegalLayoutProps) => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden pt-10 pb-16" style={{ background: "var(--hero-gradient)" }}>
        <div className="glow-dot w-72 h-72 bg-primary top-0 -left-24" />
        <div className="glow-dot w-80 h-80 bg-accent -top-10 right-0 opacity-10" />

        <div className="container-narrow relative z-10 max-w-3xl">
          <Link to="/" className="text-sm text-primary underline">← Ana sayfa</Link>
          <h1 className="section-title mt-4 mb-6">{title}</h1>
          <div className="card-elevated space-y-4 text-sm lg:text-base text-muted-foreground leading-relaxed">{children}</div>
        </div>
      </section>
    </main>
  );
};

export default LegalLayout;
