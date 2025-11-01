import { Accordion, AccordionItem } from "./ui/accordion";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-12 bg-neutral-50 rounded-lg">
        <p className="text-neutral-600">
          Er zijn nog geen veelgestelde vragen beschikbaar.
        </p>
      </div>
    );
  }

  return (
    <Accordion>
      {faqs.map((faq, index) => (
        <AccordionItem
          key={faq._id}
          title={faq.question}
          defaultOpen={index === 0}
        >
          <p className="whitespace-pre-line">{faq.answer}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}



