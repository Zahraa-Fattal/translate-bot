const BASE_URL = "https://google-translate113.p.rapidapi.com/api/v1/translator";
const RAPIDAPI_KEY = "397c979264mshca26476720a5ca3p18d30bjsn063846e50c65";

const headers = {
  "Content-Type": "application/json",
  "x-rapidapi-key": RAPIDAPI_KEY,
  "x-rapidapi-host": "google-translate113.p.rapidapi.com",
};

export const detectLanguage = async (text) => {
  const response = await fetch(`${BASE_URL}/detect-language`, {
    method: "POST",
    headers,
    body: JSON.stringify({ text }),
  });
  if (!response.ok) throw new Error("Language detection failed");
  return await response.json();
};

export const translateText = async (text, toLang = "en", fromLang = "auto") => {
  const response = await fetch(`${BASE_URL}/text`, {
    method: "POST",
    headers,
    body: JSON.stringify({ from: fromLang, to: toLang, text }),
  });
  if (!response.ok) throw new Error("Translation failed");
  return await response.json();
};

export const getSupportedLanguages = async () => {
  const response = await fetch(`${BASE_URL}/support-languages`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to load languages");
  return await response.json();
};
