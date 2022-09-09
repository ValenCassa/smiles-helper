import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Flight } from "types/Flight";
import { Sort } from "types/Sort";

interface FlightContextProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  flights: Flight[];
  setFlights: Dispatch<SetStateAction<Flight[]>>;
  error: any;
  setError: Dispatch<SetStateAction<any>>;
}

export const FlightContext = createContext<FlightContextProps>({
  isLoading: false,
  setIsLoading: () => {},
  flights: [],
  setFlights: () => {},
  error: null,
  setError: () => {},
});

const FlightContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState(null);

  return (
    <FlightContext.Provider
      value={{
        isLoading,
        setIsLoading,
        flights,
        setFlights,
        error,
        setError,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export default FlightContextProvider;
