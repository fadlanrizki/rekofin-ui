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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const financeForm = z.object({
  income: z.string().min(1, "Required"),
  savings: z.string().min(1, "Required"),
  emergencyFund: z.string().min(1, "Required"),
  investment: z.string().min(1, "Required"),
  debt: z.string().min(1, "Required"),
  expenses: z.string().min(1, "Required"),
  riskProfile: z.string().optional(),
  financialPrinciple: z.string().optional()
});

type FinanceForm = z.infer<typeof financeForm>;

export default function FinanceView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FinanceForm>({
    resolver: zodResolver(financeForm),
  });

  const onSubmit = (data: FinanceForm) => {
    console.log(JSON.stringify(data));

    // TODO hit API
  };

  console.log(errors);
  console.log("watch ", watch());
  
  
  return (
    <div className="space-y-4">
      {/* Section 1: Main Financial Info */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<FaChevronDown />}>
          <Typography fontWeight="bold">Main Financial Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("income")}
                label="Monthly Income"
                fullWidth
                type="number"
                error={!!errors.income}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("savings")}
                label="Total Savings"
                fullWidth
                type="number"
                error={!!errors.savings}
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
                {...register("expenses")}
                label="Monthly Expenses"
                fullWidth
                type="number"
                error={!!errors.expenses}
                required
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Section 2: Risk Profile */}
      <Accordion>
        <AccordionSummary expandIcon={<FaChevronDown />}>
          <Typography fontWeight="bold">Risk Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup {...register("riskProfile")} className="w-[200px]">
            <div className="flex justify-between items-center">
              <FormControlLabel
                value="conservative"
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
                value="moderate"
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
                value="aggressive"
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
        </AccordionDetails>
      </Accordion>

      {/* Section 3: Financial Principle */}
      <Accordion>
        <AccordionSummary expandIcon={<FaChevronDown />}>
          <Typography fontWeight="bold">Financial Principle</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup {...register("financialPrinciple")} className="w-[200px]">
            <div className="flex justify-between items-center">
              <FormControlLabel
                value="syariah"
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
                value="conventional"
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
              <FormControlLabel value="both" control={<Radio />} label="Both" />
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
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
          >
            Save & Get Recommendations
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
