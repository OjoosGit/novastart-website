import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getContactInfo } from "@/cms/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Novastart",
  description: "Neem contact op met Novastart in Heerlen. Adres, telefoonnummer, e-mail en routebeschrijving.",
  openGraph: {
    title: "Contact - Novastart",
    description: "Neem contact op met Novastart in Heerlen.",
  },
};

export default async function ContactPage() {
  const contactInfo = await getContactInfo();
  return (
    <>
      <PageHero
        title="Contact"
        description="Neem contact met ons op"
        image="https://images.unsplash.com/photo-1596496050755-c923e73e42e1?q=80&w=2053&auto=format&fit=crop"
      />

      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-h2 mb-6">Contactgegevens</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adres</h3>
                    <p className="text-neutral-600">
                      {contactInfo?.organization && <><strong>{contactInfo.organization}</strong><br /></>}
                      {contactInfo?.address?.street || "Akerstraat 117"}<br />
                      {contactInfo?.address?.postalCode || "6417 BM"} {contactInfo?.address?.city || "Heerlen"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefoon</h3>
                    <a href={`tel:${(contactInfo?.phone || "0455713952").replace(/[\s-]/g, '')}`} className="text-primary hover:underline">
                      {contactInfo?.phone || "045 - 571 39 52"}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">E-mail</h3>
                    <a href={`mailto:${contactInfo?.email || "info@grotius-lvo.nl"}`} className="text-primary hover:underline">
                      {contactInfo?.email || "info@grotius-lvo.nl"}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Openingstijden</h3>
                    <p className="text-neutral-600" style={{ whiteSpace: 'pre-line' }}>
                      {contactInfo?.openingHours || "Maandag t/m vrijdag\n08:30 - 16:30 uur"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <h3 className="font-semibold mb-2">Let op</h3>
                <p className="text-neutral-600">
                  We werken alleen op afspraak. Neem vooraf contact op om een 
                  bezoek in te plannen.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-h2 mb-6">Locatie</h2>
              <div className="aspect-[4/3] bg-neutral-200 rounded-lg overflow-hidden">
                <iframe
                  src={contactInfo?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2510.7947147567847!2d5.971839!3d50.881947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDUyJzU1LjAiTiA1wrA1OCcxOC42IkU!5e0!3m2!1snl!2snl!4v1234567890"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locatie Novastart op Google Maps"
                ></iframe>
              </div>

              <div className="mt-6">
                {contactInfo?.publicTransport && (
                  <>
                    <h3 className="font-semibold mb-3">Met het openbaar vervoer</h3>
                    <p className="text-neutral-600 mb-4">
                      {contactInfo.publicTransport}
                    </p>
                  </>
                )}

                {contactInfo?.carParking && (
                  <>
                    <h3 className="font-semibold mb-3">Met de auto</h3>
                    <p className="text-neutral-600">
                      {contactInfo.carParking}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

