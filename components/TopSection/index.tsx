import styles from "./styles/TopSection.module.css";
import Logo from "public/svg/Logo.svg";
import _ from "lodash";

const TopSection = () => {
  const date = `AR • ${_.upperFirst(
    new Date().toLocaleDateString(undefined, { dateStyle: "full" })
  )}`;

  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.greeting}>
        <span className={styles.date}>{date}</span>
        <div className={styles.hello}>
          Hola! <br />
          Completá los campos y encontrá las mejores ofertas para vos!
        </div>
      </div>
    </section>
  );
};

export default TopSection;
