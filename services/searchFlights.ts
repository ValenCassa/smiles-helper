import axios from "axios";
import { Flight, FlightPayload } from "types/Flight";

export const searchFlights = async ({
  origin,
  destination,
  from,
  to,
  sort = "money",
}: FlightPayload) => {
  const url = new URLSearchParams();
  url.append("origin", origin);
  url.append("destination", destination);
  url.append("from", from);
  url.append("to", to);
  url.append("sort", sort);
  try {
    const flights = await axios.get<Flight[]>(`/api/flights?${url.toString()}`);
    return flights.data;
  } catch (e) {
    return [];
  }
};
