"use client";

import { useEffect } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <Section>
      <Container>
        <div className="text-center py-20">
          <h1 className="text-6xl font-bold text-error mb-4">Oeps!</h1>
          <h2 className="text-h2 mb-4">Er ging iets mis</h2>
          <p className="text-lead text-neutral-600 mb-8 max-w-2xl mx-auto">
            We konden deze pagina niet laden. Probeer het opnieuw of ga terug naar de homepage.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={reset}>
              Probeer opnieuw
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => (window.location.href = "/")}
            >
              Naar homepage
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}



