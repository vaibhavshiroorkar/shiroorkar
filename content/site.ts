export const site = {
  brand: "Shiroorkar",
  person: "Udaykumar Shiroorkar",
  firstName: "Udaykumar",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://uday.shiroorkar.com",
  description:
    "The work, journey and initiatives of Udaykumar Shiroorkar: environmental responsibility, public service and community impact. Invite him to speak, run a workshop or collaborate.",
  email: "shiroorkarur@gmail.com",
  /**
   * WhatsApp number in international format, digits only (e.g. "919800000000").
   * Leave empty to hide every WhatsApp button.
   */
  whatsapp: "",
  socials: [
    {
      label: "Instagram",
      handle: "@udaykumarshiroorkar",
      url: "https://www.instagram.com/udaykumarshiroorkar/",
    },
    {
      label: "LinkedIn",
      handle: "Udaykumar Shiroorkar",
      url: "https://www.linkedin.com/in/dr-udaykumar-ir-shiroorkar-9353472a/",
    },
    {
      label: "Facebook",
      handle: "Udaykumar IR Shiroorkar",
      url: "https://www.facebook.com/udaykumar.shiroorkar/",
    },
    {
      label: "X",
      handle: "@shiroorkarur",
      url: "https://x.com/shiroorkarur",
    },
  ],
  nav: [
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/media", label: "Media" },
    { href: "/speaking", label: "Speaking" },
  ],
} as const;

export const instagram = site.socials[0];

export function whatsappLink(text?: string) {
  if (!site.whatsapp) return null;
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${site.whatsapp}${q}`;
}
