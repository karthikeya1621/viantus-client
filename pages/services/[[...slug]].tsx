import React, { useEffect } from "react";
import styles from "../../styles/ServicePage.module.scss";
import Image from "next/image";
import { getService, getConfig } from "../../utils";
import { useRouter } from "next/router";
import moment from "moment";

const ServicePage = ({ data }: any) => {
  const router = useRouter();

  useEffect(() => {
    if (data === null) {
      router.replace("/services");
    }
  }, [data]);

  return (
    <div className={styles.servicepagecontainer}>
      <div className={styles.bannercontainer}>
        <div className={styles.bgimage}>
          {data?.banner && (
            <Image
              src={`${data?.banner?.url}`}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <div className={styles.bgoverlay}></div>
        <div className={styles.bannercontent}>
          <h1>{data?.title}</h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 w-full max-w-screen-lg mx-auto mb-14">
        <div className="col-span-4">
          <div className={styles.servicecontent}>
            <div
              dangerouslySetInnerHTML={{ __html: data?.content || "" }}
            ></div>
          </div>
        </div>
        <div className="col-span-4">
          <div className={styles.features}>
            {data?.features?.map((feature: any) => (
              <div key={feature?.id} className={styles.feature}>
                {feature?.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }: any) {
  const slug =
    params && params.slug && params.slug[0] ? params.slug[0] : undefined;
  const response = await getService(slug);
  const data = response.data || null;
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default ServicePage;
