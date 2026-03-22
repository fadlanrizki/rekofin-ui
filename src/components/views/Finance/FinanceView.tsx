"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FaChevronDown } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinancialService } from "@/service/financialService";
import { useState } from "react";
import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";
import { useModal } from "@/hooks/useModal";
import { getErrorMessage, getResponseMessage } from "@/utils/message";

const financeForm = z.object({
  monthlyIncome: z.string().min(1, "Required"),
  totalSavings: z.string().min(1, "Required"),
  emergencyFund: z.string().min(1, "Required"),
  investment: z.string().min(1, "Required"),
  debt: z.string().min(1, "Required"),
  monthlyExpenses: z.string().min(1, "Required"),
  riskProfile: z.string(),
  financialPrinciple: z.string(),
});

type FinanceForm = z.infer<typeof financeForm>;

const RISK_PROFILE = {
  CONSERVATIVE: "conservative",
  MODERATE: "moderate",
  AGGRESSIVE: "aggressive",
};

const FINANCE_PRINCIPLE = {
  SYARIAH: "syariah",
  CONVENTIONAL: "conventional",
  BOTH: "both",
};

export default function FinanceView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FinanceForm>({
    resolver: zodResolver(financeForm),
    defaultValues: {
      riskProfile: RISK_PROFILE.MODERATE,
      financialPrinciple: FINANCE_PRINCIPLE.BOTH,
    },
  });

  const { modal, showSuccess, showFailed, closeModal, showConfirm } =
    useModal();

  const [financialData, setFinancialData] = useState<FinanceForm>();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FinanceForm) => {
    setFinancialData(data);
    showConfirm("Apakah anda yakin ingin menyimpan data finansial ?");
  };

  const saveFinancialData = async (data: any) => {
    let message = "";
    try {
      setLoading(true);
      const response = await FinancialService.create(data);
      console.log(response);
      message = getResponseMessage(response);
      showSuccess(message);
    } catch (error) {
      message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    const userId = localStorage.getItem("id");
    let payload;
    if (financialData) {
      payload = {
        monthlyIncome: parseInt(financialData?.monthlyIncome),
        totalSavings: parseInt(financialData?.totalSavings),
        emergencyFund: parseInt(financialData?.emergencyFund),
        investment: parseInt(financialData?.investment),
        debt: parseInt(financialData?.debt),
        monthlyExpenses: parseInt(financialData?.monthlyExpenses),
        riskProfile: financialData.riskProfile,
        financialPrinciple: financialData.financialPrinciple,
        userId: userId ? parseInt(userId) : 0
      };
    }

    saveFinancialData(payload);
  };

  return (
    <div className="space-y-4">
      {/* Section 1: Main Financial Info */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<FaChevronDown />}>
          <Typography fontWeight="bold">
            Main Financial Info <span className="text-red-500">*</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("monthlyIncome")}
                label="Monthly Income"
                fullWidth
                type="number"
                error={!!errors.monthlyIncome}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("totalSavings")}
                label="Total Savings"
                fullWidth
                type="number"
                error={!!errors.totalSavings}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("emergencyFund")}
                label="Emergency Fund"
                fullWidth
                type="number"
                error={!!errors.emergencyFund}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("investment")}
                label="Investment"
                fullWidth
                type="number"
                error={!!errors.investment}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("debt")}
                label="Debt"
                fullWidth
                type="number"
                error={!!errors.debt}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("monthlyExpenses")}
                label="Monthly Expenses"
                fullWidth
                type="number"
                error={!!errors.monthlyExpenses}
                required
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Section 2: Risk Profile */}
      <Accordion>
        <AccordionSummary expandIcon={<FaChevronDown />}>
          <Typography fontWeight="bold">
            Risk Profile <span className="text-red-500">*</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Controller
            name="riskProfile"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                className="w-[200px]"
              >
                <div className="flex justify-between items-center">
                  <FormControlLabel
                    value={RISK_PROFILE.CONSERVATIVE}
                    control={<Radio />}
                    label="Conservative"
                  />
                  <Tooltip title="Cenderung memilih investasi aman dengan risiko rendah dan imbal hasil kecil.">
                    <IconButton>
                      <IoMdInformationCircleOutline
                        className="text-primary"
                        size={20}
                      />
                    </IconButton>
                  </Tooltip>
                </div>

                <div className="flex justify-between items-center">
                  <FormControlLabel
                    value={RISK_PROFILE.MODERATE}
                    control={<Radio />}
                    label="Moderate"
                  />
                  <Tooltip title="Seimbang antara risiko dan keuntungan, cocok bagi yang ingin stabil tetapi tetap tumbuh.">
                    <IconButton>
                      <IoMdInformationCircleOutline
                        className="text-primary"
                        size={20}
                      />
                    </IconButton>
                  </Tooltip>
                </div>

                <div className="flex justify-between items-center">
                  <FormControlLabel
                    value={RISK_PROFILE.AGGRESSIVE}
                    control={<Radio />}
                    label="Aggressive"
                  />
                  <Tooltip title="Berani mengambil risiko tinggi demi potensi keuntungan yang lebih besar.">
                    <IconButton>
                      <IoMdInformationCircleOutline
                        className="text-primary"
                        size={20}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </RadioGroup>
            )}
          />
        </AccordionDetails>
      </Accordion>

      {/* Section 3: Financial Principle */}
      <Accordion>
        <AccordionSummary expandIcon={<FaChevronDown />}>
          <Typography fontWeight="bold">
            Financial Principle <span className="text-red-500">*</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Controller
            name="financialPrinciple"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                className="w-[200px]"
              >
                <div className="flex justify-between items-center">
                  <FormControlLabel
                    value={FINANCE_PRINCIPLE.SYARIAH}
                    control={<Radio />}
                    label="Syariah"
                  />
                  <Tooltip title="Hanya merekomendasikan strategi yang sesuai prinsip syariah.">
                    <IconButton>
                      <IoMdInformationCircleOutline
                        className="text-primary"
                        size={20}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="flex justify-between items-center">
                  <FormControlLabel
                    value={FINANCE_PRINCIPLE.CONVENTIONAL}
                    control={<Radio />}
                    label="Conventional"
                  />
                  <Tooltip title="Hanya menggunakan pendekatan dan instrumen konvensional.">
                    <IconButton>
                      <IoMdInformationCircleOutline
                        className="text-primary"
                        size={20}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="flex justify-between items-center">
                  <FormControlLabel
                    value={FINANCE_PRINCIPLE.BOTH}
                    control={<Radio />}
                    label="Both"
                  />
                  <Tooltip title="Gabungan dari syariah dan konvensional, memberikan opsi lebih luas.">
                    <IconButton>
                      <IoMdInformationCircleOutline
                        className="text-primary"
                        size={20}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </RadioGroup>
            )}
          />
        </AccordionDetails>
      </Accordion>

      <Grid
        container
        size={{ xs: 12, lg: 12 }}
        justifyContent={"end"}
        className="mt-20"
      >
        <Grid
          container
          justifyContent={"flex-end"}
          className="w-full fixed bottom-0 left-0 bg-white border-t-1 border-[#c0c0c0] text-white py-6 px-4 text-lg font-medium shadow-lg"
          gap={4}
        >
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
            loading={loading}
          >
            Save & Get Recommendations
          </Button>
        </Grid>
      </Grid>

      <SweetAlertNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
