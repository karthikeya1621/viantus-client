import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Header.module.scss";
import { AppContext } from "../context/AppContext";
import useMenu from "../hooks/useMenu";
import Image from "./Image";
// import Link from "./Link";
import { Link } from "react-router-dom";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const { menu } = useMenu("ServicesMenu");
  const { menu: aboutMenu } = useMenu("AboutUsMenu");
  const { menu: solutionsMenu } = useMenu("SolutionsMenu");
  const { menu: staffingMenu } = useMenu("StaffingMenu");
  const { breakpoints, isSideMenuOpen, setIsSideMenuOpen, location } =
    useContext(AppContext);
  const [isExpandServices, setIsExpandServices] = useState(false);
  const [isExpandAbout, setIsExpandAbout] = useState(false);
  const [isExpandSolutions, setIsExpandSolutions] = useState(false);
  const [isExpandStaffing, setIsExpandStaffing] = useState(false);

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
  }, [location]);

  return (
    <div
      className={styles.headercontainer + " " + (isFixed ? styles.sticky : "")}
    >
      <div className="grid grid-cols-12 max-w-screen-lg mx-auto h-full relative">
        <div className="col-span-4 h-full flex items-center">
          <Link to="/" className={styles.logo}>
              <Image
                src={
                  isFixed
                    ? "/images/logo_with_text_black.png"
                    : "/images/logo_with_text.png"
                }
                objectFit="contain"
                layout="fill"
                objectPosition="left"
              />
          </Link>
        </div>
        <div className="col-span-8 h-full">
          <nav
            className="w-full justify-end items-center text-sm"
            style={{ height: "50%", position: "relative" }}
          >
            <ul>
              <Link to="/industries" className={styles.menuitem}>
                  <li>Industries</li>
              </Link>
              <Link to="/blog" className={styles.menuitem}>
                  <li>Blog</li>
              </Link>
              <Link to="/careers" className={styles.menuitem}>
                  <li>Careers</li>
              </Link>
              <Link to="/contact" className={styles.menuitem}>
                  <li>Contact Us</li>
              </Link>
            </ul>
          </nav>
          <nav
            style={{ height: "50%", position: "relative" }}
            className="w-full justify-end items-center"
          >
            <ul className="h-full">
              <Link to="/" className={styles.menuitem}>
                  <li>Home</li>
              </Link>
              <li className={styles.menuitem}>
                <Link to="/services"><span>Services</span></Link>
                {menu && (
                  <div className={styles.submenu}>
                    <ul>
                      {menu.items.map((mi: any) => (
                        <Link to={`/services/${mi.slug}`} key={mi.id}>
                            <li>
                              <span>{mi.title}</span>
                            </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li className={styles.menuitem}>
                <Link to="/about">
                  <span>About Us</span>
                </Link>
                {aboutMenu && (
                  <div className={styles.submenu}>
                    <ul>
                      {aboutMenu.items.map((mi: any) => (
                        <Link to={`${mi.link}`} key={mi.id}>
                            <li>
                              <span>{mi.title}</span>
                            </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li className={styles.menuitem}>
                <Link to="/solutions">
                  <span>Solutions</span>
                </Link>
                {solutionsMenu && (
                  <div className={styles.submenu}>
                    <ul>
                      {solutionsMenu.items.map((mi: any) => (
                        <Link to={`${mi.link}`} key={mi.id}>
                            <li>
                              <span>{mi.title}</span>
                            </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li className={styles.menuitem}>
                <Link to="/staffing">
                  <span>Staffing</span>
                </Link>
                {staffingMenu && (
                  <div className={styles.submenu}>
                    <ul>
                      {staffingMenu.items.map((mi: any) => (
                        <Link to={`${mi.link}`} key={mi.id}>
                            <li>
                              <span>{mi.title}</span>
                            </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
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
            <Link to="/" className={styles.menuitem}>
                <li>Home</li>
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
                      <Link to={`/services/${mi.slug}`} key={mi.id}>
                          <li>
                            <span>{mi.title}</span>
                          </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li
              className={styles.menuitem}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpandSolutions(!isExpandSolutions);
              }}
            >
              <span>Solutions</span>{" "}
              <span
                className={`mdi mdi-chevron-down ${
                  isExpandSolutions ? styles.menuopen : styles.menuclose
                }`}
              ></span>
              {solutionsMenu && isExpandSolutions && (
                <div className={styles.submenu}>
                  <ul>
                    {solutionsMenu.items.map((mi: any) => (
                      <Link to={`${mi.link}`} key={mi.id}>
                          <li>
                            <span>{mi.title}</span>
                          </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li
              className={styles.menuitem}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpandStaffing(!isExpandStaffing);
              }}
            >
              <span>Staffing</span>{" "}
              <span
                className={`mdi mdi-chevron-down ${
                  isExpandStaffing ? styles.menuopen : styles.menuclose
                }`}
              ></span>
              {staffingMenu && isExpandStaffing && (
                <div className={styles.submenu}>
                  <ul>
                    {staffingMenu.items.map((mi: any) => (
                      <Link to={`${mi.link}`} key={mi.id}>
                          <li>
                            <span>{mi.title}</span>
                          </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <Link to="/blog" className={styles.menuitem}>
                <li>Blog</li>
            </Link>
            <Link to="/careers" className={styles.menuitem}>
                <li>Careers</li>
            </Link>
            <Link to="/contact" className={styles.menuitem}>
                <li>Contact Us</li>
            </Link>

            <li
              className={styles.menuitem}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpandAbout(!isExpandAbout);
              }}
            >
              <span>About Us</span>{" "}
              <span
                className={`mdi mdi-chevron-down ${
                  isExpandAbout ? styles.menuopen : styles.menuclose
                }`}
              ></span>
              {aboutMenu && isExpandAbout && (
                <div className={styles.submenu}>
                  <ul>
                    {aboutMenu.items.map((mi: any) => (
                      <Link to={`${mi.link}`} key={mi.id}>
                          <li>
                            <span>{mi.title}</span>
                          </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </li>
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
