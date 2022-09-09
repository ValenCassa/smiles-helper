import { Flight } from "types/Flight";
import { Sort } from "types/Sort";
import { getPriceValue } from "./getPriceValue";
import { addHours, addMinutes } from "date-fns";

export const sortFlights = (flights: Flight[], sort: Sort) => {
  const sortedFlights = flights.sort((a, b) => {
    switch (sort) {
      case "money":
        return (
          getPriceValue(a.milesClubMoneyPrice) -
          getPriceValue(b.milesClubMoneyPrice)
        );
      case "duration":
        const [aHours, aMinutes] = a.duration.split(":");
        const [bHours, bMinutes] = b.duration.split(":");
        const aDuration = addMinutes(
          addHours(new Date(), Number(aHours)),
          Number(aMinutes)
        );
        const bDuration = addMinutes(
          addHours(new Date(), Number(bHours)),
          Number(bMinutes)
        );
        return aDuration.getTime() - bDuration.getTime();
      case "miles":
        const aNumber = Number(
          a.milesClubPrice.replace(".", "").replace(",", ".")
        );
        const bNumber = Number(
          b.milesClubPrice.replace(".", "").replace(",", ".")
        );
        return aNumber - bNumber;
      default:
        return (
          getPriceValue(a.milesClubMoneyPrice) -
          getPriceValue(b.milesClubMoneyPrice)
        );
    }
  });

  return sortedFlights.slice(0, 15);
};
