import { createContext, useEffect, useState } from "react";
import { getMenus, getSiteInfo } from "../utils";

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [siteInfo, setSiteInfo] = useState<any>(null);
  const [menus, setMenus] = useState<any[]>([]);

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
    <AppContext.Provider value={{ isAppLoaded, siteInfo, menus }}>
      {children}
    </AppContext.Provider>
  );
};
