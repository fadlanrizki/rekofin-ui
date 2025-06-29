"use client";
import Image from "next/image";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/*Left: Branding Section */}
      <div className="w-1/2 bg-primary text-white hidden md:flex flex-col  justify-center items-center px-10 py-12">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Bangun Masa Depan Finansialmu
        </h1>
        <p className="text-lg text-center mb-6 max-w-md">
          Sistem pakar rekomendasi strategi keuangan untuk membantu karyawan
          mengelola keuangannya lebih baik.
        </p>
        <ul className="text-sm list-disc list-inside text-white space-y-2">
          <li>Rekomendasi berdasarkan fakta keuangan</li>
          <li>Didasarkan dari pakar, buku, dan konten edukatif</li>
          <li>Mudah digunakan dan aman</li>
        </ul>
        <div className="mt-10">
          <Image
            src="/images/illustration/signin-banner.svg"
            alt="Illustration"
            width={300}
            height={300}
          />
        </div>
      </div>

      {/* KANAN: Login Form */}
      <div className="w-full md:w-1/2 bg-background-light flex flex-col justify-center items-center px-12 gap-10">
      <Link href={"/"} className="text-primary">
        <Logo />
      </Link>
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Masuk ke Akun Anda
          </h2>
          <form className="space-y-5 flex flex-col gap-5">
            <TextField
              fullWidth
              label="Username / Email"
              variant="outlined"
              type="email"
              placeholder="user@example.com"
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              placeholder="••••••••"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <FaEye size={20} />
                      ) : (
                        <FaEyeSlash size={20} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#2ecc71",
                "&:hover": { backgroundColor: "#27ae60" },
              }}
            >
              Login
            </Button>
          </form>
          <p className="mt-6 text-sm text-center text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-secondary font-medium hover:underline"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
