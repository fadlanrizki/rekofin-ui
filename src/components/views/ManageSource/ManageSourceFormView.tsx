"use client";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { SourceService } from "@/service/sourceService";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";

const BaseSourceSchema = z.object({
  title: z.string().min(1, "Required"),
  author: z.string().optional(),
  publisher: z.string().optional(),
  sourceType: z.string().optional(),
  url: z.string().optional(),
  description: z.string().optional(),
});

const EditSourceSchema = BaseSourceSchema.partial().extend({
  id: z.number(),
});

const defaultValues = {
  title: "",
  author: "",
  publisher: "",
  sourceType: "",
  url: "",
  description: "",
};

export default function ManageSourceFormView({
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
  const [payload, setPayload] = useState<SourceForm>(defaultValues);
  const schema = isEdit ? EditSourceSchema : BaseSourceSchema;
  type SourceForm = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<SourceForm>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: SourceForm) => {
    setPayload(data);
    showConfirm("Apakah anda yakin ingin melanjutkan proses ? ");
  };

  useEffect(() => {
    if (isEdit && id !== undefined) {
      fetchSourceById(id);
    }
  }, []);

  const fetchSourceById = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await SourceService.findById(id);
      setValue("title", data.title);
      setValue("author", data.author);
      setValue("publisher", data.publisher);
      setValue("sourceType", data.sourceType);
      setValue("url", data.url);
      setValue("description", data.description);
      setValue("id", data.id);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const apiSaveSource = async (data: SourceForm) => {
    setLoading(true);

    try {
      const response = isEdit
        ? await SourceService.update(data)
        : await SourceService.create(data);
      const message = getResponseMessage(response);

      showSuccess(message);
      setTimeout(() => {
        closeModal();
        router.push(ROUTE_PATHS.ADMIN.MANAGE_SOURCE.LIST);
      }, 2000);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_SOURCE.LIST);
  };

  const handleConfirm = () => {
    apiSaveSource(payload);
  };

  const handleChangeSourceType = (value: string) => {
    console.log(value);

  }

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="w-full">
        <Typography variant="h6">
          {isEdit ? "Edit" : "Tambah"} Sumber
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            size={12}
            direction={"column"}
            spacing={2}
            className="mt-4"
          >
            <div>
              <Typography>Nama Sumber</Typography>
              <TextField
                {...register("title")}
                fullWidth
                size="small"
                error={!!errors.title}
                helperText={errors.title?.message}
                placeholder="Nama Sumber"
              />
            </div>

            <div>
              <Typography>Penulis</Typography>
              <TextField
                {...register("author")}
                fullWidth
                size="small"
                error={!!errors.author}
                helperText={errors.author?.message}
                placeholder="Penulis"
              />
            </div>

            <div>
              <Typography>Penerbit</Typography>
              <TextField
                {...register("publisher")}
                fullWidth
                size="small"
                error={!!errors.publisher}
                helperText={errors.publisher?.message}
                placeholder="Penerbit"
              />
            </div>


            <FormControl fullWidth>
              <Typography>Jenis Sumber</Typography>
              <Controller name="sourceType" control={control} render={
                ({ field, fieldState }) => (
                  <TextField
                    {...field}
                    select
                    size="small"
                    error={!!fieldState.error}
                    placeholder="Pilih jenis sumber"
                    helperText={fieldState.error?.message}
                  >
                    <MenuItem value={"BOOK"}>Buku</MenuItem>
                    <MenuItem value={"JOURNAL"}>Jurnal</MenuItem>
                    <MenuItem value={"WEBSITE"}>Website</MenuItem>
                    <MenuItem value={"EXPERT"}>Pakar</MenuItem>
                    <MenuItem value={"OTHER"}>Lainnya</MenuItem>
                  </TextField>
                )
              }>
              </Controller>
            </FormControl>

            <div>
              <Typography>URL</Typography>
              <TextField
                {...register("url")}
                fullWidth
                size="small"
                error={!!errors.url}
                helperText={errors.url?.message}
                placeholder="URL"
              />
            </div>

            <div>
              <Typography>Deskripsi</Typography>
              <TextField
                {...register("description")}
                fullWidth
                multiline={true}
                rows={4}
                size="small"
                error={!!errors.description}
                placeholder="Deskripsi Sumber (Opsional)"
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
