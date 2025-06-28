"use client";
import { Button } from "@mui/material";
import Logo from "../shared/logo/Logo";
import Link from "next/link";

const SectionHeader = () => {
  return (
    <div className="w-full flex justify-center py-8 px-5 font-bold text-white bg-[#003366] border-b-1 border-[#eaeaea] sticky top-0">
      <div className="w-3/4 flex justify-between">
        <Logo />
        <div className="flex gap-5">
          <Link href={"/login"}>
            <Button variant="contained">Masuk</Button>
          </Link>
          <Link href={"/register"}>
            <Button variant="contained">Daftar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
