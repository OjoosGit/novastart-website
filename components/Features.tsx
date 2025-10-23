import { Container } from "./Container";
import { Section } from "./Section";
import { Users, Heart, Calendar } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  title?: string;
  features: Feature[];
}

const iconMap: { [key: string]: any } = {
  users: Users,
  heart: Heart,
  calendar: Calendar,
};

export function Features({ title, features }: FeaturesProps) {
  return (
    <Section background="neutral">
      <Container>
        {title && <h2 className="text-center mb-12">{title}</h2>}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Users;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-h3 mb-3">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

