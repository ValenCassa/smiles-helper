import Spinner from "components/Spinner";
import { AnimatePresence } from "framer-motion";
import { useFlights } from "hooks/useFlights";
import { ReactNode } from "react";
import { Flight } from "types/Flight";
import styles from "./styles/FlightsInfo.module.css";
import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const Badge = ({
  text,
  bgColor,
  color,
}: {
  text: ReactNode;
  bgColor: string;
  color: string;
}) => {
  return (
    <span className={styles.badge} style={{ backgroundColor: bgColor, color }}>
      {text}
    </span>
  );
};

const FlightRow = ({ flight }: { flight: Flight }) => {
  return (
    <tr className={styles.row}>
      <div className={styles.first}>
        <p className={styles.company}>{flight.company}</p>
        <p className={styles.flight}>
          {new Date(flight.date).toLocaleDateString()}
        </p>
      </div>
      <div className={styles.badges}>
        <Badge text={flight.layover} bgColor={"#EAEAEA"} color="#8C8C8C" />
        <Badge
          text={flight.duration + " hs"}
          bgColor={"#C9BEF6"}
          color="#664CCF"
        />
        <Badge
          text={`${flight.milesClubPrice} / ${flight.milesClubMoneyPrice}`}
          bgColor={"#EAEAEA"}
          color="#8C8C8C"
        />
        <Badge
          text={`${flight.milesNormalPrice} / ${flight.milesNormalMoneyPrice}`}
          bgColor={"#F6E7BE"}
          color="#C39439"
        />
      </div>
    </tr>
  );
};

const FlightTable = () => {
  const { flights } = useFlights();

  if (flights.length === 0) return <p>No se encontraron vuelos!</p>;

  return (
    <motion.table
      className={styles.table}
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <tbody>
        {flights.map((flight, index) => (
          <FlightRow flight={flight} key={index} />
        ))}
      </tbody>
    </motion.table>
  );
};

const FlightsInfo = () => {
  const { isLoading } = useFlights();

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.title}>VUELOS</h3>
      </div>
      <AnimatePresence initial mode="wait">
        {isLoading ? (
          <div className={styles.isLoading} key="loading">
            <Spinner />
          </div>
        ) : (
          <FlightTable key={"table"} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlightsInfo;
