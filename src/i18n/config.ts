export type Locale = (typeof locales)[number];

export const locales = ["en", "fr"] as const;

export const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "hi", name: "हिन्दी" },
  { code: "gu", name: "ગુજરાતી" }
];


export const defaultLocale:Locale = "fr";