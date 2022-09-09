export const getPriceValue = (price: string) => {
  const [miles, money] = price.split("+");
  const numberMoney = Number(
    money.replace("AR$", "").replace(".", "").replace(",", ".").trim()
  );
  const numberMiles = Number(miles.replace(".", "").replace(",", ".").trim());

  return numberMoney + 0.7 * numberMiles;
};
