"use client";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function FinancialInputForm() {
  const [formData, setFormData] = useState({
    income: "",
    savings: "",
    emergencyFund: "",
    investment: "",
    debt: "",
    expenses: "",
    riskProfile: "moderate",
    financialPrinciple: "both",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

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
                label="Monthly Income"
                fullWidth
                type="number"
                value={formData.income}
                onChange={(e) => handleChange("income", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Total Savings"
                fullWidth
                type="number"
                value={formData.savings}
                onChange={(e) => handleChange("savings", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Emergency Fund"
                fullWidth
                type="number"
                value={formData.emergencyFund}
                onChange={(e) => handleChange("emergencyFund", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Investment"
                fullWidth
                type="number"
                value={formData.investment}
                onChange={(e) => handleChange("investment", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Debt"
                fullWidth
                type="number"
                value={formData.debt}
                onChange={(e) => handleChange("debt", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Monthly Expenses"
                fullWidth
                type="number"
                value={formData.expenses}
                onChange={(e) => handleChange("expenses", e.target.value)}
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
          <RadioGroup
            className="w-[300px]"
            value={formData.riskProfile}
            onChange={(e) => handleChange("riskProfile", e.target.value)}
          >
            <div className="flex justify-between items-center">
              <FormControlLabel
                value="conservative"
                control={<Radio />}
                label="Conservative"
              />
              <Tooltip title="Cenderung memilih investasi aman dengan risiko rendah dan imbal hasil kecil.">
                <IoMdInformationCircleOutline
                  className="text-primary"
                  size={20}
                />
              </Tooltip>
            </div>

            <div className="flex justify-between items-center">
              <FormControlLabel
                value="moderate"
                control={<Radio />}
                label="Moderate"
              />
              <Tooltip title="Seimbang antara risiko dan keuntungan, cocok bagi yang ingin stabil tetapi tetap tumbuh.">
                <IoMdInformationCircleOutline
                  className="text-primary"
                  size={20}
                />
              </Tooltip>
            </div>

            <div className="flex justify-between items-center">
              <FormControlLabel
                value="aggressive"
                control={<Radio />}
                label="Aggressive"
              />
              <Tooltip title="Berani mengambil risiko tinggi demi potensi keuntungan yang lebih besar.">
                <IoMdInformationCircleOutline
                  className="text-primary"
                  size={20}
                />
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
          <RadioGroup
            className="w-[300px]"
            value={formData.financialPrinciple}
            onChange={(e) => handleChange("financialPrinciple", e.target.value)}
          >
            <div className="flex justify-between items-center">
              <FormControlLabel
                value="syariah"
                control={<Radio />}
                label="Syariah"
              />
              <Tooltip title="Hanya merekomendasikan strategi yang sesuai prinsip syariah.">
                <IoMdInformationCircleOutline
                  className="text-primary"
                  size={20}
                />
              </Tooltip>
            </div>
            <div className="flex justify-between items-center">
              <FormControlLabel
                value="conventional"
                control={<Radio />}
                label="Conventional"
              />
              <Tooltip title="Hanya menggunakan pendekatan dan instrumen konvensional.">
                <IoMdInformationCircleOutline
                  className="text-primary"
                  size={20}
                />
              </Tooltip>
            </div>
            <div className="flex justify-between items-center">
              <FormControlLabel value="both" control={<Radio />} label="Both" />

              <Tooltip title="Gabungan dari syariah dan konvensional, memberikan opsi lebih luas.">
                <IoMdInformationCircleOutline
                  className="text-primary"
                  size={20}
                />
              </Tooltip>
            </div>
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
