import React, { useEffect, useState } from "react";
import styles from "../styles/StaffingPage.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { getPage } from "../utils";
import useMenu from "../hooks/useMenu";

const StaffingPage = () => {
  const router = useRouter();
  const [section, setSection] = useState("");
  const [data, setData] = useState(null);
  const [keys, setKeys] = useState<any[]>([]);
  const { menu } = useMenu("StaffingMenu");

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
    const { data } = await getPage("staffing");
    if (data) {
      setData(sanitizeData(data));

      if (menu && menu.items) {
        const keys = (menu.items as any[])
          .map((item) => {
            const link = item.link.split("#")[1];
            return link;
          })
          .filter((link) => !!link);
        setKeys(keys);
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
        document
          .getElementById(`_${section}`)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [section, data]);

  return (
    <div className={styles.staffingpagecontainer}>
      <div className={styles.bannercontainer}>
        <div className={styles.bgimage}>
          <Image src="/images/test.jpg" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.bgoverlay}></div>
        <div className={styles.bannercontent}>
          <h1>Staffing</h1>
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

export default StaffingPage;
