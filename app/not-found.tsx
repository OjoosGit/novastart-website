import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="text-center py-20">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-h2 mb-4">Pagina niet gevonden</h2>
          <p className="text-lead text-neutral-600 mb-8 max-w-2xl mx-auto">
            De pagina die je zoekt bestaat niet of is verplaatst. 
            Ga terug naar de homepage of neem contact met ons op.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Naar homepage</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

