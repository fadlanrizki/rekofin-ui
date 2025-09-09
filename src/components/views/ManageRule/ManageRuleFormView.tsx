"use client";

import React from "react";
import {
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Paper,
  Grid,
  Typography,
} from "@mui/material";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";


const formManageRule = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  conditions: z.string().min(1, "Required"),
  categoryResult: z.string().min(1, "Required"),
  active: z.boolean(),
});

type FormManageRule = z.infer<typeof formManageRule>;

export default function ManageRuleFormView() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormManageRule>({
    resolver: zodResolver(formManageRule),
  });

  const onSubmit = (data: FormManageRule) => {
    console.log(data);

    // TODO Hit API
  };

  const handleCancel = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_RULE.LIST)
  }

  return (
    <Grid container size={12}>
      <Paper className="p-6 rounded-2xl shadow-md w-full mx-auto">
        <Grid container direction={"column"} spacing={2} rowGap={"2"}>
          <Typography variant="h6">Add New Rule</Typography>

          <div>
            <TextField
              {...register("name")}
              label="Rule Name"
              fullWidth
              size="small"
              error={!!errors.name}
            />
            {!!errors.name?.message && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
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
            <TextField
              {...register("conditions")}
              label="Conditions (JSON)"
              fullWidth
              size="small"
              multiline
              rows={4}
              placeholder='Contoh: { "monthlyIncome": { "gt": 5000000 }, "riskProfile": "Aggressive" }'
              error={!!errors.conditions}
            />
            {!!errors.conditions?.message && (
              <p className="text-red-500">{errors.conditions.message}</p>
            )}
          </div>

          <div>
            <TextField
              {...register("categoryResult")}
              select
              label="Category Result"
              fullWidth
              size="small"
              error={!!errors.categoryResult}
            >
              <MenuItem value="MENABUNG">Menabung</MenuItem>
              <MenuItem value="DANA_DARURAT">Dana Darurat</MenuItem>
              <MenuItem value="INVESTASI">Investasi</MenuItem>
            </TextField>
            {!!errors.categoryResult?.message && (
              <p className="text-red-500">{errors.categoryResult.message}</p>
            )}
          </div>

          <div>
            <FormControlLabel
              control={<Switch {...register("active")} />}
              label="Active"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
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
      </Paper>
    </Grid>
  );
}
