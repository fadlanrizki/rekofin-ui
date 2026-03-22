"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { UserService } from "@/service/userService";
import { getErrorMessage } from "@/utils/message";
import { useModal } from "@/hooks/useModal";
import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";
import GeneralProfleView from "./General/GeneralProfleView";
import ChangePasswordView from "./ChangePassword/ChangePasswordView";

type UserProfile = {
 email: string
 fullName: string
 username: string
 gender?: string | null
 occupation: string
 createdAt: string
}

export default function ProfileView() {
  const { modal, showFailed, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    console.log(loading);

    try {
      const id = localStorage.getItem("id") || "-";
      const { data } = await UserService.findUserById(id);
      setUserProfile(data);
    
      
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChangeTab = (e: any, newValue: any) => {
    console.log(e);
    console.log(newValue);

    setTab(newValue);
  };

  const tabContent = () => {
    switch (tab) {
      case 0:
        return <GeneralProfleView data={userProfile} />;
      case 1:
        return <ChangePasswordView />;
      default:
        return "";
    }
  };

  return (
    <Grid size={{ xs: 12 }}>
      {/* Title */}
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ width: 80, height: 80, mb: 2 }}
                src="/avatar-placeholder.png"
              />
              <Typography variant="h6">John Doe</Typography>
              <Typography color="text.secondary">john@example.com</Typography>
              <Typography
                variant="caption"
                sx={{ mt: 2 }}
                color="text.secondary"
              >
                Joined: July 12, 2024
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Profile Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card className="h-full">
            <CardContent>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  marginBottom: 3,
                }}
              >
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                >
                  <Tab label="General" />
                  <Tab label="Change Password" />
                </Tabs>
              </Box>

              {tabContent()}
            </CardContent>
          </Card>
        </Grid>
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
