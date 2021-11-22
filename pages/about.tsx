import React, { useEffect, useState } from "react";
import styles from "../styles/AboutPage.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { getPage } from "../utils";
import useMenu from "../hooks/useMenu";

const AboutPage = () => {
  const router = useRouter();
  const [section, setSection] = useState("");
  const [data, setData] = useState(null);
  const [keys, setKeys] = useState<any[]>([]);
  const { menu } = useMenu("AboutUsMenu");

  useEffect(() => {
    fetchData();
  }, [menu]);

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
      const sanitizedData = sanitizeData(data);
      setData(sanitizedData);

      if (menu && menu.items) {
        const keys = (menu.items as any[])
          .map((item) => {
            const link = item.link.split("#")[1];
            return link;
          })
          .filter((link) => !!link);

        const extras = Object.keys(sanitizedData).filter(
          (dKey) => !keys.includes(dKey)
        );
        setKeys([...keys, ...extras]);
      }
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
        setTimeout(() => {
          document
            .getElementById(`_${section}`)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
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
          keys.map((key: string) => (
            <div className="col-span-12 relative" key={`key-${key}`}>
              <div id={`_${key}`} className={styles.pin}></div>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: data["" + key] }}
              ></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AboutPage;
