import React, { useEffect, useState } from "react";
import styles from "../styles/AboutPage.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { getPage } from "../utils";

const AboutPage = () => {
  const router = useRouter();
  const [section, setSection] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const path = router.asPath;
    if (path.split("#").length > 1) {
      const subPath = path.split("#")[1];
      setSection(subPath.split("/")[0]);
    } else {
      setSection("");
    }
  }, [router.asPath]);

  const fetchData = async () => {
    const { data } = await getPage("about-us");
    if (data) {
      setData(sanitizeData(data));
    } else {
      setData(null);
    }
  };

  const sanitizeData = (data: any) => {
    const excludeKeys = [
      "createdAt",
      "id",
      "published_at",
      "updatedAt",
      "__v",
      "_id",
    ];
    const entries = Object.entries(data).filter(
      (entry) => !excludeKeys.some((key) => key === entry[0])
    );
    const sanitized = Object.fromEntries(entries) as any;
    if (sanitized) {
      return sanitized;
    }
    return null;
  };

  useEffect(() => {
    if (window && data) {
      if (section == "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document
          .getElementById(`_${section}`)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [section, data]);

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

      <div className="grid col-span-12 w-full max-w-screen-lg mx-auto my-1">
        {data &&
          Object.entries(data).map((entry: [string, any]) => (
            <div className="col-span-12 relative" key={`key-${entry[0]}`}>
              <div id={`_${entry[0]}`} className={styles.pin}></div>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: entry[1] }}
              ></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AboutPage;
