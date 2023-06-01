import { create } from "zustand";
import getSystemTheme from "../utils/getSystemTheme";
import { THEMES } from "../constants/themes";

export interface RootStore {
   user: boolean;
   sidebar: boolean;
   sidebarAnimation: boolean;
   selectedItem: string;
   headerPanel: boolean;
   theme: "light" | "dark";
   toggleUserMenu: () => void;
   toggleSidebarMenu: () => void;
   resetSidebarAnimation: () => void;
   selectMenuItem: (item: string) => void;
   changeTheme: () => void;
   toggleHeaderPanel: () => void;
   hideHeaderPanel: () => void;
   setTheme: (theme: "light" | "dark") => void;
   resetMenus: () => void;
}

export const useRoot = create<RootStore>((set, getState) => ({
   user: false,
   sidebar: false,
   sidebarAnimation: false,
   selectedItem: "Feed",
   headerPanel: false,
   theme: getSystemTheme(),
   toggleUserMenu: () => {
      const user = getState().user;
      set({ user: !user });
   },
   toggleSidebarMenu: () => {
      const sidebar = getState().sidebar;
      set({ sidebar: !sidebar, sidebarAnimation: true });
   },
   resetSidebarAnimation: () => {
      set({ sidebarAnimation: false });
   },
   selectMenuItem: (item) => {
      set({ selectedItem: item });
   },
   changeTheme: () => {
      let theme = getState().theme;
      theme === THEMES.dark
         ? (theme = THEMES.light as "light")
         : (theme = THEMES.dark as "dark");
      set({ theme });
   },
   setTheme: (theme: "light" | "dark") => {
      set({ theme });
   },
   toggleHeaderPanel: () => {
      const headerPanel = getState().headerPanel;
      set({ headerPanel: !headerPanel });
   },
   hideHeaderPanel: () => {
      set({ headerPanel: false });
   },
   resetMenus: () => {
      set({
         user: false,
         sidebarAnimation: false,
         selectedItem: "Feed",
         headerPanel: false,
      });
   },
}));
