import { Container } from "./Container";

interface PageHeroProps {
  title: string;
  description?: string;
  image?: string;
}

export function PageHero({ title, description, image }: PageHeroProps) {
  if (image) {
    return (
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${image}')`,
            }}
          />
          {/* Lighter overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent" />
        </div>

        {/* Content */}
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-white">{title}</h1>
            {description && (
              <p className="text-lead text-neutral-100">{description}</p>
            )}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-primary/5 to-white py-12 md:py-16">
      <Container>
        <div className="max-w-3xl">
          <h1 className="mb-4">{title}</h1>
          {description && (
            <p className="text-lead text-neutral-600">{description}</p>
          )}
        </div>
      </Container>
    </section>
  );
}

