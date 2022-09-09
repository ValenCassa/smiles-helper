import styles from "./styles/Select.module.css";
import FilterIcon from "public/svg/FilterIcon.svg";
import { ErrorMessage, useField } from "formik";
import { useState } from "react";
import ReactSelect from "react-select";

interface Options {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label: string;
  options: Options[];
  defaultValue?: Options;
}

const Select = ({ name, label, options, defaultValue }: Props) => {
  const [value, setValue] = useState<any>(defaultValue ? defaultValue : null);
  const [field, meta, helpers] = useField(name);

  const onChange = (e: any) => {
    setValue(e);
    helpers.setValue(e.value);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <span className={styles.icon}>
        <FilterIcon />
      </span>
      <ReactSelect
        options={options}
        value={value}
        onChange={onChange}
        onBlur={() => {
          setTimeout(() => {
            helpers.setTouched(true);
          }, 50);
        }}
        classNamePrefix={"react-select"}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <span className={styles.error}>{msg}</span>}
      />
    </div>
  );
};

export default Select;
