import React, { useEffect, useState } from "react";
import styles from "../../styles/ServicePage.module.scss";
import { getService, getConfig } from "../../utils";

import moment from "moment";
import Image from "../../components/Image";
import { useNavigate, useParams } from "react-router-dom";


const ServicePage = () => {
  const navigate = useNavigate();

  const { slug } = useParams();

  const [data, setData] = useState<any>(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { props: { data } } = await getStaticProps({params: {slug}});
    setData(data);
  }

  useEffect(() => {
    if (data === null) {
      navigate("/services", {replace: true});
    }
  }, [data]);

  return (
    <div className={styles.servicepagecontainer}>
      <div className={styles.bannercontainer}>
        <div className={styles.bgimage}>
          {data?.banner && (
            <>
              <Image
                src={`${data?.banner?.url}`}
                layout="fill"
                objectFit="cover"
              />
            </>
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
    params && params.slug ? params.slug : undefined;
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
    fallback: false,
  };
}

export default ServicePage;
