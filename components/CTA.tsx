import Link from "next/link";
import { Container } from "./Container";
import { Section } from "./Section";
import { Button } from "./ui/button";

interface CTAProps {
  title: string;
  description: string;
  primaryText: string;
  primaryLink: string;
  secondaryText?: string;
  secondaryLink?: string;
}

export function CTA({
  title,
  description,
  primaryText,
  primaryLink,
  secondaryText,
  secondaryLink,
}: CTAProps) {
  return (
    <Section>
      <Container>
        <div className="bg-gradient-to-br from-primary to-primary-700 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-white mb-4">{title}</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={primaryLink}>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-neutral-50"
              >
                {primaryText}
              </Button>
            </Link>
            {secondaryText && secondaryLink && (
              <Link href={secondaryLink}>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  {secondaryText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

