import { HeaderClient } from "./HeaderClient";
import { getSiteSettings } from "@/cms/queries";

type NavigationItem = {
  name: string;
  href?: string;
  children?: Array<{ name: string; href: string }>;
};

type HeaderCTA = {
  text: string;
  href: string;
};

// Fallback data als Sanity niet beschikbaar is
const defaultNavigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Wat we bieden", href: "/wat-we-bieden" },
  { 
    name: "Over ons", 
    children: [
      { name: "Waar we voor staan", href: "/waar-we-voor-staan" },
      { name: "Wie we zijn", href: "/wie-we-zijn" },
      { name: "Kwaliteit", href: "/kwaliteit" },
      { name: "Samenwerkingen", href: "/samenwerkingen" },
    ]
  },
  { name: "Voor ouders", href: "/voor-ouders" },
  { name: "Contact", href: "/contact" },
];

const defaultCTA: HeaderCTA = {
  text: "Kennismaken & aanmelden",
  href: "/kennismaken-en-aanmelden"
};

export async function Header() {
  const siteSettings = await getSiteSettings();
  
  const navigation = siteSettings?.headerNavigation || defaultNavigation;
  const cta = siteSettings?.headerCTA || defaultCTA;
  const siteTitle = siteSettings?.siteTitle || "Novastart";

  return <HeaderClient navigation={navigation} cta={cta} siteTitle={siteTitle} />;
}
