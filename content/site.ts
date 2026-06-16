export type HeroSlide = {
  title: string;
  kicker: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export type Stat = {
  label: string;
  value: string;
};

export const company = {
  name: "HIDRO MONT JOVANCIC",
  tagline: "Vodovodne i kanalizacione instalacije",
  phone: "+381 63 701 2339",
  email: "hidromontjovancic@gmail.com",
  address: "Moravske divizije 36, Nis 18000",
  workingHours: "Pon - Sub, 07:00 - 17:00",
};

export const heroSlides: HeroSlide[] = [
  {
    title: "Vodovod i kanalizacija",
    kicker: "HIDRO MONT JOVANCIC",
    description: "Izvodjenje instalacija, PP mreza i iskopa u Nisu i okolini.",
    ctaLabel: "Posalji upit",
    ctaHref: "/kontakt#forma",
    image: "/oldsite/p1.jpg",
  },
  {
    title: "Infrastrukturni radovi",
    kicker: "Infrastrukturni i terenski radovi",
    description: "Ulicne mreze, priprema terena i masinski iskopi.",
    ctaLabel: "Kontakt",
    ctaHref: "/kontakt#forma",
    image: "/oldsite/p2.jpg",
  },
  {
    title: "Sanitarije i PP instalacije",
    kicker: "Sanitarije, PP instalacije i bojeri",
    description: "Montaza sanitarije, PP instalacija, pumpi i centralnih bojlera.",
    ctaLabel: "Pogledaj usluge",
    ctaHref: "/usluge",
    image: "/oldsite/p3.jpg",
  },
  {
    title: "Iskopi i zemljani radovi",
    kicker: "Iskopi i zemljani radovi",
    description: "Zemljani radovi, rusenje objekata i priprema gradilista.",
    ctaLabel: "Posalji upit",
    ctaHref: "/kontakt#forma",
    image: "/oldsite/p4.jpg",
  },
  {
    title: "Kompletna izvedba",
    kicker: "Vodovod i kanalizacija",
    description: "Od iskopa do zavrsne montaze, po projektu i u roku.",
    ctaLabel: "Kontakt",
    ctaHref: "/kontakt#forma",
    image: "/oldsite/p5.jpg",
  },
];
export const services: Service[] = [
  {
    slug: "vodovodne-i-kanalizacione-instalacije",
    title: "Vodovodne i kanalizacione instalacije",
    description: "Kompletna izvedba unutrasnjih instalacija vode i kanalizacije za sve tipove objekata.",
    image: "/oldsite/usluge/usluga1.jpg",
  },
  {
    slug: "ulicna-vodovodna-i-kanalizaciona-mreza",
    title: "Ulicna vodovodna i kanalizaciona mreza",
    description: "Ugradnja infrastrukture vodovoda i kanalizacije u ulicnoj mrezi.",
    image: "/oldsite/usluge/usluga2.jpg",
  },
  {
    slug: "montaza-sanitarije-i-galanterije",
    title: "Montaza sanitarije i galanterije",
    description: "Profesionalna Montaza sanitarnih elemenata i pratece opreme.",
    image: "/oldsite/usluge/usluga3.jpg",
  },
  {
    slug: "protivpozarne-instalacije",
    title: "Protivpozarne instalacije",
    description: "Izvodjenje radova na protivpozarnoj instalaciji po tehnickim standardima.",
    image: "/img/services/protivpozarne-instalacije.jpg",
  },
  {
    slug: "zemljani-radovi-i-iskopi",
    title: "Zemljani radovi i iskopi",
    description: "Pruzanje usluga zemljanih radova, rusenja objekata i svih vrsta iskopa.",
    image: "/oldsite/usluge/usluga5.jpg",
  },
  {
    slug: "instalacija-pumpi-i-centralnih-bojlera",
    title: "Instalacija pumpi i centralnih bojlera",
    description: "Montaza i pustanje u rad pumpi, bojlera i pratece instalacione opreme.",
    image: "/oldsite/usluge/usluga6.jpg",
  },
];

export const stats: Stat[] = [
  { label: "Godina iskustva", value: "10+" },
  { label: "Realizovanih projekata", value: "300+" },
  { label: "Servisnih intervencija", value: "1000+" },
  { label: "Dostupnost", value: "6 dana nedeljno" },
];

export const aboutHighlights = [
  "Iskusan tim za instalaterske i gradjevinske radove",
  "Kompletna usluga od iskopa do zavrsne montaze",
  "Rad po standardima i projektnim zahtevima",
  "Pouzdana komunikacija i postovanje rokova",
];

export type Video = {
  title: string;
  youtubeId: string;
  ratio?: "portrait" | "landscape";
};

export const videos: Video[] = [
  { title: "Pregled radova", youtubeId: "07E0MTRD5PI", ratio: "landscape" },
  { title: "Instalacije na terenu", youtubeId: "ziqyEvYtA5o", ratio: "landscape" },
  { title: "Priprema i iskop", youtubeId: "Gpk-jR2Tu2E", ratio: "landscape" },
];
