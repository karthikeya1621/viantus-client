import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "../context/AppContext";
import useMenu from "../hooks/useMenu";
import { useRouter } from "next/router";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const { menu } = useMenu("ServicesMenu");
  const { menu: aboutMenu } = useMenu("AboutUsMenu");
  const { menu: solutionsMenu } = useMenu("SolutionsMenu");
  const { menu: staffingMenu } = useMenu("StaffingMenu");
  const { breakpoints, isSideMenuOpen, setIsSideMenuOpen } =
    useContext(AppContext);
  const [isExpandServices, setIsExpandServices] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    // setIsExpandServices(false);
    setIsSideMenuOpen(false);
  }, [router.pathname]);

  return (
    <div
      className={styles.headercontainer + " " + (isFixed ? styles.sticky : "")}
    >
      <div className="grid grid-cols-12 max-w-screen-lg mx-auto h-full relative">
        <div className="col-span-4 h-full flex items-center">
          <Link href="/" passHref>
            <a className={styles.logo}>
              <Image
                quality={100}
                src={
                  isFixed
                    ? "/images/logo_with_text_black.png"
                    : "/images/logo_with_text.png"
                }
                objectFit="contain"
                layout="fill"
                objectPosition="left"
              />
            </a>
          </Link>
        </div>
        <div className="col-span-8 h-full">
          <nav
            className="w-full justify-end items-center text-sm"
            style={{ height: "50%", position: "relative" }}
          >
            <ul>
              <Link href="/industries" passHref>
                <a className={styles.menuitem}>
                  <li>Industries</li>
                </a>
              </Link>
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
            </ul>
          </nav>
          <nav
            style={{ height: "50%", position: "relative" }}
            className="w-full justify-end items-center"
          >
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
              <Link href="/about">
                <li className={styles.menuitem}>
                  <span>About Us</span>
                  {aboutMenu && (
                    <div className={styles.submenu}>
                      <ul>
                        {aboutMenu.items.map((mi: any) => (
                          <Link href={`${mi.link}`} key={mi.id} passHref>
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
              </Link>
              <Link href="/solutions">
                <li className={styles.menuitem}>
                  <span>Solutions</span>
                  {solutionsMenu && (
                    <div className={styles.submenu}>
                      <ul>
                        {solutionsMenu.items.map((mi: any) => (
                          <Link href={`${mi.link}`} key={mi.id} passHref>
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
              </Link>
              <Link href="/staffing">
                <li className={styles.menuitem}>
                  <span>Staffing</span>
                  {staffingMenu && (
                    <div className={styles.submenu}>
                      <ul>
                        {staffingMenu.items.map((mi: any) => (
                          <Link href={`${mi.link}`} key={mi.id} passHref>
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
              </Link>
            </ul>
          </nav>
        </div>
      </div>

      {/* SideNav */}

      <div
        className={styles.sidenav + " " + `${isSideMenuOpen && styles.open}`}
      >
        <div className="h-full w-full justify-end items-center">
          <ul className="h-full">
            <Link href="/" passHref>
              <a className={styles.menuitem}>
                <li>Home</li>
              </a>
            </Link>
            <li
              className={styles.menuitem}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpandServices(!isExpandServices);
              }}
            >
              <span>Services</span>{" "}
              <span
                className={`mdi mdi-chevron-down ${
                  isExpandServices ? styles.menuopen : styles.menuclose
                }`}
              ></span>
              {menu && isExpandServices && (
                <div className={styles.submenu}>
                  <ul>
                    {menu.items.map((mi: any) => (
                      <Link href={`/services/${mi.slug}`} key={mi.id} passHref>
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
        </div>
      </div>

      <div
        className={styles.menuicon + " " + `${isSideMenuOpen && styles.open}`}
        onClick={(e) => {
          setIsSideMenuOpen(!isSideMenuOpen);
        }}
      >
        {isSideMenuOpen && <span className={`mdi mdi-close`}></span>}
        {!isSideMenuOpen && (
          <span
            className={`mdi mdi-menu  ${isFixed && "text-gray-800"}`}
          ></span>
        )}
      </div>
    </div>
  );
};

export default Header;
