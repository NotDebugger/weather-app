export function currentTimeFormatDate(
  dateString: string,
  locale: string = "en-US",
) {
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
    hour: "numeric",
    hour12: true,
  }).format(new Date(dateString));
}
export function dayFormatDate(dateString: string, locale: string = "en-US") {
  if (!dateString) return "";

  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
  }).format(new Date(dateString));
}
export function dayFormatDateShort(
  dateString: string,
  locale: string = "en-US",
) {
  if (!dateString) return "";

  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
  }).format(new Date(dateString));
}

export function getCurrentTime() {
  const now = new Date();
  const currentTime =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0") +
    "T" +
    String(now.getHours()).padStart(2, "0") +
    ":00";

  const currentDay = dayFormatDate(currentTime);

  return { currentTime, currentDay };
}
