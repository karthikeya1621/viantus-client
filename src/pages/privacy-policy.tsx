import React from "react";
import Image from "../components/Image";
import styles from "../styles/PrivacyPage.module.scss";


const PrivacyPage = () => {
  return (
    <div className={styles.privacypagecontainer}>
      <div className={styles.bannercontainer}>
        <div className={styles.bgimage}>
          <Image src="/images/test.jpg" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.bgoverlay}></div>
        <div className={styles.bannercontent}>
          <h1>Privacy Policy</h1>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
