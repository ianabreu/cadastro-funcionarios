interface Timestamp {
  seconds: number;
  nanoseconds: number;
}
export function formatDate(date: Date): string {
  const dateToUnknown = date as unknown;
  const timestamp = dateToUnknown as Timestamp;

  let formatedDate = new Date(timestamp.seconds * 1000);

  return formatedDate.toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateToString(date: Date) {
  return date.toString().split("-").reverse().join("/");
}
export function returnDateFormat(date: string) {
  return date.split("/").reverse().join("-");
}
