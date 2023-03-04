import React from "react";
import Image from "../components/Image";
import styles from "../styles/TermsPage.module.scss";


const TermsPage = () => {
  return (
    <div className={styles.termspagecontainer}>
      <div className={styles.bannercontainer}>
        <div className={styles.bgimage}>
          <Image src="/images/test.jpg" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.bgoverlay}></div>
        <div className={styles.bannercontent}>
          <h1>Terms</h1>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
