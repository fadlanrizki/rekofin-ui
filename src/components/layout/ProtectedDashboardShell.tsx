"use client";

import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineSettingsBrightness,
} from "react-icons/md";
import { useEffect, useMemo, useState } from "react";

type ProtectedMenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  isLogout?: boolean;
};

type ProtectedDashboardShellProps = {
  children: React.ReactNode;
  menus: ProtectedMenuItem[];
  homePath: string;
};

type ThemeMode = "system" | "light" | "dark";

const THEME_MODE_KEY = "rekofin-theme-mode";

export default function ProtectedDashboardShell({
  children,
  menus,
  homePath,
}: ProtectedDashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [username, setUsername] = useState("-");
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  const applyThemeMode = (mode: ThemeMode) => {
    const root = document.documentElement;

    if (mode === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", mode);
    }
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "-");
  }, []);

  useEffect(() => {
    setOpenSidebar(false);
  }, [pathname]);

  useEffect(() => {
    if (isDesktop) {
      setOpenSidebar(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    // const savedMode = localStorage.getItem(THEME_MODE_KEY) as ThemeMode | null;
    // const initialMode: ThemeMode =
    //   savedMode === "light" || savedMode === "dark" || savedMode === "system"
    //     ? savedMode
    //     : "system";
    const initialMode: ThemeMode = "light";

    setThemeMode(initialMode);
    applyThemeMode(initialMode);
  }, []);

  const handleToggleTheme = () => {
    const nextMode: ThemeMode = themeMode === "light" ? "dark" : "light";

    setThemeMode(nextMode);
    localStorage.setItem(THEME_MODE_KEY, nextMode);
    applyThemeMode(nextMode);
  };

  const getThemeToggleMeta = () => {
    if (themeMode === "light") {
      return {
        label: "Theme: Light (click to Dark)",
        icon: <MdOutlineLightMode size={20} />,
      };
    }

    if (themeMode === "dark") {
      return {
        label: "Theme: Dark (click to System)",
        icon: <MdOutlineDarkMode size={20} />,
      };
    }

    return {
      label: "Theme: System (click to Light)",
      icon: <MdOutlineSettingsBrightness size={20} />,
    };
  };

  const themeToggleMeta = getThemeToggleMeta();

  const sidebarWidth = isDesktop
    ? isSidebarMinimized
      ? "5.25rem"
      : "18rem"
    : "0px";
  const showMenuLabel = !(isDesktop && isSidebarMinimized);

  const menuContent = useMemo(() => {
    const normalizedPathname = (pathname || "/").replace(/\/+$/, "") || "/";
    const isMenuActive = (path: string) => {
      const normalizedMenuPath = path.replace(/\/+$/, "") || "/";

      if (normalizedMenuPath === "/") {
        return normalizedPathname === "/";
      }

      return (
        normalizedPathname === normalizedMenuPath ||
        normalizedPathname.startsWith(`${normalizedMenuPath}/`)
      );
    };

    return menus.map((item) => {
      const isActive = !item.isLogout && isMenuActive(item.path);
      const baseClass = [
        "flex items-center rounded-md px-3 py-3 text-sm md:text-base transition-colors",
        showMenuLabel ? "gap-2 justify-start" : "justify-center",
        isActive
          ? "bg-white text-primary shadow-sm"
          : "text-white hover:bg-white hover:text-primary",
      ].join(" ");

      if (item.isLogout) {
        return (
          <button
            key={item.path}
            type="button"
            onClick={() => {
              localStorage.clear();
              router.push(item.path);
            }}
            className={`${baseClass} cursor-pointer text-left`}
          >
            <span className="text-xl">{item.icon}</span>
            {showMenuLabel && <span>{item.name}</span>}
          </button>
        );
      }

      return (
        <Link
          key={item.path}
          href={item.path}
          className={baseClass}
          aria-current={isActive ? "page" : undefined}
        >
          <span className="text-xl">{item.icon}</span>
          {showMenuLabel && <span>{item.name}</span>}
        </Link>
      );
    });
  }, [menus, pathname, router, showMenuLabel]);

  const sidebarContent = (
    <div className="flex h-full flex-col p-3">
      <nav className="flex flex-1 flex-col gap-2">{menuContent}</nav>

      <p className="pt-4 text-center text-xs text-white/80">©2026 Rekofin</p>
    </div>
  );

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--app-bg)", color: "var(--app-text)" }}
    >
      <section
        className="grid h-screen"
        style={{
          gridTemplateColumns: isDesktop
            ? `${sidebarWidth} minmax(0, 1fr)`
            : "minmax(0, 1fr)",
          gridTemplateRows: "4rem minmax(0, 1fr)",
          gridTemplateAreas: isDesktop
            ? '"sidebar header" "sidebar content"'
            : '"header" "content"',
        }}
      >
        {isDesktop && (
          <button
            type="button"
            aria-label={showMenuLabel ? "Minimize sidebar" : "Expand sidebar"}
            className="absolute z-30 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-primary shadow-sm md:flex"
            style={{
              left: sidebarWidth,
              top: "4rem",
              borderColor: "var(--app-border)",
              backgroundColor: "var(--app-surface)",
            }}
            title={showMenuLabel ? "Minimize sidebar" : "Expand sidebar"}
            onClick={() => setIsSidebarMinimized((prev) => !prev)}
          >
            {showMenuLabel ? (
              <FaAnglesLeft size={12} />
            ) : (
              <FaAnglesRight size={12} />
            )}
          </button>
        )}

        {isDesktop && (
          <Box
            sx={{
              gridArea: "sidebar",
              borderRight: "1px solid var(--app-border)",
              backgroundColor: "var(--sidebar-bg)",
              color: "var(--sidebar-fg)",
              minHeight: "100vh",
            }}
          >
            <Drawer
              variant="permanent"
              open
              sx={{
                width: "100%",
                "& .MuiDrawer-paper": {
                  width: "100%",
                  position: "static",
                  border: 0,
                  backgroundColor: "var(--sidebar-bg)",
                  color: "var(--sidebar-fg)",
                  boxSizing: "border-box",
                },
              }}
            >
              {sidebarContent}
            </Drawer>
          </Box>
        )}

        <header
          className="z-20 flex items-center justify-between border-b px-4 md:px-6"
          style={{
            gridArea: "header",
            borderColor: "var(--app-border)",
            backgroundColor: "var(--header-bg)",
            color: "var(--header-fg)",
          }}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-2xl text-primary md:hidden"
              onClick={() => {
                if (!isDesktop) {
                  setOpenSidebar((prev) => !prev);
                }
              }}
            >
              <GiHamburgerMenu />
            </button>
            <Link href={homePath} className="text-primary">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              type="button"
              aria-label={themeToggleMeta.label}
              title={themeToggleMeta.label}
              onClick={handleToggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-md border"
              style={{
                borderColor: "var(--app-border)",
                color: "var(--header-fg)",
              }}
            >
              {themeToggleMeta.icon}
            </button>
            <p className="hidden text-sm md:block md:text-base">{username}</p>
            <FaUserCircle size={28} />
          </div>
        </header>

        <Drawer
          anchor="left"
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
          variant="temporary"
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: "85%",
              maxWidth: "20rem",
              backgroundColor: "var(--sidebar-bg)",
              color: "var(--sidebar-fg)",
            },
          }}
        >
          {sidebarContent}
        </Drawer>

        <div
          className="min-h-0 overflow-auto p-3 md:p-4 lg:p-5"
          style={{ gridArea: "content" }}
        >
          {children}
        </div>
      </section>
    </main>
  );
}
