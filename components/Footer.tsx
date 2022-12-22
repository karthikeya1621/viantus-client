import React, { useContext } from "react";
import styles from "../styles/Footer.module.scss";
import Image from "next/image";
import useMenu from "../hooks/useMenu";
import Link from "next/link";
import { AppContext } from "../context/AppContext";

const Footer = () => {
  const { siteInfo } = useContext(AppContext);

  const { menu: menuNav } = useMenu("FooterMenuNavigation");
  const { menu: menuLinks } = useMenu("FooterMenuUsefulLinks");
  return (
    <div className={styles.footercontainer}>
      <div className="grid grid-cols-12 gap-2 w-full relative mx-auto max-w-screen-lg px-5 py-10 md:px-0 md:py-20">
        <div className="col-span-6 md:col-span-2">
          <h3>Navigation</h3>
          {menuNav &&
            menuNav.items.map((mi: any) => (
              <Link key={mi.id} href={mi.link} passHref>
                <a>
                  <h6>{mi.title}</h6>
                </a>
              </Link>
            ))}
        </div>
        <div className="col-span-6 md:col-span-2">
          <h3>Useful Links</h3>
          {menuLinks &&
            menuLinks.items.map((mi: any) => (
              <Link key={mi.id} href={mi.link} passHref>
                <a>
                  <h6>{mi.title}</h6>
                </a>
              </Link>
            ))}
        </div>
        <div className="col-span-12 md:col-span-5">
          <h3>Contact Us</h3>
          <h5 className="uppercase font-semibold text-primary">
            Corporate Headquarters
          </h5>
          <h6>
            <span className="mdi mdi-map-marker-outline"></span>{" "}
            {siteInfo?.address}
          </h6>
          <a href={`tel:${siteInfo?.phone}`}>
            <h6>
              <span className="mdi mdi-phone-outline"></span> {siteInfo?.phone}
            </h6>
          </a>
          <a href={`mailto:${siteInfo?.email}`}>
            <h6>
              <span className="mdi mdi-email-outline"></span> {siteInfo?.email}
            </h6>
          </a>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center justify-center flex-col">
          <div className="w-full relative" style={{ height: "90%" }}>
            <Image
              src="/images/logo_with_text.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div>
            {siteInfo?.socialLinks &&
              siteInfo.socialLinks.map((sl: any) => (
                <Link key={sl.id} href={sl.link || ""} passHref>
                  <a className="mx-2 inline-block" target="_blank">
                    <span
                      className={`mdi mdi-${sl.accountName} text-gray-400`}
                    ></span>
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="text-center text-sm py-4 border-t border-opacity-40 text-gray-400">
        © Copyright 2023, Viantus Technologies. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
