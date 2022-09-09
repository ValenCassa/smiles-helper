import { AnimatePresence, motion } from "framer-motion";
import { useOnScroll } from "hooks/useOnScroll";
import HiddenNav from "./HiddenNav";
import styles from "./styles/Nav.module.css";

const Nav = () => {
  const { show } = useOnScroll();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.hiddenNav}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          key="hiddenNav"
        >
          <HiddenNav />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Nav;
