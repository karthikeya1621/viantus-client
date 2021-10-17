import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "../styles/Home.module.scss";
import CountUp from "react-countup";
import { getConfig, getPage } from "../utils";
import moment from "moment";
import Link from "next/link";

export default function Home({ data }: any) {
  const { ref: statsRef, inView: statsInView } = useInView();
  const [statsAnimDone, setStatsAnimDone] = useState(false);

  useEffect(() => {
    if (statsInView && !statsAnimDone) {
      setTimeout(() => {
        setStatsAnimDone(true);
      }, 2000);
    }
  }, [statsInView]);

  return (
    <div className={styles.homecontainer}>
      <div className={styles.herocontainer}>
        {data && (
          <div className={styles.bgimage}>
            <Image
              priority={true}
              layout="fill"
              src={`${data?.hero?.background?.url}`}
              objectFit="cover"
            />
          </div>
        )}
        <div className={styles.herocontent}>
          <div className={styles.herotext}>
            <h1>{data?.hero.title}</h1>
            <p>{data?.hero.description}</p>
          </div>

          <div ref={statsRef} className={styles.statsbox}>
            {data?.numberStats?.map((stat: any) => (
              <div key={stat.id}>
                <h4>
                  {stat?.prefix}
                  {!statsAnimDone && (
                    <CountUp end={stat.count} delay={1} duration={2} />
                  )}
                  {statsAnimDone && stat.count}
                  {stat?.suffix}
                </h4>
                <h6>{stat.title}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data?.featuredServices && (
        <div className={styles.servicescontainer}>
          <h1 className="heading1">Services</h1>

          <div className={styles.services}>
            {data?.featuredServices[0] && (
              <div className={styles.servicebox}>
                <div className={styles.servicecontent}>
                  <div className="bg-gray-200 text-gray-900 px-3">
                    <h2>{data.featuredServices[0].title}</h2>
                    <p>{data.featuredServices[0].description}</p>
                  </div>
                </div>
                <div className={styles.serviceimage}>
                  <Image
                    src={`${data.featuredServices[0].banner.formats.small.url}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            )}
            {data?.featuredServices[1] && (
              <div className={styles.servicebox}>
                <div className={styles.serviceimage}>
                  <Image
                    src={`${data.featuredServices[1].banner.formats.small.url}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles.servicecontent}>
                  <div className="bg-gray-800 text-primary-light px-3">
                    <h2>{data.featuredServices[1].title}</h2>
                    <p>{data.featuredServices[1].description}</p>
                  </div>
                </div>
              </div>
            )}

            {data?.featuredServices[2] && (
              <div className={styles.servicebox}>
                <div className={styles.servicecontent}>
                  <div className="bg-gray-500 text-white px-3">
                    <h2>{data.featuredServices[2].title}</h2>
                    <p>{data.featuredServices[2].description}</p>
                  </div>
                </div>
                <div className={styles.serviceimage}>
                  <Image
                    src={`${data.featuredServices[2].banner.formats.small.url}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            )}
            {data?.featuredServices[3] && (
              <div className={styles.servicebox}>
                <div className={styles.serviceimage}>
                  <Image
                    src={`${data.featuredServices[3].banner.formats.small.url}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles.servicecontent}>
                  <div className="bg-black text-primary px-3">
                    <h2>{data.featuredServices[3].title}</h2>
                    <p>{data.featuredServices[3].description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {data?.whyUs && data?.whyUs?.reason && (
        <div className={styles.whyuscontainer}>
          <h1 className="heading1">Why Us?</h1>
          <div className="grid grid-cols-2 gap-2 mx-auto w-full max-w-screen-lg">
            <div className="col-span-1">
              {data.whyUs.reason[0] && (
                <div className={styles.whyusbox}>
                  {data.whyUs.reason[0].icon ? (
                    <div className="relative w-14 h-14">
                      <Image
                        src={`${data.whyUs.reason[0].icon.formats.small}`}
                      />
                    </div>
                  ) : (
                    <span className="mdi mdi-circle-expand"></span>
                  )}
                  <div>
                    <h4>{data.whyUs.reason[0].title}</h4>
                    <p>{data.whyUs.reason[0].description}</p>
                  </div>
                </div>
              )}
              {data.whyUs.reason[2] && (
                <div className={styles.whyusbox}>
                  {data.whyUs.reason[2].icon ? (
                    <div className="relative w-14 h-14">
                      <Image
                        src={`${data.whyUs.reason[2].icon.formats.small}`}
                      />
                    </div>
                  ) : (
                    <span className="mdi mdi-chart-areaspline"></span>
                  )}
                  <div>
                    <h4>{data.whyUs.reason[2].title}</h4>
                    <p>{data.whyUs.reason[2].description}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-1">
              {data.whyUs.reason[1] && (
                <div className={styles.whyusbox}>
                  {data.whyUs.reason[1].icon ? (
                    <div className="relative w-14 h-14">
                      <Image
                        src={`${data.whyUs.reason[1].icon.formats.small}`}
                      />
                    </div>
                  ) : (
                    <span className="mdi mdi-presentation"></span>
                  )}
                  <div>
                    <h4>{data.whyUs.reason[2].title}</h4>
                    <p>{data.whyUs.reason[2].description}</p>
                  </div>
                </div>
              )}
              {data.whyUs.reason[3] && (
                <div className={styles.whyusbox}>
                  {data.whyUs.reason[3].icon ? (
                    <div className="relative w-14 h-14">
                      <Image
                        src={`${data.whyUs.reason[3].icon.formats.small}`}
                      />
                    </div>
                  ) : (
                    <span className="mdi mdi-shape-outline"></span>
                  )}
                  <div>
                    <h4>{data.whyUs.reason[3].title}</h4>
                    <p>{data.whyUs.reason[3].description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {data?.featuredBlogs && (
        <div className={styles.blogscontainer}>
          <h1 className="heading1">Blog</h1>
          <div className={styles.blogs}>
            {data?.featuredBlogs?.map((blog: any) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} passHref>
                <a className={styles.blogbox}>
                  <div className={styles.blogimage}>
                    {blog.banner && (
                      <Image
                        placeholder="blur"
                        blurDataURL="/images/placeholder.gif"
                        src={`${blog?.banner?.formats?.small?.url}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>
                  <div className={styles.blogtitle}>{blog.title}</div>
                  <div className={styles.bloginfo}>
                    <small>on</small> {moment(blog.published_at).format("ll")}
                  </div>
                  <div className={styles.blogcontent}>
                    {/* 250 chars limit */}
                    <p>{blog.synopsis}</p>
                  </div>
                  <button className="button1">Read More</button>
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const response = await getPage("home-page");
  const data = response.data || null;

  return {
    props: {
      data,
    },
  };
}
