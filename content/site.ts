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
  name: "HIDRO MONT JOVANČIĆ",
  tagline: "Vodovodne i kanalizacione instalacije",
  phone: "+381 63 701 2339",
  email: "hidromontjovancic@gmail.com",
  address: "Moravske divizije 36, Nis 18000",
  workingHours: "Pon - Sub, 07:00 - 17:00",
};

export const heroSlides: HeroSlide[] = [
  {
    title: "HIDRO MONT JOVANČIĆ",
    kicker: "HIDRO MONT JOVANČIĆ",
    description: "Vodovodne i kanalizacione instalacije za stambene, poslovne i infrastrukturne objekte.",
    ctaLabel: "Posalji upit",
    ctaHref: "/kontakt#forma",
    image: "/oldsite/p1.jpg",
  },
  {
    title: "HIDRO MONT JOVANČIĆ",
    kicker: "Infrastrukturni i terenski radovi",
    description: "Ugradnja infrastrukture vodovoda i kanalizacije uz pripremu terena i iskope.",
    ctaLabel: "Kontakt",
    ctaHref: "/kontakt#forma",
    image: "/oldsite/p2.jpg",
  },
  {
    title: "HIDRO MONT JOVANČIĆ",
    kicker: "Sanitarije, PP instalacije i bojeri",
    description: "Montaza sanitarije, protivpozarnih instalacija i centralnih bojlera po projektu.",
    ctaLabel: "Pogledaj usluge",
    ctaHref: "/usluge",
    image: "/oldsite/p3.jpg",
  },
  {
    title: "HIDRO MONT JOVANČIĆ",
    kicker: "Iskopi i zemljani radovi",
    description: "Pruzanje usluga zemljanih radova, rusenja objekata i svih vrsta iskopa.",
    ctaLabel: "Posalji upit",
    ctaHref: "/kontakt#forma",
    image: "/oldsite/p4.jpg",
  },
  {
    title: "HIDRO MONT JOVANČIĆ",
    kicker: "Vodovod i kanalizacija",
    description: "Pouzdan tim za kompletne instalacije i dugotrajna tehnicka resenja.",
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
    image: "/oldsite/usluge/usluga4.jpg",
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
