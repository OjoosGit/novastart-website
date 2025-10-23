import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { getProgramBySlug, getProgramsData, urlFor } from "@/cms/queries";
import { Clock, Users, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const programs = await getProgramsData();
  return programs.map((program: any) => ({
    slug: program.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    return {
      title: "Traject niet gevonden - Novastart",
    };
  }

  return {
    title: `${program.title} - Novastart`,
    description: program.intro || `Meer informatie over ${program.title} bij Novastart`,
    openGraph: {
      title: `${program.title} - Novastart`,
      description: program.intro || "",
      type: "website",
    },
  };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <>
      <PageHero title={program.title} description={program.intro} />

      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {program.image && (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
                  <Image
                    src={urlFor(program.image).width(800).height(450).url()}
                    alt={program.image.alt || program.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                {program.description && (
                  <div className="mb-8">
                    {/* Render rich text content if needed */}
                    <p>{program.intro}</p>
                  </div>
                )}

                {program.voordelen && program.voordelen.length > 0 && (
                  <>
                    <h2>Voordelen</h2>
                    <ul className="space-y-3">
                      {program.voordelen.map((voordeel: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span>{voordeel}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {program.activiteiten && program.activiteiten.length > 0 && (
                  <>
                    <h2>Activiteiten</h2>
                    <ul className="space-y-2">
                      {program.activiteiten.map((activiteit: string, index: number) => (
                        <li key={index}>• {activiteit}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div>
              <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 sticky top-24">
                <h3 className="text-h3 mb-4">Over dit traject</h3>
                
                <div className="space-y-4">
                  {program.doelgroep && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">Doelgroep</p>
                        <p className="text-sm text-neutral-600">{program.doelgroep}</p>
                      </div>
                    </div>
                  )}

                  {program.duur && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">Duur</p>
                        <p className="text-sm text-neutral-600">{program.duur}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <a
                    href="/kennismaken-en-aanmelden"
                    className="btn-primary w-full text-center"
                  >
                    Aanmelden
                  </a>
                </div>

                <div className="mt-4">
                  <a
                    href="/contact"
                    className="btn-secondary w-full text-center"
                  >
                    Vragen? Neem contact op
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CTA
        title="Interesse in dit traject?"
        description="Vul het aanmeldformulier in of neem contact met ons op voor meer informatie."
        primaryText="Kennismaken & aanmelden"
        primaryLink="/kennismaken-en-aanmelden"
        secondaryText="Andere trajecten bekijken"
        secondaryLink="/wat-we-bieden"
      />
    </>
  );
}

