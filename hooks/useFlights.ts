import { FlightContext } from "context/FlightsContext";
import { useContext } from "react";

export const useFlights = () => useContext(FlightContext);
