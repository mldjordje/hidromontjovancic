"use client";

import { Accordion, AccordionItem, Card, CardBody, Chip } from "@heroui/react";

const processSteps = [
  {
    title: "1. Izlazak na teren",
    text: "Obilazimo lokaciju, procenjujemo stanje i dogovaramo obim radova.",
  },
  {
    title: "2. Plan i ponuda",
    text: "Pripremamo jasnu ponudu sa fazama izvođenja i rokovima.",
  },
  {
    title: "3. Izvođenje radova",
    text: "Radimo po projektu, uz kontrolu kvaliteta u svakoj fazi.",
  },
  {
    title: "4. Primopredaja",
    text: "Po završetku radova radimo proveru i predaju objekta investitoru.",
  },
];

const faqItems = [
  {
    key: "1",
    title: "Da li radite i manje intervencije?",
    text: "Da. Pored većih projekata radimo i manje zahvate i adaptacije instalacija.",
  },
  {
    key: "2",
    title: "Na kojim lokacijama izvodite radove?",
    text: "Primarno u Nišu i okolini, a po dogovoru i na drugim lokacijama u Srbiji.",
  },
  {
    key: "3",
    title: "Da li projekti mogu da se prate online?",
    text: "Da. Završeni projekti se objavljuju na sajtu kroz admin panel.",
  },
];

export default function ProcessAndFaq() {
  return (
    <section className="content-section space-y-8">
      <div className="space-y-2">
        <Chip size="sm" className="bg-primary/15 text-dark">
          Kako radimo
        </Chip>
        <h2 className="text-3xl font-bold text-dark sm:text-4xl">Jasan proces rada od početka do kraja</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step) => (
          <Card key={step.title} shadow="sm" className="border border-black/5 bg-white">
            <CardBody className="space-y-2 p-5">
              <h3 className="text-base font-semibold text-dark">{step.title}</h3>
              <p className="text-sm text-gray-700">{step.text}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-4 text-xl font-semibold text-dark">Česta pitanja</h3>
        <Accordion variant="splitted" itemClasses={{ base: "shadow-none border border-black/5" }}>
          {faqItems.map((item) => (
            <AccordionItem key={item.key} aria-label={item.title} title={item.title}>
              <p className="text-sm text-gray-700">{item.text}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
