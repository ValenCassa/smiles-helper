import { NextApiRequest, NextApiResponse } from "next";
import playwright from "playwright";
import { Flight, FlightSearch, PageScrapping } from "types/Flight";
import { Sort } from "types/Sort";
import { getDates } from "./getDates";
import { sortFlights } from "./sortFlights";
import { addDays } from "date-fns";

interface FlightScrapping {
  req: NextApiRequest;
  res: NextApiResponse;
}

const getPageURL = ({ date, origin, destination }: FlightSearch) => {
  return `https://www.smiles.com.ar/emission?originAirportCode=${origin}&destinationAirportCode=${destination}&departureDate=${new Date(
    date
  ).valueOf()}&adults=1&children=0&infants=0&isFlexibleDateChecked=false&tripType=2&cabinType=all&currencyCode=BRL`;
};

const pageScrapping = async ({
  date,
  origin,
  destination,
  context,
}: PageScrapping) => {
  const url = getPageURL({ date: addDays(date, 1), origin, destination });
  const page = await context.newPage();
  await page.goto(url, { timeout: 30000 });
  await page.waitForSelector('div[class="group-info-flights"]', {
    timeout: 70000,
  });
  const data = await page.evaluate(() => {
    const formatMoneyPrice = (price: string) => {
      const [miles, money] = price.split("+");
      const numberMoney = money.trim();
      const numberMiles = miles.trim();

      return `${numberMiles} + ${numberMoney}`;
    };
    const flights = document.querySelectorAll(
      'div[class="group-info-flights"]'
    );
    const flightsArray = Array.from(flights);
    const flightsData = flightsArray.map((flight) => {
      const layover = flight.querySelector(
        'div[class="travel-stops"]'
      )?.textContent;
      const duration = flight.querySelector(
        'div[class="travel-duration"]'
      )?.textContent;

      const milesClubPrice = flight.querySelector(
        'div[class="miles-group"] div[class="miles"] li[class="list-group-item club"] span'
      )?.textContent;

      const milesNormalPrice = flight.querySelector(
        'div[class="miles-group"] div[class="miles"] li:not(.club) span'
      )?.textContent;

      const milesClubMoneyPrice = flight.querySelector(
        'div[class="miles-group"] div[class="miles-money"] li[class="list-group-item club"] label[class="form-check-label"] span'
      )?.textContent;

      const milesNormalMoneyPrice = flight.querySelectorAll(
        'div[class="miles-group"] div[class="miles-money"] li:not(.club) label[class="form-check-label"] span'
      )[0]?.textContent;

      const companyQuery = Array.from(flight.querySelectorAll("span")).find(
        (e: any) => e.textContent.includes("Operado por")
      )?.textContent;

      const [_, company] = (companyQuery as string).split("* Operado por ");

      return {
        layover,
        duration,
        milesClubPrice,
        milesClubMoneyPrice: formatMoneyPrice(milesClubMoneyPrice as string),
        milesNormalMoneyPrice: formatMoneyPrice(
          milesNormalMoneyPrice as string
        ),
        milesNormalPrice,
        company,
      };
    });
    return flightsData;
  });

  const formattedData = data.map((item) => ({
    ...item,
    origin,
    destination,
    date,
  }));
  await page.close();
  return formattedData;
};

const flightsScrapping = async ({ req, res }: FlightScrapping) => {
  const { query } = req;
  const { from, to, origin, destination, sort = "money" } = query;
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();

  const dates = getDates(new Date(from as string), new Date(to as string));
  try {
    const flights: any = await Promise.allSettled(
      dates.map((date) =>
        pageScrapping({
          date,
          origin: (origin as string).toUpperCase(),
          destination: (destination as string).toUpperCase(),
          context,
        })
      )
    );
    await context.close();
    await browser.close();
    const mappedFlights: Flight[] = flights
      .filter((flight: any) => flight?.status === "fulfilled")
      .map((flight: any) => flight?.value);

    return sortFlights(mappedFlights.flat(), sort as Sort);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
};

export default flightsScrapping;
