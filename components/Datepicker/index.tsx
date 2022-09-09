import { ErrorMessage, useField } from "formik";
import { startTransition, useState } from "react";
import { SingleDatePicker } from "react-dates";
import styles from "./styles/Datepicker.module.css";
import CalendarIcon from "public/svg/CalendarIcon.svg";
import { format } from "date-fns";

interface Props {
  name: string;
  label: string;
  isDayBlocked?: any;
}

const Datepicker = ({ name, label, isDayBlocked }: Props) => {
  const [selected, setSelected] = useState<any>(null);
  const [focused, setFocused] = useState<any>(false);
  const [field, meta, helpers] = useField(name);

  const onChange = (e: any) => {
    if (!e) return;
    setSelected(e);
    helpers.setValue(e._d);
  };

  const id = focused.focused || Boolean(selected) ? styles.focused : undefined;

  return (
    <div className={styles.container}>
      <label className={styles.label} id={id}>
        {label}
      </label>

      <span className={styles.icon} id={id}>
        <CalendarIcon />
      </span>
      <SingleDatePicker
        date={selected}
        onDateChange={onChange}
        id={name}
        focused={focused.focused}
        onFocusChange={({ focused }) => {
          setFocused({ focused });
        }}
        numberOfMonths={1}
        daySize={25}
        hideKeyboardShortcutsPanel
        placeholder=""
        noBorder
        small
        ariaLabel={Boolean(selected) ? "selected" : undefined}
        displayFormat="DD/MM/YYYY"
        keepOpenOnDateSelect={false}
        onClose={() => {
          setTimeout(() => {
            helpers.setTouched(true);
          }, 20);
        }}
        isDayBlocked={isDayBlocked}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <span className={styles.error}>{msg}</span>}
      />
    </div>
  );
};

export default Datepicker;
