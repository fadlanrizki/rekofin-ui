"use client";

import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";
import ChangePasswordView from "@/components/views/Profile/ChangePassword/ChangePasswordView";
import GeneralProfileView from "@/components/views/Profile/General/GeneralProfileView";
import { useModal } from "@/hooks/useModal";
import { UserService } from "@/service/userService";
import { getErrorMessage } from "@/utils/message";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

type UserProfile = {
  email: string;
  fullname: string;
  username: string;
  gender?: string | "MALE" | "FEMALE" | "UNKNOWN";
  occupation: string;
  createdAt: string;
  role: string | "ADMIN" | "USER";
  isActive: boolean;
};

const normalizeProfile = (raw: any): UserProfile => {
  return {
    email: raw?.email || "-",
    fullname: raw?.fullname || raw?.fullName || "-",
    username: raw?.username || "-",
    gender: raw?.gender || "UNKNOWN",
    occupation: raw?.occupation || "-",
    createdAt: raw?.createdAt || "",
    role: raw?.role || "USER",
    isActive: raw?.isActive ?? true,
  };
};

export default function ProfileView() {
  const { modal, showFailed, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);

    try {
      const response = await UserService.getUserProfile();
      const rawProfile = response?.data || response;
      setProfile(normalizeProfile(rawProfile));
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  }, [showFailed]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <Grid
      container
      spacing={2}
      size={{ xs: 12 }}
      alignItems="stretch"
      className="lg:min-h-[70vh]"
    >
      <Grid size={{ xs: 12, lg: 12 }} className="flex">
        <Box className="h-full w-full rounded-xl border border-gray-200 bg-background-light p-4 sm:p-6">
          {loading && !profile ? (
            <Box className="flex min-h-60 items-center justify-center">
              <CircularProgress color="inherit" size={28} />
            </Box>
          ) : (
            <GeneralProfileView data={profile} onUpdated={fetchUserProfile} />
          )}
        </Box>
      </Grid>

      <Grid size={{ xs: 12, lg: 12 }} className="flex">
        <Box className="h-full w-full rounded-xl border border-gray-200 bg-background-light p-4 sm:p-6">
          <ChangePasswordView />
        </Box>
      </Grid>

      <SweetAlertNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        // onConfirm={apiDeleteRule}
      />
    </Grid>
  );
}
