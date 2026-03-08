"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { RuleService } from "@/service/ruleService";
import { useModal } from "@/hooks/useModal";
import ModalNotification from "@/components/shared/Modal/ModalNotification";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import { ConclusionService } from "@/service/conclusionService";
import { FactService } from "@/service/factService";
import { Option } from "@/types/common";

const defaultValues = {
  name: "",
  description: "",
  facts: [] as Option["id"][],
  conclusions: [] as Option["id"][],
};

const BaseManageRuleSchema = z.object({
  name: z.string().min(1, "Nama Rule wajib di isi"),
  description: z.string().optional(),
  facts: z.array(z.number()).min(1, "Pilih minimal satu fakta"),
  conclusions: z.array(z.number()).min(1, "Pilih minimal satu kesimpulan"),
});

const EditManageRuleSchema = BaseManageRuleSchema.partial().extend({
  id: z.number(),
});

export default function ManageRuleFormView() {
  const router = useRouter();
  const params = useParams();

  const paramsId = params?.id;

  const id = Array.isArray(paramsId) ? paramsId[0] : paramsId;
  const mode = params.mode;

  const isEdit = mode === PAGE_ACTION.EDIT;
  const isView = mode === PAGE_ACTION.VIEW;

  const schema = isEdit ? EditManageRuleSchema : BaseManageRuleSchema;

  type FormManageRule = z.infer<typeof schema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm<FormManageRule>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const watchedFacts = watch("facts") ?? [];
  const watchedConclusions = watch("conclusions") ?? [];

  const { modal, showSuccess, showFailed, closeModal, showConfirm } =
    useModal();

  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<any>();

  const [factOptions, setFactsOptions] = useState<Option[]>([]);
  const [conclusionOptions, setConclusionsOptions] = useState<Option[]>([]);

  const fetchRuleDetail = async () => {
    if (id === undefined) {
      return;
    }

    setLoading(true);
    try {
      const response = await RuleService.findById(id);
      const data = response.data;

      setValue("name", data.name);
      setValue("description", data.description);
      setValue("id", data.id);

      const facts = data.conditions.map((item: any) => item.id);
      const conclusions = data.conclusions.map((item: any) => item.id);

      setValue("facts", facts);
      setValue("conclusions", conclusions);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isView || isEdit) {
      fetchRuleDetail();
    }

    if (!isView) {
      fetchFactOptions();
      fetchConclusionOptions();
    }
  }, []);

  const fetchFactOptions = async () => {
    setLoading(true);
    try {
      const response = await FactService.getOptions();
      const data = response.data;
      setFactsOptions(data);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchConclusionOptions = async () => {
    setLoading(true);
    try {
      const response = await ConclusionService.getOptions();
      const data = response.data;
      setConclusionsOptions(data);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const errorCheck = () => {
    const errorForm = Object.values(errors).length > 0;

    return errorForm;
  };

  const onSubmit = (data: FormManageRule) => {
    if (errorCheck()) {
      showFailed("Form tidak valid, Mohon periksa kembali");
      return;
    }

    const payload = {
      ...data,
      conditions: data.facts,
      conclusions: data.conclusions,
    };

    setPayload(payload as any);
    showConfirm("Apakah anda yakin ingin melanjutkan proses ?");
  };

  const handleCancel = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_RULE.LIST);
  };

  const handleConfirm = () => {
    apiSaveRule(payload);
  };

  const apiSaveRule = async (data: any) => {
    setLoading(true);
    try {
      const response = isEdit
        ? await RuleService.update(data)
        : await RuleService.create(data);

      const message = getResponseMessage(response);
      showSuccess(message);

      setTimeout(() => {
        closeModal();
        router.push(ROUTE_PATHS.ADMIN.MANAGE_RULE.LIST);
      }, 2000);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFacts = (event: SelectChangeEvent<Option["id"][]>) => {
    const {
      target: { value },
    } = event;
    setValue("facts", value as Option["id"][]);
  };

  const handleChangeConclusions = (
    event: SelectChangeEvent<Option["id"][]>,
  ) => {
    const {
      target: { value },
    } = event;
    setValue("conclusions", value as Option["id"][]);
  };

  return (
    <Grid container flexDirection={"column"} spacing={4} size={12}>
      <Paper className="p-6 rounded-2xl shadow-md w-full mx-auto">
        <Grid container direction={"column"} spacing={2} rowGap={"2"}>
          <Typography variant="h6">
            {isEdit ? "Edit Aturan" : "Tambah Aturan"}
          </Typography>

          <div>
            <TextField
              {...register("name")}
              label="Nama Aturan"
              fullWidth
              size="medium"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </div>

          <Grid container size={{ xs: 6 }}>
            <FormControl fullWidth error={!!errors.facts}>
              <InputLabel id="fact-multiple-checkbox-label">
                Fakta dan Pertanyaan
              </InputLabel>
              <Select
                labelId="fact-multiple-checkbox-label"
                id="fact-multiple-checkbox"
                multiple
                size="medium"
                value={watchedFacts}
                onChange={(e: any) => handleChangeFacts(e)}
                input={<OutlinedInput label="Fakta dan Pertanyaan" />}
                renderValue={(selected) =>
                  factOptions
                    .filter((opt) => selected.includes(opt.id))
                    .map((opt) => opt.label)
                    .join(", ")
                }
              >
                {factOptions.length > 0 ? (
                  factOptions.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Checkbox checked={watchedFacts.includes(item.id)} />
                      <ListItemText primary={item.label} />
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No data available</MenuItem>
                )}
              </Select>

              <FormHelperText>{errors.facts?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid container size={{ xs: 6 }}>
            <FormControl fullWidth error={!!errors.conclusions}>
              <InputLabel id="conclusion-multiple-checkbox-label">
                Kategori Kesimpulan
              </InputLabel>
              <Select
                labelId="conclusion-multiple-checkbox-label"
                id="conclusion-multiple-checkbox"
                multiple
                size="medium"
                value={watchedConclusions}
                onChange={(e: any) => handleChangeConclusions(e)}
                input={<OutlinedInput label="Kategori Kesimpulan" />}
                renderValue={(selected) =>
                  conclusionOptions
                    .filter((opt) => selected.includes(opt.id))
                    .map((opt) => opt.label)
                    .join(", ")
                }
              >
                {conclusionOptions.length > 0 ? (
                  conclusionOptions.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Checkbox
                        checked={watchedConclusions.includes(item.id)}
                      />
                      <ListItemText primary={item.label} />
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No data available</MenuItem>
                )}
              </Select>
              <FormHelperText>{errors.conclusions?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <div>
            <TextField
              {...register("description")}
              label="Deskripsi"
              fullWidth
              size="small"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </div>

          <Grid container size={12} justifyContent={"end"}>
            <div className="flex justify-end gap-2">
              <Button
                loading={loading}
                variant="outlined"
                color="error"
                onClick={handleCancel}
              >
                Batal
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Simpan
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <ModalNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        onConfirm={handleConfirm}
      />
    </Grid>
  );
}
