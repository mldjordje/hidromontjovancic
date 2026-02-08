export type HeroSlide = {
  title: string;
  kicker: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

export type Service = {
  title: string;
  description: string;
  image: string;
};

export type Stat = {
  label: string;
  value: string;
};

export const company = {
  name: "Hidromont Jovancic",
  tagline: "Vodovodne i kanalizacione instalacije",
  phone: "+381 63 701 2339",
  email: "hidromontjovancic@gmail.com",
  address: "Moravske divizije 36, Nis 18000",
  workingHours: "Pon - Sub, 08:00 - 18:00",
};

export const heroSlides: HeroSlide[] = [
  {
    title: "Pouzdani vodoinstalaterski radovi",
    kicker: "Hidromont Jovancic",
    description: "Izvodjenje vodovodnih i kanalizacionih instalacija za stambene i poslovne objekte.",
    ctaLabel: "Posalji upit",
    ctaHref: "/kontakt#forma",
    image: "/img/napolje1.webp",
  },
  {
    title: "Kompletna infrastruktura na terenu",
    kicker: "Instalacije i zemljani radovi",
    description: "Ugradnja ulicne vodovodne i kanalizacione mreze sa pripremom terena i iskopima.",
    ctaLabel: "Kontakt",
    ctaHref: "/kontakt#forma",
    image: "/img/napolje2.webp",
  },
  {
    title: "Iskusan tim za zavrsne radove",
    kicker: "Sanitarije, PP instalacije i bojeri",
    description: "Montaza sanitarije, protivpozarnih instalacija i centralnih bojlera po projektu.",
    ctaLabel: "Pogledaj usluge",
    ctaHref: "/usluge",
    image: "/img/rad1.webp",
  },
];

export const services: Service[] = [
  {
    title: "Vodovodne i kanalizacione instalacije",
    description: "Kompletna izvedba unutrasnjih instalacija vode i kanalizacije za sve tipove objekata.",
    image: "/img/rad1.webp",
  },
  {
    title: "Ulicna vodovodna i kanalizaciona mreza",
    description: "Ugradnja infrastrukture vodovoda i kanalizacije u ulicnoj mrezi.",
    image: "/img/napolje2.webp",
  },
  {
    title: "Montaza sanitarije i galanterije",
    description: "Profesionalna Montaza sanitarnih elemenata i pratece opreme.",
    image: "/img/uterivac.webp",
  },
  {
    title: "Protivpozarne instalacije",
    description: "Izvodjenje radova na protivpozarnoj instalaciji po tehnickim standardima.",
    image: "/img/vozila2.webp",
  },
  {
    title: "Zemljani radovi i iskopi",
    description: "Pruzanje usluga zemljanih radova, rusenja objekata i svih vrsta iskopa.",
    image: "/img/kamionislika1.webp",
  },
  {
    title: "Instalacija pumpi i centralnih bojlera",
    description: "Montaza i pustanje u rad pumpi, bojlera i pratece instalacione opreme.",
    image: "/img/rad2.webp",
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
