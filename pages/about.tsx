import React from "react";
import styles from "../styles/AboutPage.module.scss";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className={styles.aboutpagecontainer}>
      <div className={styles.bannercontainer}>
        <div className={styles.bgimage}>
          <Image src="/images/test.jpg" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.bgoverlay}></div>
        <div className={styles.bannercontent}>
          <h1>About Us</h1>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
