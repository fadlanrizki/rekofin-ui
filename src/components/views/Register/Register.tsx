"use client";

import Logo from "@/components/shared/Logo";
import { TextField, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { ChangeEvent, FormEvent, useState } from "react";
import { registerService } from "@/service/authService";
import { UserRegisterResponseType } from "@/types/user";
import axios from "axios";
import ModalSuccess from "@/components/shared/Modal/ModalSuccess";
import ModalFailed from "@/components/shared/Modal/ModalFailed";

const initialValue = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

function Register() {
  const [userData, setUserData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalFailed, setOpenModalFailed] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleReset = () => {
    setUserData(initialValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res: UserRegisterResponseType = await registerService(userData);
      setMessage(res.message);
      setOpenModalSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error?.response?.data?.message);
      } else if (error instanceof Error) {
        setMessage(error?.message);
      }
      setOpenModalFailed(true);
    } finally {
      setLoading(false);
      handleReset();
    }
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
          <form
            className="space-y-5 flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Nama Lengkap"
              variant="outlined"
              type="text"
              placeholder="Nama Lengkap"
              onChange={handleChange}
              name="fullName"
              value={userData.fullName}
            />
            <TextField
              fullWidth
              label="username"
              variant="outlined"
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
              value={userData.username}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              placeholder="user@example.com"
              onChange={handleChange}
              name={"email"}
              value={userData.email}
            />
            <PasswordTextfield
              label="Password"
              onChange={handleChange}
              name="password"
              value={userData.password}
            />
            <PasswordTextfield
              label="Konfirmasi Password"
              onChange={handleChange}
              name="confirm_password"
              value={userData.confirm_password}
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
