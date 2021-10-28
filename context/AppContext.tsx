import { createContext, useEffect, useState } from "react";
import { getMenus, getSiteInfo } from "../utils";
import { useBreakpoints } from "react-breakpoints-hook";

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [siteInfo, setSiteInfo] = useState<any>(null);
  const [menus, setMenus] = useState<any[]>([]);
  const breakpoints = useBreakpoints({
    xs: { min: 0, max: 360 },
    sm: { min: 361, max: 960 },
    md: { min: 961, max: 1400 },
    lg: { min: 1401, max: null },
  });

  useEffect(() => {
    setIsAppLoaded(true);
    fetchSiteInfo();
    fetchMenus();
  }, []);

  const fetchSiteInfo = async () => {
    const response = await getSiteInfo();
    if (response.data) {
      setSiteInfo(response.data);
    } else {
      setSiteInfo(null);
    }
  };

  const fetchMenus = async () => {
    const response = await getMenus();
    if (response.data && response.data.menus) {
      setMenus(response.data.menus);
    } else {
      setMenus([]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isAppLoaded,
        siteInfo,
        menus,
        breakpoints,
        isSideMenuOpen,
        setIsSideMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
