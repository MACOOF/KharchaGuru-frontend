import { cookies } from "next/headers";

export const getServerLanguageCode = () => {
  return cookies().get("locale")?.value || "en"; // Default to "en"
};
