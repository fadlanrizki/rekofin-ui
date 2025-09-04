"use client";

import PasswordTextfield from "@/components/shared/Textfield/PasswordTextfield/PasswordTextfield";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const { register, handleSubmit } = useForm<ProfileForm>({
    resolver: zodResolver(profileForm),
  });

  const onSubmit = (data: ProfileForm) => {
    console.log(data);
    
  }

  return (
    <Container maxWidth="lg">
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Profile Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="h-full">
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
              <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                Employee
              </Typography>
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
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    {...register("fullName")}
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    {...register("occupation")}
                    label="Occupation"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    {...register("email")}
                    label="Email"
                    fullWidth
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Optional: Change Password Section */}
      <Grid container rowSpacing={4}>
        <Grid size={12}>
          <Box mt={6} maxWidth="full" mx="auto">
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Change Password
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <PasswordTextfield
                      {...register("password")}
                      label="Current Password"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <PasswordTextfield
                      {...register("newPassword")}
                      type="password"
                      label="New Password"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <PasswordTextfield
                      {...register("confirmPassword")}
                      type="password"
                      label="Confirm New Password"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <Grid
              container
              size={{ xs: 12, sm: 12 }}
              justifyContent={"flex-end"}
            >
              <Button onClick={() => {handleSubmit(onSubmit)}} variant="contained" color="primary">
                Update Profile
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
