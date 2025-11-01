import Image from "next/image";
import { urlFor } from "@/cms/queries";

interface Partner {
  _id: string;
  name: string;
  logo?: any;
  url?: string;
  description?: string;
}

interface PartnerGridProps {
  partners: Partner[];
}

export function PartnerGrid({ partners }: PartnerGridProps) {
  if (!partners || partners.length === 0) {
    return (
      <div className="text-center py-12 bg-neutral-50 rounded-lg">
        <p className="text-neutral-600">
          Partners worden binnenkort toegevoegd.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {partners.map((partner) => {
        const content = (
          <>
            <div className="relative h-24 bg-neutral-50 rounded-lg flex items-center justify-center mb-4">
              {partner.logo ? (
                <Image
                  src={urlFor(partner.logo).width(200).height(100).url()}
                  alt={partner.logo.alt || partner.name}
                  width={200}
                  height={100}
                  className="object-contain"
                />
              ) : (
                <span className="text-neutral-400 font-semibold">
                  {partner.name}
                </span>
              )}
            </div>
            <h3 className="font-semibold mb-2">{partner.name}</h3>
            {partner.description && (
              <p className="text-sm text-neutral-600">{partner.description}</p>
            )}
          </>
        );

        if (partner.url) {
          return (
            <a
              key={partner._id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-6 rounded-lg border border-neutral-200 hover:border-primary hover:shadow-md transition-all focus-visible-ring"
            >
              {content}
            </a>
          );
        }

        return (
          <div
            key={partner._id}
            className="bg-white p-6 rounded-lg border border-neutral-200"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}



