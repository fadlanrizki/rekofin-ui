"use client";

import Logo from "@/components/shared/Logo";
import { TextField, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import { FormEvent, useState } from "react";
import { registerService } from "@/service/authService";
import Snackbar from "@mui/material/Snackbar";

const initiateValue = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

function Register() {
  const [userData, setUserData] = useState(initiateValue);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleReset = () => {
    setUserData(initiateValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setOpenSnackBar(true);
    e.preventDefault();
    try {
      setLoading(true);
      const res: UserRegisterResponseType = await registerService(userData);
      setMessage(res.message ?? "");
      setOpenSnackBar(true);
    } catch (e) {
      console.log(e);
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
          <h2 className="text-2xl font-bold text-gray-800 my-10 text-center">
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
            />
            <TextField
              fullWidth
              label="username"
              variant="outlined"
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              placeholder="user@example.com"
              onChange={handleChange}
              name={"email"}
            />
            <PasswordTextfield
              label="Password"
              onChange={handleChange}
              name="password"
            />
            <PasswordTextfield
              label="Konfirmasi Password"
              onChange={handleChange}
              name="confirm_password"
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        message={message}
        key={"bottom" + "right"}
        autoHideDuration={5000}
      />
    </div>
  );
}

export default Register;
