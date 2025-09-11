"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/utils/jwt";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import Loading from "@/components/shared/Loading";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenValid(token)) {
      localStorage.removeItem("token");
      router.replace(ROUTE_PATHS.LOGIN);
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="flex-col items-center justify-center gap-2">
          <Loading />
          <p className="text-center text-slate-500 font-medium text-2xl">Loading ...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
