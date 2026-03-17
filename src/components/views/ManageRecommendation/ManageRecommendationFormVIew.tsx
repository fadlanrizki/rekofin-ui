"use client";
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { RecommendationService } from "@/service/recommendationService";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import ModalNotification from "@/components/shared/Modal/ModalNotification";
import { ConclusionService } from "@/service/conclusionService";
import { SourceService } from "@/service/sourceService";

const BaseRecommendationSchema = z.object({
  title: z.string().min(1, "Required"),
  sourceId: z.number(),
  content: z.string().min(1, "Required"),
  conclusionId: z.number(),
});

const EditRecommendationSchema = BaseRecommendationSchema.partial().extend({
  id: z.number(),
});
const defaultValues = {
  title: "",
  sourceId: 0,
  content: "",
  conclusionId: 0,
};

export default function ManageRecommendationFormView({
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
  const [payload, setPayload] = useState<RecommendationForm>(defaultValues);
  const [conclusionOptions, setConclusionOptions] = useState<Array<any>>([]);
  const [sourceOptions, setSourceOptions] = useState<Array<any>>([]);
  const schema = isEdit ? EditRecommendationSchema : BaseRecommendationSchema;
  type RecommendationForm = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<RecommendationForm>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: RecommendationForm) => {
    setPayload(data);
    showConfirm("Apakah anda yakin ingin melanjutkan proses ? ");
  };

  useEffect(() => {
    if (isEdit && id !== undefined) {
      fetchRecommendationById(id);
    }

    fetchConclusionOptions();
    fetchSourceOptions();
  }, []);

  const fetchConclusionOptions = async () => {
    setLoading(true);
    try {
      // Fetch conclusion options if needed
      const { data } = await ConclusionService.getOptions();
      if (!data) {
        setConclusionOptions([]);
      }

      setConclusionOptions(data);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSourceOptions = async () => {
    setLoading(true);
    try {
      // Fetch source options if needed
      const { data } = await SourceService.getOptions();
      if (!data) {
        setSourceOptions([]);
      }

      setSourceOptions(data);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendationById = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await RecommendationService.findById(id);
      setValue("title", data.title);
      setValue("sourceId", data.source.id);
      setValue("content", data.content);
      setValue("conclusionId", data.conclusion.id);
      setValue("id", data.id);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const apiSaveRecommendation = async (data: RecommendationForm) => {
    setLoading(true);

    try {
      const response = isEdit
        ? await RecommendationService.update(data)
        : await RecommendationService.create(data);
      const message = getResponseMessage(response);

      showSuccess(message);
      setTimeout(() => {
        closeModal();
        router.push(ROUTE_PATHS.ADMIN.MANAGE_RECOMMENDATION.LIST);
      }, 2000);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_RECOMMENDATION.LIST);
  };

  const handleConfirm = () => {
    apiSaveRecommendation(payload);
  };

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="w-full">
        <Typography variant="h6">
          {isEdit ? "Edit" : "Tambah"} Rekomendasi
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
              <Typography>Title</Typography>
              <TextField
                {...register("title")}
                fullWidth
                size="small"
                error={!!errors.title}
                helperText={errors.title?.message}
                placeholder="Title"
              />
            </div>

            <Grid container size={12} spacing={2}>
              <Grid size={6}>
                <Typography>Sumber</Typography>
                <Controller
                  name="sourceId"
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        size="small"
                        error={!!fieldState.error}
                        placeholder="Pilih sumber"
                        helperText={fieldState.error?.message}
                      >
                        <MenuItem value="">
                          --- Pilih Sumber ---
                        </MenuItem>
                        {sourceOptions.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    );
                  }}
                />
              </Grid>
              <Grid size={6}>
                <Typography>Kategori Kesimpulan</Typography>
                <Controller
                  name="conclusionId"
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        size="small"
                        error={!!fieldState.error}
                        placeholder="Pilih kesimpulan"
                        helperText={fieldState.error?.message}
                      >
                        <MenuItem value="">
                          --- Pilih Kategori Kesimpulan ---
                        </MenuItem>
                        {conclusionOptions.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    );
                  }}
                />
              </Grid>
            </Grid>

            <div>
              <Typography>Content</Typography>
              <TextField
                {...register("content")}
                fullWidth
                multiline={true}
                rows={5}
                size="small"
                error={!!errors.content}
                placeholder="Konten Rekomendasi"
                helperText={errors.content?.message}
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
