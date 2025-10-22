"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Paper,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { z } from "zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { RuleService } from "@/service/ruleService";
import { FaTrashCan } from "react-icons/fa6";
import { useModal } from "@/hooks/useModal";
import ModalNotification from "@/components/shared/Modal/ModalNotification";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { getErrorMessage, getResponseMessage } from "@/utils/message";

const defaultValues = {
  name: "",
  description: "",
  conditions: [
    {
      field: "",
      operator: "",
      value: "",
    },
  ],
  categoryResult: "",
  active: false,
};

const BaseManageRuleSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nama Rule wajib di isi"),
  description: z.string().optional(),
  conditions: z
    .array(
      z.object({
        field: z.string().min(1, "Field Harus di isi"),
        operator: z.string().min(1, "Operator harus di isi"),
        value: z.string().min(1, "Nilai Harus di isi"),
      })
    )
    .nonempty("Harus mempunyai minimal 1 kondisi"),
  categoryResult: z.string().min(1, "Category Result harus di isi"),
  active: z.boolean(),
});

export default function ManageRuleFormView({
  mode,
  id,
}: {
  mode: string;
  id?: string;
}) {
  const router = useRouter();
  const isEdit = mode === PAGE_ACTION.EDIT;
  const isView = mode === PAGE_ACTION.VIEW;

  type FormManageRule = z.infer<typeof BaseManageRuleSchema>;

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm<FormManageRule>({
    resolver: zodResolver(BaseManageRuleSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "conditions",
  });

  const { modal, showSuccess, showFailed, closeModal, showConfirm } =
    useModal();

  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<FormManageRule>();

  useEffect(() => {
    const fetchRule = async () => {
      if (id !== undefined) {
        setLoading(true);
        try {
          const response = await RuleService.findById(id);
          const data = response.data;

          setValue("name", data.name);
          setValue("description", data.description);
          setValue("categoryResult", data.categoryResult);
          setValue("active", data.active);
          setValue("conditions", data.conditions);
          setValue("id", data.id);
        } catch (error) {
          const message = getErrorMessage(error);
          showFailed(message);
        } finally {
          setLoading(false);
        }
      }
    };

    if (isView || isEdit) {
      fetchRule();
    }
  }, []);

  const onSubmit = (data: FormManageRule) => {
    setPayload(data);
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

  const handleAddCondition = () => {
    append({
      field: "",
      operator: "",
      value: "",
    });
  };

  return (
    <Grid container flexDirection={"column"} spacing={4} size={12}>
      <Paper className="p-6 rounded-2xl shadow-md w-full mx-auto">
        <Grid container direction={"column"} spacing={2} rowGap={"2"}>
          <Typography variant="h6">General</Typography>

          <div>
            <TextField
              {...register("name")}
              label="Rule Name"
              fullWidth
              size="small"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </div>

          <div>
            <Controller
              name={"categoryResult"}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <TextField
                    {...field}
                    select
                    label="Category Result"
                    fullWidth
                    size="small"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    <MenuItem value="menabung">Menabung</MenuItem>
                    <MenuItem value="dana_darurat">Dana Darurat</MenuItem>
                    <MenuItem value="investasi">Investasi</MenuItem>
                  </TextField>
                );
              }}
            />
          </div>

          <div>
            <TextField
              {...register("description")}
              label="Description"
              fullWidth
              size="small"
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </div>

          <div>
            <FormControlLabel
              control={<Switch {...register("active")} />}
              label="Active"
            />
          </div>
        </Grid>
      </Paper>
      <Paper className="p-6 rounded-2xl shadow-md w-full mx-auto">
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          className="mb-4"
        >
          <Typography variant="h6">Rule Condition</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCondition}
          >
            Add Condition
          </Button>
        </Grid>
        <Grid container direction={"column"} spacing={2}>
          {fields.map((field: any, index: number) => {
            return (
              <Grid
                key={field.id}
                container
                direction={"row"}
                spacing={2}
                alignItems={"center"}
              >
                <Grid size={1} container justifyContent={"center"}>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => remove(index)}
                  >
                    <FaTrashCan />
                  </IconButton>
                </Grid>
                <Grid size={4}>
                  <Controller
                    name={`conditions.${index}.field`}
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <TextField
                          {...field}
                          select
                          label="Field"
                          name="field"
                          fullWidth
                          size="small"
                          error={!!fieldState.error}
                        >
                          <MenuItem value="income">Pendapatan</MenuItem>
                          <MenuItem value="savings">Tabungan</MenuItem>
                          <MenuItem value="emergency_fund">
                            Dana Darurat
                          </MenuItem>
                          <MenuItem value="debt">Hutang</MenuItem>
                          <MenuItem value="monthly_expenses">
                            Pengeluaran Bulanan
                          </MenuItem>
                        </TextField>
                      );
                    }}
                  />
                </Grid>
                <Grid size={3}>
                  <Controller
                    name={`conditions.${index}.operator`}
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <TextField
                          {...field}
                          select
                          label="Operator"
                          fullWidth
                          size="small"
                          name="operator"
                          error={!!fieldState.error}
                        >
                          <MenuItem value="gt">{">"}</MenuItem>
                          <MenuItem value="lt">{"<"}</MenuItem>
                          <MenuItem value="gte">{">="}</MenuItem>
                          <MenuItem value="lte">{"<="}</MenuItem>
                          <MenuItem value="eq">{"="}</MenuItem>
                          <MenuItem value="neq">{"!="}</MenuItem>
                        </TextField>
                      );
                    }}
                  />
                </Grid>
                <Grid size={4}>
                  <Controller
                    name={`conditions.${index}.value`}
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <TextField
                          {...field}
                          name="value"
                          label="value"
                          type="number"
                          fullWidth
                          size="small"
                          error={!!fieldState.error}
                        />
                      );
                    }}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      <Grid container size={12} justifyContent={"end"}>
        <div className="flex justify-end gap-2">
          <Button
            loading={loading}
            variant="outlined"
            color="error"
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Save Rule
          </Button>
        </div>
      </Grid>
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
