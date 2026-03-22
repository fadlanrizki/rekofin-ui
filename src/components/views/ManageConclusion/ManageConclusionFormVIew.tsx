"use client";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { ConclusionService } from "@/service/conclusionService";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";

const BaseConclusionSchema = z.object({
  code: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
});

const EditConclusionSchema = BaseConclusionSchema.partial().extend({
  id: z.number(),
});
const defaultValues = {
  code: "",
  category: "",
  description: ""
};

export default function ManageConclusionFormView({
  mode,
  id,
}: {
  mode: string;
  id?: string;
}) {
  const router = useRouter();

  const isEdit = mode === PAGE_ACTION.EDIT;

  const { modal, showSuccess, showFailed, closeModal, showConfirm } =
    useModal();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<ConclusionForm>(defaultValues);

  const schema = isEdit ? EditConclusionSchema : BaseConclusionSchema;
  type ConclusionForm = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ConclusionForm>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: ConclusionForm) => {
    setPayload(data);
    showConfirm("Apakah anda yakin ingin melanjutkan proses ? ");
  };

  useEffect(() => {
    if (isEdit && id !== undefined) {
      fetchConclusionById(id);
    }
  }, []);

  const fetchConclusionById = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await ConclusionService.findById(id);
      setValue("code", data.code);
      setValue("category", data.category);
      setValue("description", data.description);
      setValue("id", data.id);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const apiSaveRecommendation = async (data: ConclusionForm) => {
    setLoading(true);

    try {
      const response = isEdit
        ? await ConclusionService.update(data)
        : await ConclusionService.create(data);
      const message = getResponseMessage(response);

      showSuccess(message);
      setTimeout(() => {
        closeModal();
        router.push(ROUTE_PATHS.ADMIN.MANAGE_CONCLUSION.LIST);
      }, 2000);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_CONCLUSION.LIST);
  };

  const handleConfirm = () => {
    apiSaveRecommendation(payload);
  };

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="w-full">
        <Typography variant="h6">{isEdit ? "Edit" : "Tambah"} Kesimpulan</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            size={12}
            direction={"column"}
            spacing={2}
            className="mt-4"
          >
            <div>
              <Typography>Kode Kesimpulan</Typography>
              <TextField
                {...register("code")}
                fullWidth
                size="small"
                error={!!errors.code}
                helperText={errors.code?.message}
                placeholder="Kode Kesimpulan"
              />
            </div>
            <div>
              <Typography>Kategori</Typography>
              <TextField
                {...register("category")}
                fullWidth
                size="small"
                error={!!errors.category}
                helperText={errors.category?.message}
                placeholder="Kategori"
              />
            </div>

            <div>
              <Typography>Deskripsi</Typography>
              <TextField
                {...register("description")}
                multiline
                minRows={4}
                fullWidth
                size="small"
                error={!!errors.description}
                placeholder="Deskripsi"
                helperText={errors.description?.message}
              />
            </div>

            {/* Save Button */}
            <div>
              <Grid container spacing={2} justifyContent={"flex-end"}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCancel}
                  className="!mt-6"
                >
                  Batal
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="!mt-6"
                  loading={loading}
                >
                  Simpan
                </Button>
              </Grid>
            </div>
          </Grid>
        </form>
      </CardContent>

      <SweetAlertNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        onConfirm={handleConfirm}
      />
    </Card>
  );
}
