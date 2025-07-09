import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#f9f9f9] text-white sm:w-full px-5 md:w-3/4 flex items-center h-[750px] rounded-lg">
        <div className="w-full px-4 flex justify-evenly items-center">
          
          <div className="md:w-3/4 h-[500px] md:h-[400px] flex flex-col justify-evenly  xl:w-1/2 text-center md:text-left space-y-6">
            <h1 className="text-4xl font-bold text-primary">
              Sistem Pakar Rekomendasi Keuangan untuk Karyawan
            </h1>
            <p className="text-lg text-[#2c3e50]">
              Dapatkan strategi menabung, dana darurat, dan investasi secara
              otomatis berdasarkan profil keuangan Anda. Data finansial akan di
              proses berdasarkan pengetahuan pakar, buku dan konten edukasi
              publik.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link href={"/login"}>
                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#27ae60] transition">
                  Mulai Sekarang
                </button>
              </Link>
              <Link href="#about">
              <button className="border border-secondary text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-[#e9fcef] transition">
                Pelajari Lebih Lanjut
              </button>
              </Link>
              
            </div>
          </div>
          <div className="hidden xl:block mt-10">
            <Image
              width={400}
              height={400}
              src="/images/illustration/landing-page/hero-pict.svg"
              alt="Ilustrasi sistem pakar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
