import { Box, Button, Stack, Typography } from "@mui/material";
import { FaEdit } from "react-icons/fa";

export default function GeneralProfleView() {
  return (
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
  );
}
