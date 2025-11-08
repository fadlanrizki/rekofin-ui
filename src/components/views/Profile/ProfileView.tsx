"use client";

// import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  // Container,
  // Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  // TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { UserService } from "@/service/userService";
import { getErrorMessage } from "@/utils/message";
import { useModal } from "@/hooks/useModal";
import ModalNotification from "@/components/shared/Modal/ModalNotification";
import { FaEdit } from "react-icons/fa";

const profileForm = z.object({
  fullName: z.string().optional(),
  occupation: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string(),
});

type ProfileForm = z.infer<typeof profileForm>;

export default function ProfileView() {
  const {
    // register,
    //  handleSubmit,
    setValue,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileForm),
  });
  const {
    modal,
    closeModal,
    //  showConfirm,
    showFailed,
    //  showSuccess
  } = useModal();
  const [
    loading,
    setLoading,
  ] = useState(false);
  const [tab, setTab] = useState(0);

  const fetchUserProfile = async () => {
    setLoading(true);
    console.log(loading);
    
    try {
      const id = localStorage.getItem("id") || "-";
      const { data } = await UserService.findUserById(id);
      setValue("fullName", data.fullName);
      setValue("email", data.email);
      setValue("occupation", data.occupation);
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

    setTab(newValue);
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
              <Stack direction={"column"} spacing={2}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={"medium"}>
                      Fullname
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={"normal"}>
                      Fadlan Rizki
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      width: "130px",
                      height: "40px",
                    }}
                    variant="contained"
                    startIcon={<FaEdit />}
                  >
                    Edit
                  </Button>
                </Stack>

                <Box>
                  <Typography variant="subtitle1" fontWeight={"medium"}>
                    Username
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={"normal"}>
                    Fadlan
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight={"medium"}>
                    Email
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={"normal"}>
                    fadlan@gmail.com
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight={"medium"}>
                    Gender
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={"normal"}>
                    Laki-laki
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight={"medium"}>
                    Pekerjaan / Jabatan
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={"normal"}>
                    Programmer
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight={"medium"}>
                    Profil Risiko
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={"normal"}>
                    Moderat
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight={"medium"}>
                    Prinsip Finansial
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={"normal"}>
                    Syariah
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container rowSpacing={4}>
        <Grid size={12}>
          <Box>
            <Grid
              container
              size={{ xs: 12, sm: 12 }}
              justifyContent={"flex-end"}
            >
              {/* <Button
                onClick={() => {
                  handleSubmit(onSubmit);
                }}
                variant="contained"
                color="primary"
              >
                Update Profile
              </Button> */}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <ModalNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        // onConfirm={apiDeleteRule}
      />
    </Grid>
  );
}
