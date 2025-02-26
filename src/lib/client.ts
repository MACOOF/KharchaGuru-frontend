export const getClientLanguageCode = () => {
  if (typeof document !== "undefined") {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1] || "en"; // Default to "en"
  }
  return "en"; // Fallback for SSR
};
