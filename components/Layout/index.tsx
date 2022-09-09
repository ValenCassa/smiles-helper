import { ReactNode } from "react";
import styles from "./styles/Layout.module.css";
import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={variants}
      initial={"initial"}
      animate="animate"
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={styles.container}
    >
      {children}
    </motion.div>
  );
};

export default Layout;
