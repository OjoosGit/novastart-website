import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export default function Loading() {
  return (
    <Section>
      <Container>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-neutral-600">Laden...</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

