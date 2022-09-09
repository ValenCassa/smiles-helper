import Datepicker from "components/Datepicker";
import Input from "components/Input";
import Select from "components/Select";
import { Formik, Form as FormikForm } from "formik";
import { useFlights } from "hooks/useFlights";
import { validationSchema } from "lib/validationSchemas";
import { searchFlights } from "services/searchFlights";
import { Flight } from "types/Flight";
import { Sort } from "types/Sort";
import styles from "./styles/Form.module.css";

const initialValues = {
  origin: "",
  destination: "",
  from: "",
  to: "",
  sort: "money" as Sort,
};

const options = [
  {
    value: "money",
    label: "Dinero",
  },
  {
    value: "duration",
    label: "Duración",
  },
  {
    value: "miles",
    label: "Millas",
  },
];

const Form = () => {
  const { isLoading, setIsLoading, setFlights } = useFlights();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setIsLoading(true);
        const data = await searchFlights(values);
        setFlights(data as Flight[]);
        setIsLoading(false);
        console.log(data);
      }}
    >
      {({ values }) => {
        return (
          <FormikForm>
            <div className={styles.form}>
              <Datepicker name="from" label="Desde" />
              <Datepicker
                name="to"
                label="Hasta"
                isDayBlocked={function (val: any) {
                  return new Date(val._d) <= new Date(values.from);
                }}
              />
              <Input name="origin" label="Origen" />
              <Input name="destination" label="Destino" />

              <div className={styles.buttonContainer}>
                <button
                  className={styles.submit}
                  type="submit"
                  disabled={isLoading}
                >
                  Buscar
                </button>
              </div>
            </div>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default Form;
