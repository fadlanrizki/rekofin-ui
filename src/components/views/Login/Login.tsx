"use client";

import Logo from "@/components/shared/Logo";
import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import ModalFailed from "@/components/shared/Modal/ModalFailed";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { decodeToken, isTokenValid } from "@/utils/jwt";
import { loginSchema, TLogin } from "@/types/auth";
import { loginService } from "@/service/authService";

const initialValue = {
  credential: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    defaultValues: initialValue,
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = useState<string>("");
  const [openModalFailed, setOpenModalFailed] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: TLogin) => {
    try {
      setLoading(true);
      const res = await loginService(data);

      const token = res?.data?.token || "";
      const decodedToken = decodeToken(token);

      localStorage.setItem("token", token);
      localStorage.setItem("id", decodedToken.id.toString());
      localStorage.setItem("username", decodedToken.username);

      if (decodedToken?.role === "USER") {
        router.push(ROUTE_PATHS.USER.DASHBOARD);
      } else {
        router.push(ROUTE_PATHS.ADMIN.DASHBOARD);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
      } else if (error instanceof Error) {
        setError(error.message);
      }
      setOpenModalFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const checkIsLoggedIn = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    if (isTokenValid(token)) {
      const decode = decodeToken(token);
      const role = decode?.role;

      if (role === "admin") {
        router.push(ROUTE_PATHS.ADMIN.DASHBOARD);
      } else {
        router.push(ROUTE_PATHS.USER.DASHBOARD);
      }
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

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
            <h2 className="text-lg font-medium text-gray-800 mb-6 text-left">
              Masuk ke Akun Anda
            </h2>
            <form
              className="space-y-5 flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                {...register("credential")}
                fullWidth
                label="Username / Email"
                variant="outlined"
                error={!!errors.credential}
                helperText={errors.credential?.message}
              />
              <PasswordTextfield
                {...register("password")}
                name="password"
                label={"Password"}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

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
        <ModalFailed
          open={openModalFailed}
          onClose={() => setOpenModalFailed(false)}
          message={error}
        />
      </div>
    </>
  );
};

export default Login;
