"use client";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const recommendations = [
  {
    title: "Siapkan 3x pengeluaran bulanan",
    description: "Sediakan dana darurat minimal 3x pengeluaran bulanan.",
    source: "book",
  },
  {
    title: "Gunakan e-wallet terpisah",
    description: "Pisahkan akun dompet digital untuk keperluan harian.",
    source: "education",
  },
  {
    title: "Quote dari Dedy Budiman",
    description: "Dana darurat itu prioritas.",
    source: "influencer",
  },
  {
    title: "Gunakan e-wallet terpisah",
    description: "Pisahkan akun dompet digital untuk keperluan harian.",
    source: "education",
  },
  {
    title: "Quote dari Dedy Budiman",
    description: "Dana darurat itu prioritas.",
    source: "influencer",
  },
  // Tambahkan data lainnya
];

export default function RecommendationSection() {
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  // const [isCompleteData, setIsCompleteData] = useState(false);
  const isComplete = true;

  const filtered = sourceFilter
    ? recommendations.filter((rec) => rec.source === sourceFilter)
    : recommendations;

  return isComplete ? (
    <div className="flex flex-col gap-3">
      <Box
        p={4}
        className="bg-white shadow-[0px_2px_8px_0px_rgba(99,_99,_99,_0.2)] rounded-md"
      >
        <Typography variant="h5" gutterBottom className="text-primary">
          Rekomendasi Strategi: Dana Darurat
        </Typography>

        <Box mb={3}>
          <ToggleButtonGroup
            value={sourceFilter}
            exclusive
            onChange={(_, value) => setSourceFilter(value)}
            aria-label="filter source"
            className="bg-white"
          >
            <ToggleButton value={""}>All</ToggleButton>
            <ToggleButton value="book">📘 Buku</ToggleButton>
            <ToggleButton value="education">🌐 Edukasi</ToggleButton>
            <ToggleButton value="influencer">👤 Influencer</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={3}>
          {filtered.map((item, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" mt={1}>
                    {item.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    mt={2}
                    display="block"
                  >
                    Sumber: {item.source}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={4} display="flex" justifyContent="center">
          <Pagination count={3} />
        </Box>
      </Box>

      <Box
        p={4}
        className="bg-white shadow-[0px_2px_8px_0px_rgba(99,_99,_99,_0.2)] rounded-md h-[300px]"
      >
        test
      </Box>
    </div>
  ) : (
    <div className="h-full w-full flex items-center justify-center">
      <div className=" flex flex-col items-center gap-3 mt-[-3rem]">
        <Image
          alt="fill-data-image"
          src={"/images/illustration/fill-finance.svg"}
          height={300}
          width={300}
        />
        <h1 className="w-1/2 text-center">
          Sebelum Anda mendapatkan Rekomendasi Keuangan, Lengkapi Data pada menu
          <strong> Input Keuangan </strong>Terlebih Dahulu
        </h1>
      </div>
    </div>
  );
}
