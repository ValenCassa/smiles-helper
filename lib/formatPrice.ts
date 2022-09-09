export const formatMoneyPrice = (price: string) => {
  const [miles, money] = price.split("+");
  const numberMoney = money.trim();
  const numberMiles = miles.trim();

  return `${numberMoney} + ${numberMiles}`;
};
