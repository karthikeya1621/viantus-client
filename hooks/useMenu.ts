import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useMenu = (menu: string) => {
  const { menus }: { menus: any[] } = useContext(AppContext);

  return {
    menu:
      menus.length > 0 &&
      menus.filter((m) => m.title == menu).length > 0 &&
      menus.filter((m) => m.title == menu)[0].items.length > 0
        ? menus.filter((m) => m.title == menu)[0]
        : null,
  };
};

export default useMenu;
