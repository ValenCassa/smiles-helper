import { BrowserContext } from "playwright";
import { Sort } from "./Sort";

export interface FlightSearch {
  date: Date;
  origin: string;
  destination: string;
}

export interface PageScrapping extends FlightSearch {
  context: BrowserContext;
}

export interface FlightPayload {
  origin: string;
  destination: string;
  from: string;
  to: string;
  sort: Sort;
}

export interface Flight {
  origin: string;
  destination: string;
  date: Date;
  layover: string;
  duration: string;
  milesClubPrice: string;
  milesClubMoneyPrice: string;
  milesNormalMoneyPrice: string;
  milesNormalPrice: string;
  company: string;
}
