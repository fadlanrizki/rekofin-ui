import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";
import { useModal } from "@/hooks/useModal";
import { UserService } from "@/service/userService";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { z } from "zod";

const EditProfileSchema = z.object({
  fullname: z.string().min(1, "Nama lengkap wajib diisi"),
  username: z.string().min(1, "Username wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]),
});

type EditProfileForm = z.infer<typeof EditProfileSchema>;

type GeneralProfileProps = {
  data: any;
  onUpdated?: () => Promise<void> | void;
};

export default function GeneralProfileView({
  data,
  onUpdated,
}: GeneralProfileProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingEditData, setPendingEditData] = useState<EditProfileForm | null>(null);

  const { modal, showSuccess, showFailed, showConfirm, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      gender: "UNKNOWN",
    },
    resolver: zodResolver(EditProfileSchema),
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    reset({
      fullname: data?.fullname || data?.fullName || "",
      username: data?.username || "",
      email: data?.email || "",
      gender: data?.gender || "UNKNOWN",
    });

  }, [data, reset]);

  const submitEditProfile = async (formData: EditProfileForm) => {
    setLoading(true);

    try {
      const response = await UserService.updateUserProfile(formData);

      const message =
        getResponseMessage(response) || "Profil berhasil diperbarui";
      showSuccess(message);
      setIsEdit(false);
      await onUpdated?.();
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (formData: EditProfileForm) => {
    setPendingEditData(formData);
    showConfirm("Yakin ingin menyimpan perubahan profil?");
  };

  const handleConfirmEdit = () => {
    if (!pendingEditData) {
      return;
    }

    void submitEditProfile(pendingEditData);
    setPendingEditData(null);
  };

  const handleCloseModal = () => {
    closeModal();
    if (modal.type === "confirm") {
      setPendingEditData(null);
    }
  };

  const handleCancelEdit = () => {
    reset({
      fullname: data?.fullname || data?.fullName || "",
      username: data?.username || "",
      email: data?.email || "",
      gender: data?.gender || "UNKNOWN",
    });
    setIsEdit(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Typography variant="h6" fontWeight={600}>
          Informasi Profil
        </Typography>

        {!isEdit ? (
          <Button
            variant="contained"
            startIcon={<FaEdit />}
            onClick={() => setIsEdit(true)}
            className="w-full sm:w-auto"
          >
            Edit Profil
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={handleCancelEdit}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
        )}
      </Box>

      <Box className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center lg:min-h-40">
        <FaUserCircle className="text-primary" size={72} />
        <Typography variant="subtitle1" fontWeight={600} className="mt-2">
          {data?.fullname || data?.fullName || "Pengguna"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data?.email || "-"}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
          <TextField
            {...register("fullname")}
            fullWidth
            label="Fullname"
            disabled={!isEdit || loading}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
          <TextField
            {...register("username")}
            fullWidth
            label="Username"
            disabled={!isEdit || loading}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
          <TextField
            {...register("email")}
            fullWidth
            label="Email"
            disabled={!isEdit || loading}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
          <TextField
            {...register("gender")}
            select
            fullWidth
            label="Gender"
            disabled={!isEdit || loading}
            error={!!errors.gender}
            helperText={errors.gender?.message}
            value={watch("gender")}
          >
            <MenuItem value="UNKNOWN">-</MenuItem>
            <MenuItem value="MALE">Laki-laki</MenuItem>
            <MenuItem value="FEMALE">Perempuan</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {isEdit && (
        <Box className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            loading={loading}
            className="w-full sm:w-auto"
          >
            Simpan Perubahan
          </Button>
        </Box>
      )}

      <SweetAlertNotification
        open={modal.open}
        message={modal.message}
        onClose={handleCloseModal}
        type={modal.type}
        onConfirm={handleConfirmEdit}
      />
    </form>
  );
}
