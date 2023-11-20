export function formatWage(wage: number) {
  let value = Number(wage);
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
