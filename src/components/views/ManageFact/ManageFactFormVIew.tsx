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
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import ModalNotification from "@/components/shared/Modal/ModalNotification";
import { FactService } from "@/service/factService";

const BaseFactSchema = z.object({
  code: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  question: z.string().min(1, "Required"),
});

const EditFactSchema = BaseFactSchema.partial().extend({
  id: z.number(),
});
const defaultValues = {
  code: "",
  description: "",
  question: "",
};

export default function ManageFactFormView({
  mode,
  id,
}: {
  mode: string;
  id?: string;
}) {
  const router = useRouter();
  const isEdit = mode === PAGE_ACTION.EDIT;
  const schema = isEdit ? EditFactSchema : BaseFactSchema;
  type FactForm = z.infer<typeof schema>;

  const { modal, showSuccess, showFailed, closeModal, showConfirm } =
    useModal();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<FactForm>(defaultValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FactForm>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: FactForm) => {
    setPayload(data);
    showConfirm("Apakah anda yakin ingin melanjutkan proses ? ");
  };

  useEffect(() => {
    if (isEdit && id !== undefined) {
      fetchFactById(id);
    }
  }, []);

  const fetchFactById = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await FactService.findById(id);
      setValue("id", data.id);
      setValue("code", data.code);
      setValue("description", data.description);
      setValue("question", data.question);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const apiSaveFact = async (data: FactForm) => {
    setLoading(true);

    try {
      const response = isEdit
        ? await FactService.update(data)
        : await FactService.create(data);
      const message = getResponseMessage(response);

      showSuccess(message);
      setTimeout(() => {
        closeModal();
        router.push(ROUTE_PATHS.ADMIN.MANAGE_FACT.LIST);
      }, 2000);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_FACT.LIST);
  };

  const handleConfirm = () => {
    apiSaveFact(payload);
  };

  console.log("errors >",errors);
  

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="w-full">
        <Typography variant="h6">Tambah Fakta</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            size={12}
            direction={"column"}
            spacing={2}
            className="mt-4"
          >
            <div>
              <Typography>Kode Fakta</Typography>
              <TextField
                {...register("code")}
                fullWidth
                size="small"
                error={!!errors.code}
                helperText={errors.code?.message}
                placeholder="Kode Fakta"
              />
            </div>
            <div>
              <Typography>Pertanyaan konsultasi</Typography>
              <TextField
                {...register("question")}
                fullWidth
                size="small"
                error={!!errors.question}
                helperText={errors.question?.message}
                placeholder="Pertanyaan konsultasi"
              />
            </div>
            <div>
              <Typography>Deskripsi</Typography>
              <TextField
                {...register("description")}
                fullWidth
                multiline={true}
                rows={5}
                size="small"
                error={!!errors.description}
                helperText={errors.description?.message}
                placeholder="Deskripsi"
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
                  loading={loading}
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="!mt-6"
                >
                  Simpan
                </Button>
              </Grid>
            </div>
          </Grid>
        </form>
      </CardContent>

      <ModalNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        onConfirm={handleConfirm}
      />
    </Card>
  );
}
