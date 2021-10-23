import React, { useEffect } from "react";
import styles from "../../styles/BlogPage.module.scss";
import Image from "next/image";
import { getBlog, getConfig } from "../../utils";
import { useRouter } from "next/router";
import moment from "moment";

const BlogPage = ({ data }: any) => {
  const router = useRouter();

  useEffect(() => {
    if (data === null) {
      router.replace("/blog");
    }
  }, [data]);

  return (
    <div className={styles.blogpagecontainer}>
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
        <div className="col-span-3">
          <div className={styles.blogcontent}>
            <div className={styles.bloginfo}>
              <span>{moment(data?.published_at).format("ll")}</span>
              <div>
                <span className="mdi mdi-facebook"></span>
                <span className="mdi mdi-linkedin"></span>
                <span className="mdi mdi-twitter"></span>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data?.content + "" }}></div>
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }: any) {
  const slug =
    params && params.slug && params.slug[0] ? params.slug[0] : undefined;
  const response = await getBlog(slug);
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

export default BlogPage;
