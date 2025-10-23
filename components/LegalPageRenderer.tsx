interface LegalSection {
  heading: string;
  content: string;
  list?: string[];
}

interface LegalPageRendererProps {
  intro?: string;
  sections: LegalSection[];
  lastUpdated?: string;
}

export function LegalPageRenderer({ intro, sections, lastUpdated }: LegalPageRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {intro && (
        <p className="lead">{intro}</p>
      )}

      {sections.map((section, index) => (
        <div key={index}>
          <h2>{section.heading}</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
          {section.list && section.list.length > 0 && (
            <ul>
              {section.list.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {lastUpdated && (
        <p className="text-sm text-neutral-600 mt-8">
          <strong>Laatst bijgewerkt:</strong> {new Date(lastUpdated).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long' })}
        </p>
      )}
    </div>
  );
}

