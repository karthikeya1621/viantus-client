import React from "react";
import styles from "../styles/CareersPage.module.scss";
import Image from "next/image";
import moment from "moment";
import { getCareers } from "../utils";

const CareersPage = ({ data }: any) => {
  return (
    <div className={styles.careerspagecontainer}>
      <div className={styles.bannercontainer}>
        <div className={styles.bgimage}>
          <Image src={`/images/test.jpg`} layout="fill" objectFit="cover" />
        </div>
        <div className={styles.bgoverlay}></div>
        <div className={styles.bannercontent}>
          <h1>Careers</h1>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2 w-full max-w-screen-lg mx-auto">
        <div className="col-span-6 text-center mb-12">
          <h1 className="heading1">Check for current openings.</h1>
        </div>
        {data !== null &&
          data?.map((career: any) => (
            <div className="col-span-6" key={career?.id}>
              <div className={styles.careerbox}>
                <div className="flex justify-between my-5">
                  <h3>{career?.title}</h3>{" "}
                  <div>
                    <span>{career?.type}</span> |{" "}
                    <span>
                      <small>Posted on:</small>{" "}
                      {moment(career?.published_at).format("ll")}
                    </span>
                  </div>
                </div>

                <div
                  className="flex my-5"
                  dangerouslySetInnerHTML={{
                    __html: career?.description || "",
                  }}
                ></div>

                <div className="flex my-5">
                  {career?.addresses &&
                    career.addresses.map((addr: any) => (
                      <div key={addr.id} className={styles.location}>
                        {addr.address}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        {data === null && (
          <h4 className="text-center font-semibold text-gray-500 text-lg col-span-6 mt-16 mb-32">
            No Openings for now.
          </h4>
        )}
      </div>
    </div>
  );
};

export default CareersPage;

export async function getStaticProps() {
  const response = await getCareers();
  const data = response.data || null;
  return {
    props: {
      data,
    },
  };
}
