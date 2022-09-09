import { ErrorMessage, useField } from "formik";
import styles from "./styles/Input.module.css";
import FlightIcon from "public/svg/FlightIcon.svg";
import { useState } from "react";

interface Props {
  label: string;
  name: string;
}

const Input = ({ label, name }: Props) => {
  const [field, meta, helpers] = useField(name);
  const [focus, setFocus] = useState<boolean>(false);

  const onChange = (e: any) => {
    helpers.setValue(e.target.value.toUpperCase());
  };

  const hasValue = meta.value || focus;

  const idType = name === "origin" ? styles.origin : styles.destination;

  return (
    <div className={styles.container}>
      <div
        className={styles.inputContainer}
        id={hasValue ? styles.hasValue : undefined}
      >
        <label
          className={styles.label}
          id={hasValue ? styles.hasValue : undefined}
        >
          {label}
        </label>

        <span
          className={`${styles.icon} ${hasValue ? styles.iconActive : ""}`}
          id={idType}
        >
          <FlightIcon />
        </span>
        <input
          onChange={onChange}
          value={meta.value}
          className={styles.input}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false);
            helpers.setTouched(true);
          }}
        />
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => <span className={styles.error}>{msg}</span>}
      />
    </div>
  );
};

export default Input;
