import styles from "./styles/Nav.module.css";
import React, { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import TwitterIcon from "public/svg/Twitter.svg";
import PortfolioIcon from "public/svg/Portfolio.svg";
import MailIcon from "public/svg/Mail.svg";
import LinkedinIcon from "public/svg/Linkedin.svg";

const popoverVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5 } },
};

const lightVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Tab = ({
  icon,
  popoverText,
  href,
}: {
  href: string;
  icon: ReactNode;
  popoverText: string;
}) => {
  const [light, setLight] = useState<boolean>(false);
  const [popover, setPopover] = useState<boolean>(false);
  const { push } = useRouter();

  const onHover = () => {
    setLight(true);
    setPopover(true);
  };

  const onLeave = () => {
    setLight(false);
    setPopover(false);
  };

  return (
    <a className={styles.tab} href={href} target="_blank" rel="noreferrer">
      <AnimatePresence initial>
        {popover && (
          <>
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                marginTop: "-6.7em",
              }}
            >
              <motion.div
                className={styles.popover}
                variants={popoverVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2, ease: "easeInOut" }}
                key="popover"
              >
                <p>{popoverText}</p>
              </motion.div>
            </div>
          </>
        )}

        {light && (
          <motion.div
            className={styles.light}
            variants={lightVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            key="light"
          />
        )}
      </AnimatePresence>
      <div onMouseEnter={onHover} onMouseLeave={onLeave}>
        <span className={styles.icon}>{icon}</span>
      </div>
    </a>
  );
};

const HiddenNav = () => {
  return (
    <div className={styles.nav}>
      <Tab
        icon={<TwitterIcon />}
        popoverText="@devCassa"
        href="https://twitter.com/devcassa"
      />
      <Tab
        icon={<PortfolioIcon />}
        popoverText="Portfolio"
        href="https://valencassa.dev"
      />
      <Tab
        icon={<MailIcon />}
        popoverText="E-mail"
        href="mailto:valencassa@gmail.com"
      />
      <Tab
        icon={<LinkedinIcon />}
        popoverText="LinkedIn"
        href="https://www.linkedin.com/in/valentin-cassarino/"
      />
    </div>
  );
};

export default HiddenNav;
