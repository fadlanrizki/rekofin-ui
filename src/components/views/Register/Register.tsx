"use client";

import Logo from "@/components/shared/Logo";
import { TextField, Button, Grid } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { useState } from "react";
import { registerService } from "@/service/authService";
import axios from "axios";
import ModalSuccess from "@/components/shared/Modal/ModalSuccess";
import ModalFailed from "@/components/shared/Modal/ModalFailed";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";

const initialValue = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const registerForm = z
  .object({
    fullName: z.string().min(1, "Required"),
    username: z.string().min(1, "Required"),
    email: z.email("Invalid email format"),
    password: z.string().min(1, "Required"),
    confirm_password: z.string().min(1, "Required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password do not match",
        path: ["confirm_password"],
      });
    }
  });

type RegisterForm = z.infer<typeof registerForm>;

function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterForm>({
    defaultValues: initialValue,
    resolver: zodResolver(registerForm),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalFailed, setOpenModalFailed] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      const res = await registerService(data);
      setMessage(res.message);
      setOpenModalSuccess(true);
      reset();

      setTimeout(() => {
        redirectToLogin();
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error?.response?.data?.message);
      } else if (error instanceof Error) {
        setMessage(error?.message);
      }
      setOpenModalFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const redirectToLogin = () => {
    router.push(ROUTE_PATHS.LOGIN);
  };
  return (
    <div className="flex min-h-screen">
      {/* KIRI: Branding Section */}
      <div className="w-1/2 bg-[#003366] text-white hidden md:flex flex-col justify-center items-center px-10 py-12">
        <h1 className="text-3xl font-bold text-center mb-4">
          Daftarkan Akunmu
        </h1>
        <p className="text-lg text-center mb-6 max-w-md">
          Mulai kelola keuanganmu dengan cerdas dan dapatkan rekomendasi terbaik
          dari sistem pakar kami.
        </p>
        <Image
          src="/images/illustration/signup-banner.svg"
          alt="Illustration Signup"
          className="w-72 mt-10"
          width={300}
          height={300}
        />
      </div>

      {/* KANAN: Form Register */}
      <div className="w-full md:w-1/2 bg-[#f9f9f9] flex flex-col items-center justify-center px-8">
        <Link className="text-center text-primary" href="/">
          <Logo />
        </Link>
        <div className="w-full max-w-md">
          <h2 className="text-lg font-medium text-gray-800 my-10 text-left">
            Buat Akun Baru
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container size={12} direction={"column"} spacing={2}>
              <TextField
                {...register("fullName")}
                fullWidth
                label="Nama Lengkap"
                variant="outlined"
                placeholder="Nama Lengkap"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />

              <TextField
                {...register("username")}
                fullWidth
                label="username"
                variant="outlined"
                type="text"
                placeholder="username"
                error={!!errors.username}
                helperText={errors.username?.message}
              />

              <TextField
                {...register("email")}
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                placeholder="user@example.com"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <PasswordTextfield
                {...register("password")}
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <PasswordTextfield
                {...register("confirm_password")}
                label="Konfirmasi Password"
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#2ecc71",
                  "&:hover": { backgroundColor: "#27ae60" },
                }}
                loading={loading}
                type="submit"
              >
                Daftar Sekarang
              </Button>
            </Grid>
          </form>
          <p className="mt-6 text-sm text-center text-gray-600">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-secondary font-bold hover:underline"
            >
              Masuk di sini.
            </Link>
          </p>
        </div>
      </div>
      <ModalSuccess
        open={openModalSuccess}
        onClose={() => setOpenModalSuccess(false)}
        message={message}
      />
      <ModalFailed
        open={openModalFailed}
        onClose={() => setOpenModalFailed(false)}
        message={message}
      />
    </div>
  );
}

export default Register;
