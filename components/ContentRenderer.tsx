interface TextSection {
  _type: 'textSection';
  heading?: string;
  content: string;
  lead?: boolean;
}

interface GridSection {
  _type: 'gridSection';
  heading?: string;
  items: Array<{
    title: string;
    content: string;
  }>;
}

interface ProcessSteps {
  _type: 'processSteps';
  heading?: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
}

interface ContactPersons {
  _type: 'contactPersons';
  heading?: string;
  intro?: string;
  persons: Array<{
    name: string;
    role?: string;
    phone?: string;
    email?: string;
  }>;
}

type Section = TextSection | GridSection | ProcessSteps | ContactPersons;

interface ContentRendererProps {
  sections: Section[];
}

export function ContentRenderer({ sections }: ContentRendererProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => {
        switch (section._type) {
          case 'textSection':
            return (
              <div key={index} className="mb-12">
                {section.heading && (
                  <h2 className="text-h2 mb-6">{section.heading}</h2>
                )}
                <p
                  className={section.lead ? 'text-lead' : 'text-neutral-600'}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {section.content}
                </p>
              </div>
            );

          case 'gridSection':
            return (
              <div key={index} className="mb-12">
                {section.heading && (
                  <h2 className="text-h2 mb-8">{section.heading}</h2>
                )}
                <div className="grid md:grid-cols-2 gap-8">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-white p-6 rounded-lg shadow-sm"
                    >
                      <h3 className="text-h3 mb-4">{item.title}</h3>
                      <p className="text-neutral-600">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'processSteps':
            return (
              <div key={index} className="mb-12">
                {section.heading && (
                  <h2 className="text-h2 mb-6">{section.heading}</h2>
                )}
                <div className="space-y-6">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                        {stepIndex + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-neutral-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'contactPersons':
            return (
              <div
                key={index}
                className="p-6 bg-neutral-50 rounded-lg border border-neutral-200 mb-12"
              >
                {section.heading && (
                  <h3 className="font-semibold mb-2">{section.heading}</h3>
                )}
                {section.intro && (
                  <p className="text-neutral-600 mb-4">{section.intro}</p>
                )}
                <div className="space-y-3 mt-4">
                  {section.persons.map((person, personIndex) => (
                    <div key={personIndex}>
                      <p className="text-sm font-medium text-neutral-700">
                        {person.name}
                      </p>
                      {person.role && (
                        <p className="text-sm text-neutral-600">
                          {person.role}
                        </p>
                      )}
                      {person.phone && (
                        <a
                          href={`tel:${person.phone.replace(/\s/g, '')}`}
                          className="text-primary hover:underline font-semibold"
                        >
                          {person.phone}
                        </a>
                      )}
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="text-primary hover:underline text-sm block"
                        >
                          {person.email}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

