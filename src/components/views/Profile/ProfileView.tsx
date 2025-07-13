"use client";

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

export default function ProfileView() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Profile Info */}
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
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    defaultValue="John Doe"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Occupation"
                    fullWidth
                    variant="outlined"
                    defaultValue="Software Engineer"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Email"
                    fullWidth
                    variant="outlined"
                    value="john@example.com"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button variant="contained" color="primary">
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Optional: Change Password Section */}
      <Box mt={6} maxWidth="full" mx="auto">
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  type="password"
                  label="Current Password"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  type="password"
                  label="New Password"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  type="password"
                  label="Confirm New Password"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="contained" color="success">
                Update Password
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
