export function dayFormatDate(dateString: string, locale: string = "en-US") {
  if (!dateString) return "";
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export function hourFormatDate(dateString: string, locale: string = "en-US") {
  if (!dateString) return "";
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    hour12: true,
  }).format(new Date(dateString));
}
