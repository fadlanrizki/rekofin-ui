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
} from "@mui/material";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { RuleService } from "@/service/ruleService";

const formManageRule = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  conditions: z.string().optional(),
  categoryResult: z.string().optional(),
  active: z.boolean(),
});

type FormManageRule = z.infer<typeof formManageRule>;

export default function ManageRuleFormView() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
  } = useForm<FormManageRule>({
    resolver: zodResolver(formManageRule),
  });

  const [loading, setLoading] = useState(false);

  // const onSubmit = (data: FormManageRule) => { 
  const onSubmit = (data: any) => { 
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
        </Grid>
      </Paper>
      <Paper className="p-6 rounded-2xl shadow-md w-full mx-auto">
        <Grid container justifyContent={"space-between"} alignItems={"center"} className="mb-4">
          <Typography variant="h6">Rule Condition</Typography>
          <Button variant="contained" color="primary" onClick={() => {}}>
            Add Condition
          </Button>
        </Grid>
        <Grid container direction={"column"} spacing={2}>
          <Grid container direction={"row"} spacing={2}>
            <Grid size={4}>
              <TextField select label="Field" fullWidth size="small">
                <MenuItem value="income">Pendapatan</MenuItem>
                <MenuItem value="savings">Tabungan</MenuItem>
                <MenuItem value="emergency_fund">Dana Darurat</MenuItem>
                <MenuItem value="debt">Hutang</MenuItem>
                <MenuItem value="monthly_expenses">Pengeluaran Bulanan</MenuItem>
              </TextField>
            </Grid>
            <Grid size={4}>
              <TextField select label="Operator" fullWidth size="small">
                <MenuItem value="gt">{">"}</MenuItem>
                <MenuItem value="lt">{"<"}</MenuItem>
                <MenuItem value="gte">{">="}</MenuItem>
                <MenuItem value="lte">{"<="}</MenuItem>
                <MenuItem value="eq">{"="}</MenuItem>
                <MenuItem value="neq">{"!="}</MenuItem>
              </TextField>
            </Grid>
            <Grid size={4}>
              <TextField label="value" type="number" fullWidth size="small" />
            </Grid>
          </Grid>
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
              onClick={() => onSubmit({})}
            >
              Save Rule
            </Button>
          </div>
      </Grid>
    </Grid>
  );
}
