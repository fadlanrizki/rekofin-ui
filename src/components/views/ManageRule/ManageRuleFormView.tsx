"use client";

import React, { useState } from "react";
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

const formManageRule = z.object({
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

type FormManageRule = z.infer<typeof formManageRule>;

export default function ManageRuleFormView() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm<FormManageRule>({
    resolver: zodResolver(formManageRule),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "conditions",
  });

  const [loading, setLoading] = useState(false);
  
  const onSubmit = (data: FormManageRule) => {
    apiCreateRule(data);
  };

  const handleCancel = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_RULE.LIST);
  };

  const apiCreateRule = async (data: any) => {
    console.log(JSON.stringify(data));

    setLoading(true);
    try {
      const response = await RuleService.create(data);
      console.log(response);
      console.log("try");
    } catch (error) {
      console.log(error);
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

  console.log("errors > ", errors);
  console.log("watch > ", watch());

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
                    <MenuItem value="MENABUNG">Menabung</MenuItem>
                    <MenuItem value="DANA_DARURAT">Dana Darurat</MenuItem>
                    <MenuItem value="INVESTASI">Investasi</MenuItem>
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
            />
            {!!errors.description?.message && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
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
    </Grid>
  );
}
