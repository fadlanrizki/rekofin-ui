"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import Hamburger from "@/components/shared/Hamburger";
import SideDrawer from "@/components/shared/SideDrawer";

type MenuType = {
  id: number;
  name: string;
  url: string;
};

const listMenu = [
  {
    id: 1,
    name: "Tentang",
    url: "#about",
  },
  {
    id: 2,
    name: "FAQ",
    url: "#faq",
  },
  {
    id: 3,
    name: "Daftar",
    url: "/register",
  },
  {
    id: 4,
    name: "Masuk",
    url: "/login",
  },
];

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  
  return (
    <div className="w-full flex justify-center py-8 px-5 font-bold text-white bg-primary border-b-1 sticky z-100 top-0">
      <div className="w-3/4 flex justify-between items-center">
        <Link href={"#home"}>
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {listMenu.map((menu: MenuType) => (
            <Link
              key={menu.id}
              href={menu.url}
            >
              <h2 className='font-bold'>
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className="block md:hidden">
          <Hamburger
            isOpen={openDrawer}
            onClick={() => setOpenDrawer(!openDrawer)}
          />
        </div>

        <SideDrawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        />
      </div>
    </div>
  );
};

export default Header;
