"use client";
import Logo from "@/components/shared/Logo";
import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { loginService } from "@/service/authService";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Snackbar from "@mui/material/Snackbar";

import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";

const initialValue = {
  username: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserLoginRequestType>(initialValue);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e?.target.name;
    const value = e.target.value;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginService(formData);
      if (res.data.role === "user") {
        router.push(ROUTE_PATHS.USER.DASHBOARD);
      } else {
        router.push(ROUTE_PATHS.ADMIN.DASHBOARD)
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <form
              className="space-y-5 flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                label="Username / Email"
                variant="outlined"
                type="text"
                placeholder="user@example.com"
                name="username"
                onChange={handleChange}
              />
              <PasswordTextfield name="password" onChange={handleChange} />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#2ecc71",
                  "&:hover": { backgroundColor: "#27ae60" },
                }}
                type="submit"
                loading={loading}
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
    </>
  );
};

export default Login;
