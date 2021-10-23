import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "../context/AppContext";
import useMenu from "../hooks/useMenu";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const { menu } = useMenu("ServicesMenu");

  useEffect(() => {
    if (document) {
      document.addEventListener("scroll", (event) => {
        if (window.scrollY > 400) {
          if (!isFixed) setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      });

      document.addEventListener("load", (event) => {
        if (window.scrollY > 400) {
          if (!isFixed) setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      });
    }
  }, []);

  return (
    <div
      className={styles.headercontainer + " " + (isFixed ? styles.sticky : "")}
    >
      <div className="grid grid-cols-12 max-w-screen-lg mx-auto h-full relative">
        <div className="col-span-4 h-full flex items-center">
          <Link href="/" passHref>
            <a className={styles.logo}>
              <Image
                src={
                  isFixed ? "/images/logo.png" : "/images/logo_with_text.png"
                }
                objectFit="contain"
                layout="fill"
                objectPosition="left"
              />
            </a>
          </Link>
        </div>
        <div className="col-span-8 h-full">
          <nav className="h-full w-full justify-end items-center">
            <ul className="h-full">
              <Link href="/" passHref>
                <a className={styles.menuitem}>
                  <li>Home</li>
                </a>
              </Link>
              <li className={styles.menuitem}>
                <span>Services</span>
                {menu && (
                  <div className={styles.submenu}>
                    <ul>
                      {menu.items.map((mi: any) => (
                        <Link
                          href={`/services/${mi.slug}`}
                          key={mi.id}
                          passHref
                        >
                          <a>
                            <li>
                              <span>{mi.title}</span>
                            </li>
                          </a>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <Link href="/blog" passHref>
                <a className={styles.menuitem}>
                  <li>Blog</li>
                </a>
              </Link>
              <Link href="/careers" passHref>
                <a className={styles.menuitem}>
                  <li>Careers</li>
                </a>
              </Link>
              <Link href="/contact" passHref>
                <a className={styles.menuitem}>
                  <li>Contact Us</li>
                </a>
              </Link>
              <Link href="/about" passHref>
                <a className={styles.menuitem}>
                  <li>About Us</li>
                </a>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
