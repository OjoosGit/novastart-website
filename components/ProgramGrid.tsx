import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Section } from "./Section";
import { Clock } from "lucide-react";
import { urlFor } from "@/cms/queries";

interface Program {
  _id: string;
  title: string;
  slug: { current: string };
  intro?: string;
  doelgroep?: string;
  duur?: string;
  image?: any;
}

interface ProgramGridProps {
  programs: Program[];
}

export function ProgramGrid({ programs }: ProgramGridProps) {
  if (!programs || programs.length === 0) {
    return (
      <Section>
        <Container>
          <div className="text-center py-12">
            <p className="text-neutral-600">
              Er zijn nog geen trajecten beschikbaar. Check later opnieuw!
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <article
              key={program._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="relative aspect-[16/9] bg-neutral-200">
                {program.image ? (
                  <Image
                    src={urlFor(program.image).width(600).height(400).url()}
                    alt={program.image.alt || program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-neutral-400">
                    <span>Geen afbeelding</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-h3 mb-2 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                
                {program.doelgroep && (
                  <p className="text-sm text-primary font-medium mb-2">
                    {program.doelgroep}
                  </p>
                )}

                {program.intro && (
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {program.intro}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  {program.duur && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock className="w-4 h-4" />
                      <span>{program.duur}</span>
                    </div>
                  )}
                  <Link
                    href={`/wat-we-bieden/${program.slug.current}`}
                    className="text-primary font-medium hover:underline focus-visible-ring"
                  >
                    Lees meer →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}



