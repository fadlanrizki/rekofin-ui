"use client"

import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import financialExpertAnimation from "../../../../../public/animation/financial-expert-animation.json";

const Hero = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#f9f9f9] px-5 py-10 w-full flex items-center justify-center rounded-lg">
        <div className="w-3/4 flex justify-between items-center">
          <div className="w-full xl:w-1/2 flex flex-col md:text-left gap-4">
            <h1 className="text-6xl font-bold text-primary">
              Rekofin
            </h1>
            <h1 className="text-3xl font-medium text-primary">
              Sistem Pakar Rekomendasi Strategi Pengelolaan Keuangan
            </h1>
            <p className="text-lg text-[#2c3e50]">
              Dapatkan strategi menabung, dana darurat, dan investasi secara
              otomatis berdasarkan profil keuangan Anda. Data finansial akan di
              proses berdasarkan pengetahuan pakar, buku dan konten edukasi
              publik.
            </p>
            <div className="flex gap-4 justify-start">
              <Link href={"/login"}>
                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#27ae60] transition cursor-pointer">
                  Mulai Sekarang
                </button>
              </Link>
              <Link href="#about">
                <button className="border border-secondary text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-[#e9fcef] transition cursor-pointer">
                  Pelajari Lebih Lanjut
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden xl:block mt-10">
            <Lottie animationData={financialExpertAnimation} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
