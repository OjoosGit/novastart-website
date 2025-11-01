import Image from "next/image";
import { urlFor } from "@/cms/queries";
import { Mail, Phone } from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: any;
  email?: string;
  phone?: string;
}

interface TeamGridProps {
  team: TeamMember[];
}

export function TeamGrid({ team }: TeamGridProps) {
  if (!team || team.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600">
          Teamleden worden binnenkort toegevoegd.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map((member) => (
        <div
          key={member._id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div className="relative aspect-square bg-neutral-200">
            {member.photo ? (
              <Image
                src={urlFor(member.photo).width(400).height(400).url()}
                alt={member.photo.alt || member.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-400">
                <span>Geen foto</span>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-h3 mb-1">{member.name}</h3>
            <p className="text-primary font-medium mb-3">{member.role}</p>
            
            {member.bio && (
              <p className="text-neutral-600 text-sm mb-4">{member.bio}</p>
            )}

            <div className="flex flex-col gap-2">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline focus-visible-ring"
                >
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                </a>
              )}
              
              {member.phone && (
                <a
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline focus-visible-ring"
                >
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

